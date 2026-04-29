<template>
  <div class="tr-root">
    <h3 class="tr-section-title">Border radius</h3>
    <div class="tr-radius-grid">
      <div v-for="name in radiusTokens" :key="name" class="tr-radius-item">
        <div
          class="tr-radius-shape"
          :style="{ borderRadius: `var(${name})` }"
        />
        <code class="tr-name">{{ name }}</code>
        <span class="tr-value">{{ tokenValue(name) }}</span>
      </div>
    </div>

    <h3 class="tr-section-title" style="margin-top: 2rem">Border width</h3>
    <div class="tr-border-table">
      <div class="tr-bw-header">
        <span>Token</span>
        <span>Preview</span>
        <span>Value</span>
      </div>
      <div v-for="name in borderWidthTokens" :key="name" class="tr-bw-row">
        <code class="tr-name">{{ name }}</code>
        <div
          class="tr-bw-preview"
          :style="{ borderWidth: `var(${name})`, borderStyle: 'solid', borderColor: 'var(--nck-border-active, #006fcf)' }"
        />
        <span class="tr-value">{{ tokenValue(name) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RADIUS_TOKENS, BORDER_WIDTH_TOKENS } from '../token-data'

const radiusTokens = RADIUS_TOKENS
const borderWidthTokens = BORDER_WIDTH_TOKENS

const cs = getComputedStyle(document.documentElement)

function tokenValue(name: string): string {
  return cs.getPropertyValue(name).trim() || '—'
}
</script>

<style scoped>
.tr-root {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 2rem;
}

.tr-section-title {
  font-size: var(--nck-font-size-body-l, 0.9375rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-default, #282d3a);
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
}

.tr-radius-grid {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 0 1rem;
}

.tr-radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tr-radius-shape {
  width: 64px;
  height: 64px;
  background: var(--nck-surface-info-subtle, #ecf6ff);
  border: var(--nck-border-width-m, 2px) solid var(--nck-border-active, #006fcf);
}

.tr-border-table {
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-m, 0.5rem);
  overflow: hidden;
}

.tr-bw-header,
.tr-bw-row {
  display: grid;
  grid-template-columns: 14rem 8rem 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 1rem;
}

.tr-bw-header {
  background: var(--nck-surface-secondary, #f8f9fb);
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-secondary, #282d3ab2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tr-bw-row {
  border-top: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  background: var(--nck-surface-primary, #fff);
}

.tr-bw-row:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.tr-bw-preview {
  height: 2.5rem;
  width: 7rem;
  border-radius: var(--nck-radius-s, 0.25rem);
  background: var(--nck-surface-info-subtle, #ecf6ff);
}

.tr-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
}

.tr-value {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-family: monospace;
  color: var(--nck-text-secondary, #282d3ab2);
}
</style>
