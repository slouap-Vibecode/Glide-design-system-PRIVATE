<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
      <span> | </span>
      <router-link class="test-app-style" to="/toggleChip-errors">Error test cases</router-link>
    </nav>
    <h1 class="test-app-style">toggle chip test page</h1>
    <div v-for="(options, index) in toggleChipsOptions" :key="index" :data-test-case="index">
      <div>
        <b>Test case {{index}}</b>
        <p class="test-app-style">
          label: {{options.label}},
          value: {{options.value}},
          icon: {{options.icon || "no icon"}},
          disabled: {{options.disabled || "false"}},
          iconMode: {{ options.iconMode || "button" }}
        </p>
      </div>
      <nck-toggle-chip
        ref="toggleChips"
        :label="options.label"
        v-model="options.value"
        :leftIconName="options.icon"
        :disabled="options.disabled"
        :iconMode="options.iconMode"
      />
      <p v-if="index === 4">
        <button data-test-focus-chip-popover @click="focusChipTestCase4">Focus this toggle chip</button>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  padding: 0.1875rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { NckToggleChip, INckToggleChip } from "@neotechnologygroup/neo-component-kit";

const toggleChips = ref<Array<INckToggleChip>>();

const toggleChipsOptions = ref<Array<{ label: string; value: boolean; icon?: string; disabled?: boolean; iconMode?: string }>>([
  { label: "Test", value: false },
  { label: "Test", value: true, disabled: true },
  { label: "Test", value: true, icon: "paperless" },
  { label: "Test", value: false, icon: "paperless", disabled: true },
  { label: "Test", value: true, iconMode: "checkbox" }
]);

function focusChipTestCase4() {
  toggleChips.value?.[4].focus();
}
</script>
