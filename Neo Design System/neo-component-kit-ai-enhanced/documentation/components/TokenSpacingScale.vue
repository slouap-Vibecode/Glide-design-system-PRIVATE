<template>
  <div class="tss-root">
    <div class="tss-table">
      <div class="tss-header">
        <span>Token</span>
        <span>Scale</span>
        <span>Value</span>
        <span>px</span>
      </div>
      <div v-for="name in tokens" :key="name" class="tss-row">
        <code class="tss-name">{{ name }}</code>
        <div class="tss-track">
          <div
            class="tss-bar"
            :style="{ width: `var(${name}, 0)`, minWidth: tokenValue(name) === '0' ? '2px' : undefined }"
          />
        </div>
        <span class="tss-rem">{{ tokenValue(name) || '—' }}</span>
        <span class="tss-px">{{ toPx(name) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RESPONSIVE_TOKENS } from '../token-data'

interface Props {
  tokens?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  tokens: () => RESPONSIVE_TOKENS['Spacing'],
})

const cs = getComputedStyle(document.documentElement)

function tokenValue(name: string): string {
  return cs.getPropertyValue(name).trim()
}

function toPx(name: string): string {
  const val = tokenValue(name)
  if (!val || val === '0') return '0'
  const num = parseFloat(val)
  if (isNaN(num)) return '—'
  // rem → px (assume 16px root)
  if (val.endsWith('rem')) return `${Math.round(num * 16)}px`
  if (val.endsWith('px')) return val
  return '—'
}
</script>

<style scoped>
.tss-root {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 2rem;
}

.tss-table {
  display: grid;
  grid-template-columns: 1fr;
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-m, 0.5rem);
  overflow: hidden;
}

.tss-header,
.tss-row {
  display: grid;
  grid-template-columns: 14rem 1fr 5rem 4rem;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
}

.tss-header {
  background: var(--nck-surface-secondary, #f8f9fb);
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-secondary, #282d3ab2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tss-row {
  border-top: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  background: var(--nck-surface-primary, #fff);
}

.tss-row:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.tss-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
}

.tss-track {
  height: 1.25rem;
  background: var(--nck-surface-secondary, #f8f9fb);
  border-radius: var(--nck-radius-s, 0.25rem);
  overflow: hidden;
  max-width: 100%;
}

.tss-bar {
  height: 100%;
  background: var(--nck-surface-info-solid, #006fcf);
  border-radius: var(--nck-radius-s, 0.25rem);
  max-width: 100%;
  transition: width 0.2s;
}

.tss-rem,
.tss-px {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-family: monospace;
  color: var(--nck-text-secondary, #282d3ab2);
  white-space: nowrap;
}
</style>
