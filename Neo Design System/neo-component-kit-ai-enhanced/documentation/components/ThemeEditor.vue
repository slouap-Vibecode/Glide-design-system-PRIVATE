<template>
  <div class="te-root">

    <!-- ── Preset strip ───────────────────────────────────────────── -->
    <div class="te-presets">
      <span class="te-presets__label">Theme preset:</span>
      <button
        v-for="preset in PRESETS"
        :key="preset.value"
        class="te-preset-btn"
        :class="{ 'te-preset-btn--active': activePreset === preset.value }"
        @click="applyPreset(preset.value)"
      >{{ preset.label }}</button>

      <span class="te-presets__sep" />

      <button
        class="te-reset-btn"
        :disabled="overrideCount === 0 && !activePreset"
        @click="resetAll"
      >
        Reset all{{ overrideCount ? ` (${overrideCount})` : '' }}
      </button>
    </div>

    <!-- ── Theme-name input (for export) ────────────────────────────── -->
    <div class="te-export-row">
      <label class="te-export-row__label" for="te-theme-name">Theme name:</label>
      <input id="te-theme-name" v-model="themeName" class="te-input" placeholder="my-theme" />
      <button class="te-export-btn" @click="exportLESS">Export LESS</button>
      <button class="te-export-btn" @click="exportCSS">Export CSS</button>
    </div>

    <!-- ── Exported code block ───────────────────────────────────────── -->
    <pre v-if="exportedCode" class="te-code">{{ exportedCode }}<button class="te-code__copy" @click="copyExport" :title="copiedExport ? 'Copied!' : 'Copy to clipboard'">{{ copiedExport ? '✓ Copied' : 'Copy' }}</button></pre>

    <!-- ── L2 token table ────────────────────────────────────────────── -->
    <div class="te-table">
      <template v-for="(tokens, group) in L2_TOKEN_GROUPS" :key="group">
        <div class="te-group-heading">{{ group }}</div>

        <div
          v-for="tokenName in tokens"
          :key="tokenName"
          class="te-row"
          :class="{ 'te-row--overridden': overrides[tokenName] }"
        >
          <!-- Swatch -->
          <span
            class="te-swatch"
            :style="{ background: `var(${tokenName})` }"
            :title="resolvedValues[tokenName]"
          />

          <!-- Token name -->
          <code class="te-token-name">{{ tokenName }}</code>

          <!-- Resolved hex -->
          <span class="te-hex">{{ resolvedValues[tokenName] || '—' }}</span>

          <!-- Contrast badge (text/border tokens only) -->
          <span
            v-if="contrastInfo[tokenName] !== undefined"
            class="te-contrast"
            :class="contrastBadgeClass(contrastInfo[tokenName])"
            :title="`Contrast vs white: ${contrastInfo[tokenName].toFixed(2)}:1`"
          >
            {{ contrastBadgeLabel(contrastInfo[tokenName]) }}
          </span>
          <span v-else class="te-contrast te-contrast--na" />

          <!-- L1 remap dropdown -->
          <select
            class="te-select"
            :value="overrides[tokenName] || ''"
            @change="onSwap(tokenName, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">— default —</option>
            <optgroup v-for="(group_items, g) in groupedPrimitives" :key="g" :label="g">
              <option
                v-for="p in group_items"
                :key="p.name"
                :value="p.name"
              >{{ p.name }}  {{ p.hex }}</option>
            </optgroup>
          </select>

          <!-- Override indicator -->
          <button
            v-if="overrides[tokenName]"
            class="te-clear-override"
            title="Clear this override"
            @click="onSwap(tokenName, '')"
          >✕</button>
        </div>
      </template>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { L1_PRIMITIVES, L2_TOKEN_GROUPS, type L1Primitive } from '../themeTokenData'

// ── Constants ──────────────────────────────────────────────────────────────

const PRESETS = [
  { label: 'Default',        value: '' },
  { label: 'Dark',           value: 'dark' },
  { label: 'New Brand',      value: 'brand-new' },
] as const

