<template>
  <div class="shadow-root">
    <h3 class="shadow-section-title">Elevation levels</h3>
    <div class="shadow-grid">
      <div v-for="name in shadowLevels" :key="name" class="shadow-card" :style="{ boxShadow: `var(${name})` }">
        <code class="shadow-name">{{ name }}</code>
        <span class="shadow-level">Level {{ levelNumber(name) }}</span>
      </div>
    </div>

    <h3 class="shadow-section-title" style="margin-top: 2rem">Focus rings</h3>
    <div class="shadow-focus-row">
      <div
        v-for="item in focusTokens"
        :key="item.name"
        class="shadow-focus-card"
        :style="{ boxShadow: `var(${item.name})` }"
      >
        <code class="shadow-name">{{ item.name }}</code>
        <span class="shadow-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SHADOW_TOKENS } from '../token-data'

const shadowLevels = SHADOW_TOKENS

const focusTokens = [
  { name: '--box-shadow-focus', label: 'Standard focus (primary)' },
  { name: '--box-shadow-invalid', label: 'Invalid / error focus' },
]

function levelNumber(name: string): string {
  return name.replace('--box-shadow-level-', '')
}
</script>

<style scoped>
.shadow-root {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 2rem;
}

.shadow-section-title {
  font-size: var(--nck-font-size-body-l, 0.9375rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-default, #282d3a);
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
}

.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 0.5rem;
}

.shadow-card {
  background: var(--nck-surface-primary, #fff);
  border-radius: var(--nck-radius-m, 0.5rem);
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  align-items: flex-start;
}

.shadow-focus-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.5rem 0.5rem;
}

.shadow-focus-card {
  background: var(--nck-surface-primary, #fff);
  border-radius: var(--nck-radius-m, 0.5rem);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
  min-width: 200px;
}

.shadow-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
}

.shadow-level,
.shadow-label {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-secondary, #282d3ab2);
}
</style>
