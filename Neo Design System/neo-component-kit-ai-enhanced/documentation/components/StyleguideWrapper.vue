<template>
  <!-- Single root required for vue-styleguidist Wrapper compatibility -->
  <div class="sgw-root">
    <!-- Preview container — CSS var overrides are scoped to this element -->
    <div ref="container" class="sgw-preview">
      <slot />
    </div>

    <!-- Token accordion — only renders when an nck component is detected -->
    <template v-if="tokens.length">
    <button
      class="sgw-toggle"
      :aria-expanded="String(open)"
      @click="open = !open"
    >
      <span class="sgw-toggle-icon">{{ open ? '▾' : '▸' }}</span>
      <span>{{ open ? 'Hide' : 'Show' }} token overrides</span>
      <span v-if="activeOverrides > 0" class="sgw-badge">{{ activeOverrides }} active</span>
    </button>

    <div v-if="open" class="sgw-panel">
      <div class="sgw-panel-header">
        <code class="sgw-component-label">{{ detectedKey }}</code>
        <span class="sgw-token-count">{{ tokens.length }} tokens</span>
        <button v-if="activeOverrides > 0" class="sgw-reset" @click="resetAll">Reset all</button>
      </div>

      <div v-for="token in tokens" :key="token" class="sgw-row">
        <!-- Live colour swatch -->
        <span class="sgw-swatch" :style="swatchStyle(token)" />

        <!-- Token name -->
        <code class="sgw-name">{{ token }}</code>

        <!-- Resolved value -->
        <span class="sgw-value">{{ currentValue(token) }}</span>

        <!-- Alternative selector -->
        <select
          class="sgw-select"
          :value="overrides[token] || ''"
          @change="onSwap(token, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">— current —</option>
          <optgroup
            v-for="(altTokens, groupName) in alternativesFor(token)"
            :key="groupName"
            :label="String(groupName)"
          >
            <option
              v-for="alt in altTokens"
              :key="alt"
              :value="alt"
              :disabled="alt === token"
            >{{ alt }}</option>
          </optgroup>
        </select>
      </div>
    </div>
  </template>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import {
  ALL_COLOR_CATEGORIES,
  ANIMATION_TOKENS,
  BORDER_WIDTH_TOKENS,
  L3_COLOR_TOKENS,
  RADIUS_TOKENS,
  RESPONSIVE_TOKENS,
  TYPOGRAPHY_TOKENS,
} from '../token-data'

// ── Global token manifest (component → token list) ────────────────────────────
const instance = getCurrentInstance()
const manifest: Record<string, string[]> =
  instance?.appContext.config.globalProperties.$tokenManifest ?? {}

// ── State ─────────────────────────────────────────────────────────────────────
const container = ref<HTMLElement | null>(null)
const detectedKey = ref('')
const open = ref(false)
const overrides = ref<Record<string, string>>({})

// ── Derived ───────────────────────────────────────────────────────────────────
const tokens = computed<string[]>(() =>
  detectedKey.value ? (manifest[detectedKey.value] ?? []) : [],
)

const activeOverrides = computed(() => Object.keys(overrides.value).length)

// ── Component auto-detection ──────────────────────────────────────────────────
/**
 * Scan the rendered slot content for any CSS class that matches a manifest key.
 * Neo components all carry their component name as a CSS class
 * (e.g. `nck-button`, `nck-chip`) alongside `nck-style` and `nck-internal`.
 */
function detectComponent(): void {
  if (!container.value) return
  const manifestKeys = Object.keys(manifest)
  const elements = container.value.querySelectorAll('[class]')

  for (const el of elements) {
    for (const cls of el.classList) {
      if (manifestKeys.includes(cls)) {
        detectedKey.value = cls
        return
      }
    }
  }
}

onMounted(async () => {
  await nextTick()
  detectComponent()
})