// Tokens where we calculate contrast (text and border tokens reference these L2 names)
const CONTRAST_TOKENS = new Set([
  '--nck-color-p400', '--nck-color-p500', '--nck-color-p300',
  '--nck-color-s600', '--nck-color-s700',
  '--nck-color-n600', '--nck-color-n700',
  '--nck-color-ikp100', '--nck-color-iks200', '--nck-color-ikt300',
  '--nck-color-su600', '--nck-color-su700',
  '--nck-color-w500', '--nck-color-w600',
  '--nck-color-e600', '--nck-color-e700',
  '--nck-color-g600', '--nck-color-g700',
])

// ── State ──────────────────────────────────────────────────────────────────

const activePreset = ref<string>('')
const overrides = reactive<Record<string, string>>({})
const resolvedValues = reactive<Record<string, string>>({})
const contrastInfo = reactive<Record<string, number>>({})
const themeName = ref('my-theme')
const exportedCode = ref('')
const copiedExport = ref(false)

// ── Derived ────────────────────────────────────────────────────────────────

const overrideCount = computed(() => Object.keys(overrides).length)

/** L1 primitives grouped by family for <optgroup> display */
const groupedPrimitives = computed(() => {
  const map: Record<string, L1Primitive[]> = {}
  for (const p of L1_PRIMITIVES) {
    if (!map[p.group]) map[p.group] = []
    map[p.group].push(p)
  }
  return map
})

// ── Helpers: colour utilities ──────────────────────────────────────────────

/** Parse a hex or rgb(a) string to sRGB [0..1] channels */
function parseColor(value: string): [number, number, number] | null {
  const hex6 = value.match(/^#([0-9a-f]{6})$/i)
  if (hex6) {
    const n = parseInt(hex6[1], 16)
    return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255]
  }
  const hex8 = value.match(/^#([0-9a-f]{8})$/i)
  if (hex8) {
    const n = parseInt(hex8[1].slice(0, 6), 16)
    return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255]
  }
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (rgb) return [+rgb[1] / 255, +rgb[2] / 255, +rgb[3] / 255]
  return null
}

