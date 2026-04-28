<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">The label cannot be an empty string</p>
      </div>
      <button class="test-app-style" @click="displayTestCase(0)">Click me to toggle an error</button>
      <nck-chip v-if="isTestCaseDisplayed[0]" label="" />
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">A clearable chip without an alternative text for the clear icon will trigger error</p>
      </div>
      <button class="test-app-style" @click="displayTestCase(1)">Click me to toggle an error</button>
      <nck-chip
        v-if="isTestCaseDisplayed[1]"
        label="Chip clearable"
        @chip-cleared="() => {}"
        @chip-clicked="() => {}"
      />
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">A chip with a negative trailing counter value</p>
      </div>

      <button class="test-app-style" @click="displayTestCase(2)">Click me to toggle an error</button>

      <nck-chip
        v-if="isTestCaseDisplayed[2]"
        label="Trailing counter value = -1"
        :trailingCounterValue="-1"
      />
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        <p class="test-app-style">A chip with a not integer trailing counter value</p>
      </div>

      <button class="test-app-style" @click="displayTestCase(3)">Click me to toggle an error</button>

      <nck-chip
        v-if="isTestCaseDisplayed[3]"
        label="Trailing counter value = 0.5"
        :trailingCounterValue="0.5"
      />
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
import { NckChip } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const isTestCaseDisplayed = ref<boolean[]>([ false, false, false, false ]);

function displayTestCase(index: number) {
  isTestCaseDisplayed.value[index] = !isTestCaseDisplayed.value[index];
}
</script>
