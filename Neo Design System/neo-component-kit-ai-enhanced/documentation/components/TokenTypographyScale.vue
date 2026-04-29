<template>
  <div class="tts-root">
    <div v-for="(tokenNames, groupName) in resolvedGroups" :key="groupName" class="tts-group">
      <h3 class="tts-group-title">{{ groupName }}</h3>
      <div class="tts-table">
        <div class="tts-header">
          <span>Token</span>
          <span>Value</span>
          <span>Sample</span>
        </div>
        <div v-for="name in tokenNames" :key="name" class="tts-row">
          <code class="tts-name">{{ name }}</code>
          <span class="tts-value">{{ tokenValue(name) }}</span>
          <span class="tts-sample" :style="{ fontSize: `var(${name})`, lineHeight: '1.3' }">
            The quick brown fox
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RESPONSIVE_TOKENS } from '../token-data'

type Groups = Record<string, string[]>

interface Props {
  groups?: Groups
}

const props = defineProps<Props>()

const resolvedGroups = computed<Groups>(() => props.groups ?? {
  'Font size — body': RESPONSIVE_TOKENS['Font size — body'],
  'Font size — headings': RESPONSIVE_TOKENS['Font size — headings'],
  'Font size — amounts': RESPONSIVE_TOKENS['Font size — amounts'],
  'Font size — badge': RESPONSIVE_TOKENS['Font size — badge'],
})

const cs = getComputedStyle(document.documentElement)

function tokenValue(name: string): string {
  return cs.getPropertyValue(name).trim() || '—'
}
</script>

<style scoped>
.tts-root {
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 2rem;
}

.tts-group {
  margin-bottom: 2rem;
}

.tts-group-title {
  font-size: var(--nck-font-size-body-l, 0.9375rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-default, #282d3a);
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
}

.tts-table {
  border: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  border-radius: var(--nck-radius-m, 0.5rem);
  overflow: hidden;
}

.tts-header,
.tts-row {
  display: grid;
  grid-template-columns: 14rem 6rem 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 1rem;
}

.tts-header {
  background: var(--nck-surface-secondary, #f8f9fb);
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-weight: var(--nck-font-weight-semibold, 600);
  color: var(--nck-text-secondary, #282d3ab2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tts-row {
  border-top: var(--nck-border-width-s, 1px) solid var(--nck-border-neutral, #e7e8ee);
  background: var(--nck-surface-primary, #fff);
  min-height: 3rem;
}

.tts-row:hover {
  background: var(--nck-surface-primary-hover, #f0f1f4);
}

.tts-name {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  color: var(--nck-text-brand, #006fcf);
  word-break: break-all;
  align-self: center;
}

.tts-value {
  font-size: var(--nck-font-size-body-xs, 0.6875rem);
  font-family: monospace;
  color: var(--nck-text-secondary, #282d3ab2);
  align-self: center;
}

.tts-sample {
  color: var(--nck-text-default, #282d3a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