/** Relative luminance (WCAG 2.x) */
function luminance(r: number, g: number, b: number): number {
  const c = [r, g, b].map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

/** Contrast ratio between a colour and white (#ffffff) */
function contrastOnWhite(hex: string): number {
  const channels = parseColor(hex.trim())
  if (!channels) return 0
  const L = luminance(...channels)
  const Lwhite = 1
  return (Math.max(L, Lwhite) + 0.05) / (Math.min(L, Lwhite) + 0.05)
}

function contrastBadgeClass(ratio: number): string {
  if (ratio >= 7) return 'te-contrast--aaa'
  if (ratio >= 4.5) return 'te-contrast--aa'
  return 'te-contrast--fail'
}

function contrastBadgeLabel(ratio: number): string {
  if (ratio >= 7)   return `AAA ${ratio.toFixed(1)}:1`
  if (ratio >= 4.5) return `AA ${ratio.toFixed(1)}:1`
  return `✕ ${ratio.toFixed(1)}:1`
}

// ── Read live values ────────────────────────────────────────────────────────

function refreshValues() {
  const cs = getComputedStyle(document.documentElement)
  for (const group of Object.values(L2_TOKEN_GROUPS)) {
    for (const name of group) {
      const raw = cs.getPropertyValue(name).trim()
      resolvedValues[name] = raw
      if (CONTRAST_TOKENS.has(name)) {
        contrastInfo[name] = contrastOnWhite(raw)
      }
    }
  }
}

// ── Theme preset ────────────────────────────────────────────────────────────

function applyPreset(value: string) {
  // Clear any individual inline overrides first
  for (const name of Object.keys(overrides)) {
    document.documentElement.style.removeProperty(name)
  }
  Object.keys(overrides).forEach((k) => delete overrides[k])

  if (value) {
    document.documentElement.setAttribute('data-theme', value)
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
  activePreset.value = value
  // Give browser a tick to recalculate, then refresh
  requestAnimationFrame(refreshValues)
}

// ── Individual token swap ────────────────────────────────────────────────────

function onSwap(tokenName: string, l1VarName: string) {
  if (!l1VarName) {
    document.documentElement.style.removeProperty(tokenName)
    delete overrides[tokenName]
  } else {
    document.documentElement.style.setProperty(tokenName, `var(${l1VarName})`)
    overrides[tokenName] = l1VarName
  }
  requestAnimationFrame(refreshValues)
}

// ── Reset ────────────────────────────────────────────────────────────────────

function resetAll() {
  // Remove inline overrides
  for (const name of Object.keys(overrides)) {
    document.documentElement.style.removeProperty(name)
  }
  Object.keys(overrides).forEach((k) => delete overrides[k])
  // Remove preset
  document.documentElement.removeAttribute('data-theme')
  activePreset.value = ''
  exportedCode.value = ''
  requestAnimationFrame(refreshValues)
}

// ── Export ────────────────────────────────────────────────────────────────────

function buildLESSBlock(): string {
  const lines: string[] = []
  // Combine preset base + individual overrides
  const allOverrides: Record<string, string> = { ...overrides }

  if (!Object.keys(allOverrides).length && !activePreset.value) {
    return '/* No overrides — make changes above first */'
  }

  lines.push(`/* Generated by Neo Design System Theme Editor */`)
  lines.push(`/* ${new Date().toISOString().slice(0, 10)} */`)
  lines.push(``)
  lines.push(`[data-theme="${themeName.value || 'my-theme'}"] {`)

  const cs = getComputedStyle(document.documentElement)
  for (const [token, l1Var] of Object.entries(allOverrides)) {
    const resolved = cs.getPropertyValue(token).trim()
    lines.push(`  ${token}: var(${l1Var}); /* → ${resolved} */`)
  }

  lines.push(`}`)
  return lines.join('\n')
}

function buildCSSBlock(): string {
  const lines: string[] = []
  const allOverrides: Record<string, string> = { ...overrides }

  if (!Object.keys(allOverrides).length) {
    return '/* No overrides — make changes above first */'
  }

  lines.push(`/* Generated by Neo Design System Theme Editor */`)
  lines.push(`/* ${new Date().toISOString().slice(0, 10)} */`)
  lines.push(``)
  lines.push(`[data-theme="${themeName.value || 'my-theme'}"] {`)

  const cs = getComputedStyle(document.documentElement)
  for (const [token, l1Var] of Object.entries(allOverrides)) {
    // Find the hex value of the L1 primitive
    const p = L1_PRIMITIVES.find((x) => x.name === l1Var)
    const hex = p?.hex ?? cs.getPropertyValue(token).trim()
    lines.push(`  ${token}: ${hex}; /* via ${l1Var} */`)
  }

  lines.push(`}`)
  return lines.join('\n')
}

function exportLESS() {
  exportedCode.value = buildLESSBlock()
  copiedExport.value = false
}

function exportCSS() {
  exportedCode.value = buildCSSBlock()
  copiedExport.value = false
}

async function copyExport() {
  if (!exportedCode.value) return
  try {
    await navigator.clipboard.writeText(exportedCode.value)
    copiedExport.value = true
    setTimeout(() => { copiedExport.value = false }, 2000)
  } catch {
    // fallback: select the text
  }
}

// ── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(() => {
  refreshValues()
  // Re-read values when the stylesheet may have changed
  window.addEventListener('focus', refreshValues)
})

onUnmounted(() => {
  window.removeEventListener('focus', refreshValues)
})

// Refresh when active preset changes (after DOM attribute change)
watch(activePreset, () => {
  setTimeout(refreshValues, 50)
})
</script>