// ── Token value helpers ───────────────────────────────────────────────────────
function liveValue(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function currentValue(name: string): string {
  const override = overrides.value[name]
  return override ? `→ ${override}` : liveValue(name) || '—'
}

function swatchStyle(name: string): Record<string, string> {
  const override = overrides.value[name]
  return { background: override ? `var(${override})` : `var(${name})` }
}

// ── Token swap ────────────────────────────────────────────────────────────────
function onSwap(tokenName: string, altTokenName: string): void {
  if (!container.value) return
  if (!altTokenName) {
    container.value.style.removeProperty(tokenName)
    const next = { ...overrides.value }
    delete next[tokenName]
    overrides.value = next
  } else {
    container.value.style.setProperty(tokenName, `var(${altTokenName})`)
    overrides.value = { ...overrides.value, [tokenName]: altTokenName }
  }
}

function resetAll(): void {
  if (!container.value) return
  Object.keys(overrides.value).forEach((name) => {
    container.value!.style.removeProperty(name)
  })
  overrides.value = {}
}

// ── Alternatives ──────────────────────────────────────────────────────────────
function alternativesFor(tokenName: string): Record<string, string[]> {
  // Color tokens — L3 contextual and L2 semantic
  for (const [cat, toks] of Object.entries(ALL_COLOR_CATEGORIES)) {
    if (toks.includes(tokenName)) return { [cat]: toks }
  }

  // Sizing / structural tokens
  if (RADIUS_TOKENS.includes(tokenName)) return { Radius: RADIUS_TOKENS }
  if (BORDER_WIDTH_TOKENS.includes(tokenName)) return { 'Border width': BORDER_WIDTH_TOKENS }

  // Responsive tokens (spacing, font-size, icon-size, focus-ring)
  for (const [groupName, groupTokens] of Object.entries(RESPONSIVE_TOKENS)) {
    if (groupTokens.includes(tokenName)) return { [groupName]: groupTokens }
  }

  // Animation tokens (duration + easing)
  for (const [groupName, groupTokens] of Object.entries(ANIMATION_TOKENS)) {
    if (groupTokens.includes(tokenName)) return { [groupName]: groupTokens }
  }

  // Typography tokens (font-weight + line-height)
  for (const [groupName, groupTokens] of Object.entries(TYPOGRAPHY_TOKENS)) {
    if (groupTokens.includes(tokenName)) return { [groupName]: groupTokens }
  }

  // No match — offer all L3 color tokens as a reasonable fallback
  return L3_COLOR_TOKENS
}
</script>

<style scoped>
/* ── Preview area ─────────────────────────────────────────────────────────── */
.sgw-preview {
  padding: 1.5rem;
  background: var(--nck-surface-primary, #fff);
}

/* ── Toggle button ────────────────────────────────────────────────────────── */
.sgw-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.375rem 1rem;
  background: var(--nck-surface-secondary, #f8f9fb);
  border: 1px solid var(--nck-border-neutral, #e7e8ee);
  border-top: 1px solid var(--nck-border-neutral, #e7e8ee);
  cursor: pointer;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--nck-text-brand, #006fcf);
  text-align: left;
  font-family: inherit;
  transition: background 0.15s;
  margin-top: 0.5rem;
  border-radius: 4px;
}

.sgw-toggle:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.sgw-toggle[aria-expanded='true'] {
  border-radius: 4px 4px 0 0;
}

.sgw-toggle-icon {
  font-size: 0.75rem;
}

.sgw-badge {
  margin-left: auto;
  background: var(--nck-surface-info-solid, #006fcf);
  color: #fff;
  font-size: 0.625rem;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
}

/* ── Panel ────────────────────────────────────────────────────────────────── */
.sgw-panel {
  border: 1px solid var(--nck-border-neutral, #e7e8ee);
  border-top: none;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
}

.sgw-panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--nck-surface-secondary, #f8f9fb);
  border-bottom: 1px solid var(--nck-border-neutral, #e7e8ee);
}

.sgw-component-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--nck-text-brand, #006fcf);
}

.sgw-token-count {
  font-size: 0.6875rem;
  color: var(--nck-text-secondary, #282d3ab2);
}

.sgw-reset {
  margin-left: auto;
  font-size: 0.6875rem;
  color: var(--nck-text-brand, #006fcf);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: inherit;
  text-decoration: underline;
}

.sgw-reset:hover {
  background: var(--nck-surface-info-subtle, #ecf6ff);
}

/* ── Token rows ───────────────────────────────────────────────────────────── */
.sgw-row {
  display: grid;
  grid-template-columns: 1.25rem 1fr auto 14rem;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 1rem;
  border-bottom: 1px solid var(--nck-border-neutral, #e7e8ee);
  background: var(--nck-surface-primary, #fff);
}

.sgw-row:last-child {
  border-bottom: none;
}

.sgw-row:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

/* Colour swatch with checkerboard for transparency */
.sgw-swatch {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0;
  background-color: #fff;
  position: relative;
}

.sgw-swatch::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
}

.sgw-name {
  font-size: 0.6875rem;
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
}

.sgw-value {
  font-size: 0.6875rem;
  font-family: monospace;
  color: var(--nck-text-secondary, #282d3ab2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 9rem;
}

.sgw-select {
  font-size: 0.6875rem;
  padding: 0.25rem 0.375rem;
  border: 1px solid var(--nck-border-neutral, #e7e8ee);
  border-radius: 4px;
  background: var(--nck-surface-primary, #fff);
  color: var(--nck-text-default, #282d3a);
  width: 100%;
  cursor: pointer;
  font-family: inherit;
}

.sgw-select:focus {
  outline: none;
  border-color: var(--nck-border-active, #006fcf);
}
</style>
