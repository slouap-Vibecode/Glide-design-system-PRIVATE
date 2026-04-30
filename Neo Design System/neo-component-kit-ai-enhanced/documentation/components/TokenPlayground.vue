<template>
  <div class="tp-wrapper">
    <!-- Component preview — CSS var overrides are scoped to this element -->
    <div ref="container" class="tp-preview">
      <slot />
    </div>

    <!-- Toggle button -->
    <button class="tp-toggle" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <span class="tp-toggle-icon">{{ isOpen ? '▾' : '▸' }}</span>
      <span>{{ isOpen ? 'Hide' : 'Show' }} token controls</span>
      <span v-if="activeOverrides > 0" class="tp-badge">{{ activeOverrides }} overridden</span>
    </button>

    <!-- Control panel -->
    <div v-if="isOpen" class="tp-panel">
      <div class="tp-panel-header">
        <span class="tp-panel-title">{{ label || 'Token overrides' }}</span>
        <button v-if="activeOverrides > 0" class="tp-reset" @click="resetAll">Reset all</button>
      </div>

      <div v-if="!resolvedTokens.length" class="tp-empty">
        No tokens detected. Pass a <code>:tokens</code> prop or a <code>component-name</code>.
      </div>

      <div v-for="tokenName in resolvedTokens" :key="tokenName" class="tp-row">
        <!-- Live swatch -->
        <div class="tp-swatch" :style="swatchStyle(tokenName, overrides[tokenName])" />

        <!-- Token name -->
        <code class="tp-token-name">{{ tokenName }}</code>

        <!-- Current resolved value -->
        <span class="tp-current-value">{{ currentValue(tokenName) }}</span>

        <!-- Alternative selector -->
        <select
          class="tp-select"
          :value="overrides[tokenName] || ''"
          @change="onSwap(tokenName, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">— current —</option>
          <optgroup
            v-for="(altTokens, groupName) in alternativesFor(tokenName)"
            :key="groupName"
            :label="String(groupName)"
          >
            <option
              v-for="alt in altTokens"
              :key="alt"
              :value="alt"
              :disabled="alt === tokenName"
            >
              {{ alt }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { ALL_COLOR_CATEGORIES, L3_COLOR_TOKENS, RADIUS_TOKENS, BORDER_WIDTH_TOKENS, RESPONSIVE_TOKENS, ANIMATION_TOKENS, TYPOGRAPHY_TOKENS } from '../token-data'

interface Props {
  /** Explicit list of CSS variable names to surface in the panel */
  tokens?: string[]
  /** Key into $tokenManifest (e.g. "nck-button") — used if tokens is not set */
  componentName?: string
  /** Panel heading */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  tokens: undefined,
  componentName: undefined,
  label: undefined,
})

const instance = getCurrentInstance()
const tokenManifest: Record<string, string[]> =
  instance?.appContext.config.globalProperties.$tokenManifest ?? {}

const container = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const overrides = ref<Record<string, string>>({})

const resolvedTokens = computed<string[]>(() => {
  if (props.tokens?.length) return props.tokens
  if (props.componentName && tokenManifest[props.componentName]) {
    return tokenManifest[props.componentName]
  }
  return []
})

const activeOverrides = computed(() => Object.keys(overrides.value).length)

const cs = getComputedStyle(document.documentElement)

function tokenValue(name: string): string {
  return cs.getPropertyValue(name).trim()
}

function currentValue(name: string): string {
  const override = overrides.value[name]
  if (override) {
    // Show what the override resolves to
    return `→ ${override}`
  }
  return tokenValue(name) || '—'
}

function swatchStyle(name: string, override?: string): Record<string, string> {
  const cssValue = override ? `var(${override})` : `var(${name})`
  return { background: cssValue }
}

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

/**
 * For a given token, return alternative token names grouped by their category.
 * Only returns categories that contain the token, plus all other L3 color categories.
 */
function alternativesFor(tokenName: string): Record<string, string[]> {
  // Color tokens — L3 contextual and L2 semantic
  for (const [categoryName, tokens] of Object.entries(ALL_COLOR_CATEGORIES)) {
    if (tokens.includes(tokenName)) return { [categoryName]: tokens }
  }

  // Sizing / structural tokens
  if (RADIUS_TOKENS.includes(tokenName)) return { 'Radius': RADIUS_TOKENS }
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
.tp-wrapper {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 1rem;
}

.tp-preview {
  padding: 1.5rem;
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-m, 0.5rem) var(--nck-radius-m, 0.5rem) 0 0;
  background: var(--nck-surface-primary, #fff);
}

.tp-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: var(--nck-surface-secondary, #f8f9fb);
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-top: none;
  border-radius: 0 0 var(--nck-radius-m, 0.5rem) var(--nck-radius-m, 0.5rem);
  cursor: pointer;
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-brand, #006fcf);
  text-align: left;
  transition: background 0.15s;
}

.tp-toggle:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.tp-toggle[aria-expanded='true'] {
  border-radius: 0;
}

.tp-toggle-icon {
  font-size: 0.75rem;
}

.tp-badge {
  margin-left: auto;
  background: var(--nck-surface-info-solid, #006fcf);
  color: var(--nck-text-reverse, #fff);
  font-size: 0.625rem;
  padding: 0.125rem 0.5rem;
  border-radius: var(--nck-radius-pill, 999rem);
}

.tp-panel {
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-top: none;
  border-radius: 0 0 var(--nck-radius-m, 0.5rem) var(--nck-radius-m, 0.5rem);
  overflow: hidden;
}

.tp-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  background: var(--nck-surface-secondary, #f8f9fb);
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
}

.tp-panel-title {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-secondary, #282d3ab2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tp-reset {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.125rem 0.375rem;
  border-radius: var(--nck-radius-s, 0.25rem);
  text-decoration: underline;
}

.tp-reset:hover {
  background: var(--nck-surface-info-subtle, #ecf6ff);
}

.tp-empty {
  padding: 1rem;
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-secondary, #282d3ab2);
}

.tp-row {
  display: grid;
  grid-template-columns: 1.5rem 1fr auto 14rem;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  background: var(--nck-surface-primary, #fff);
}

.tp-row:last-child {
  border-bottom: none;
}

.tp-row:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.tp-swatch {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--nck-radius-s, 0.25rem);
  border: var(--nck-border-width-s, 1px) solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  /* Checkerboard for transparency */
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  background-color: #fff;
  position: relative;
}

.tp-swatch::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
}

.tp-token-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
}

.tp-current-value {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-family: monospace;
  color: var(--nck-text-secondary, #282d3ab2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 10rem;
}

.tp-select {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  padding: 0.25rem 0.5rem;
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-s, 0.25rem);
  background: var(--nck-surface-primary, #fff);
  color: var(--nck-text-default, #282d3a);
  width: 100%;
  cursor: pointer;
}

.tp-select:focus {
  outline: none;
  border-color: var(--nck-border-active, #006fcf);
  box-shadow: var(--box-shadow-focus);
}
</style>