<style scoped>
.te-root {
  font-family: system-ui, sans-serif;
  font-size: 13px;
  color: #1a233e;
  background: #f8f9fb;
  border: 1px solid #e7e8ee;
  border-radius: 8px;
  padding: 16px;
  margin: 1rem 0 2rem;
}

/* Presets */
.te-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}
.te-presets__label {
  font-weight: 600;
  margin-right: 4px;
}
.te-presets__sep {
  flex: 1;
}
.te-preset-btn {
  padding: 4px 12px;
  border: 1px solid #c6c8d2;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.15s;
}
.te-preset-btn:hover {
  border-color: #006fcf;
  color: #006fcf;
}
.te-preset-btn--active {
  background: #006fcf;
  border-color: #006fcf;
  color: #fff;
}
.te-reset-btn {
  padding: 4px 12px;
  border: 1px solid #c6c8d2;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  color: #444b61;
}
.te-reset-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.te-reset-btn:not(:disabled):hover {
  border-color: #cf0000;
  color: #cf0000;
}

/* Export row */
.te-export-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.te-export-row__label {
  font-weight: 600;
  white-space: nowrap;
}
.te-input {
  flex: 0 0 140px;
  padding: 4px 8px;
  border: 1px solid #c6c8d2;
  border-radius: 4px;
  font-size: 12px;
}
.te-export-btn {
  padding: 4px 12px;
  border: 1px solid #006fcf;
  border-radius: 4px;
  background: #fff;
  color: #006fcf;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}
.te-export-btn:hover {
  background: #006fcf;
  color: #fff;
}

/* Code block */
.te-code {
  position: relative;
  background: #1a233e;
  color: #7dc3ff;
  padding: 12px 48px 12px 14px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  margin: 0 0 12px;
}
.te-code__copy {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 8px;
  border: 1px solid #7dc3ff;
  border-radius: 4px;
  background: transparent;
  color: #7dc3ff;
  cursor: pointer;
  font-size: 11px;
}
.te-code__copy:hover {
  background: #7dc3ff;
  color: #1a233e;
}

/* Table */
.te-table {
  border: 1px solid #e7e8ee;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.te-group-heading {
  background: #f0f1f4;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #444b61;
  border-bottom: 1px solid #e7e8ee;
}
.te-row {
  display: grid;
  grid-template-columns: 24px 220px 80px 100px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-bottom: 1px solid #f0f1f4;
  transition: background 0.1s;
}
.te-row:last-child {
  border-bottom: none;
}
.te-row:hover {
  background: #f8f9fb;
}
.te-row--overridden {
  background: #ecf6ff;
}
.te-row--overridden:hover {
  background: #dcf0ff;
}

.te-swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.12);
  flex-shrink: 0;
}
.te-token-name {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  color: #1a233e;
  word-break: break-all;
}
.te-hex {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  color: #848996;
}

/* Contrast badge */
.te-contrast {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 3px;
  white-space: nowrap;
  font-family: 'SFMono-Regular', Consolas, monospace;
}
.te-contrast--na {
  visibility: hidden;
}
.te-contrast--aaa {
  background: #ecfbf4;
  color: #005f45;
}
.te-contrast--aa {
  background: #fff6de;
  color: #916400;
}
.te-contrast--fail {
  background: #fae5e7;
  color: #9e0000;
}

.te-select {
  width: 100%;
  padding: 3px 6px;
  border: 1px solid #c6c8d2;
  border-radius: 4px;
  font-size: 11px;
  background: #fff;
  cursor: pointer;
  min-width: 0;
}
.te-select:focus {
  outline: 2px solid #006fcf66;
  border-color: #006fcf;
}

.te-clear-override {
  padding: 2px 6px;
  border: none;
  background: none;
  color: #848996;
  cursor: pointer;
  font-size: 12px;
  border-radius: 3px;
}
.te-clear-override:hover {
  background: #fae5e7;
  color: #cf0000;
}
</style>
