<template>
  <div class="tcg-root">
    <div v-for="(tokenNames, groupName) in groups" :key="groupName" class="tcg-group">
      <h3 class="tcg-group-title">{{ groupName }}</h3>
      <div class="tcg-grid">
        <button
          v-for="name in tokenNames"
          :key="name"
          class="tcg-card"
          :class="{ 'tcg-card--active': copied === name }"
          @click="copy(name)"
          :title="'Click to copy ' + name"
        >
          <div class="tcg-swatch" :style="swatchStyle(name)">
            <span v-if="isTransparent(name)" class="tcg-transparent-label">transparent</span>
          </div>
          <div class="tcg-meta">
            <code class="tcg-name">{{ name }}</code>
            <span class="tcg-value">{{ tokenValue(name) }}</span>
          </div>
          <span v-if="copied === name" class="tcg-copied-badge">Copied!</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { L3_COLOR_TOKENS } from '../token-data'

interface Props {
  groups?: Record<string, string[]>
}

const props = withDefaults(defineProps<Props>(), {
  groups: () => L3_COLOR_TOKENS,
})

const copied = ref<string | null>(null)

const cs = getComputedStyle(document.documentElement)

function tokenValue(name: string): string {
  return cs.getPropertyValue(name).trim() || '—'
}

function swatchStyle(name: string): Record<string, string> {
  return { background: `var(${name}, #eee)` }
}

function isTransparent(name: string): boolean {
  const val = tokenValue(name)
  return val.includes('rgba') && val.includes(', 0)') || val === 'transparent'
}

function copy(name: string): void {
  navigator.clipboard?.writeText(name).catch(() => {})
  copied.value = name
  setTimeout(() => {
    if (copied.value === name) copied.value = null
  }, 1500)
}
</script>

<style scoped>
.tcg-root {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 2rem;
}

.tcg-group {
  margin-bottom: 2rem;
}

.tcg-group-title {
  font-size: var(--nck-font-size-body-l, 0.9375rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-default, #282d3a);
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
}

.tcg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 0.75rem;
}

.tcg-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-m, 0.5rem);
  overflow: hidden;
  background: var(--nck-surface-primary, #fff);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.tcg-card:hover {
  box-shadow: 0 0.125rem 0.375rem 0 rgba(26, 35, 62, 0.1);
  border-color: var(--nck-border-neutral-hover, #848996);
}

.tcg-card--active {
  border-color: var(--nck-border-active, #006fcf);
}

.tcg-swatch {
  height: 60px;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  display: flex;
  align-items: center;
  justify-content: center;
  /* Checkerboard to show transparency */
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 12px 12px;
  background-position: 0 0, 0 6px, 6px -6px, -6px 0;
  background-color: #fff;
}

.tcg-swatch > * {
  /* The actual color sits above the checkerboard */
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tcg-transparent-label {
  font-size: 0.625rem;
  color: var(--nck-text-secondary, #282d3ab2);
  background: rgba(255, 255, 255, 0.8);
  padding: 0.125rem 0.375rem;
  border-radius: var(--nck-radius-s, 0.25rem);
}

.tcg-meta {
  padding: 0.5rem 0.625rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tcg-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
  line-height: 1.3;
  background: none;
  border: none;
  padding: 0;
}

.tcg-value {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-secondary, #282d3ab2);
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tcg-copied-badge {
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  font-size: 0.625rem;
  background: var(--nck-surface-info-solid, #006fcf);
  color: var(--nck-text-reverse, #fff);
  padding: 0.125rem 0.375rem;
  border-radius: var(--nck-radius-s, 0.25rem);
}
</style>
