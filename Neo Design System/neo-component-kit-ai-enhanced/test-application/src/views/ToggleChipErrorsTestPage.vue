<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
      <span> | </span>
      <router-link class="test-app-style" to="/toggleChip">Working test cases</router-link>
    </nav>
    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">The label cannot be an empty string</p>
      </div>
      <button class="test-app-style" @click="showToggleChip = !showToggleChip">Click me to show the test case</button>
      <nck-toggle-chip v-if="showToggleChip" label="" v-model="toggleChipValue" />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { NckToggleChip } from "@neotechnologygroup/neo-component-kit";

const showToggleChip = ref(false);
const toggleChipValue = ref(false);
</script>
