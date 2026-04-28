<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>A first-line-aligned switch</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[0]" label="Very long label, needs to wrap" firstLineAligned ref="switchInstance" />
      </div>
      <button class="test-app-style" data-focus-input @click="focusSwitch">focus switch</button>
      <p class="test-app-style">value: {{ values[0] }}</p>
    </div>

    <div data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>A disabled and first-line-aligned switch with hidden label</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[1]" label="This label should be hidden" disabled firstLineAligned hideLabel />
      </div>
      <p class="test-app-style">value: {{ values[1] }}</p>
    </div>

    <div data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>A switch with hidden label</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[2]" label="This label should be hidden" hideLabel />
      </div>

      <p class="test-app-style">value: {{ values[2] }}</p>
    </div>

    <div data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>A disabled switch with hidden label</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[3]" label="This label should be hidden" disabled hideLabel />
      </div>

      <p class="test-app-style">value: {{ values[3] }}</p>
    </div>

    <div data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>A disabled switch</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[4]" label="I don't get turned on easily" disabled />
      </div>

      <p class="test-app-style">value: {{ values[4] }}</p>
    </div>

    <div data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>A default switch</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[5]" label="I'm already turned on" />
      </div>

      <p class="test-app-style">value: {{ values[5] }}</p>
    </div>

    <div data-test-case="6">
      <div class="test-case-description">
        <b>Test case 6</b>
        <div>A disabled switch with first-line aligned</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[6]" label="I'm always turned on" disabled firstLineAligned />
      </div>

      <p class="test-app-style">value: {{ values[6] }}</p>
    </div>

    <div data-test-case="7">
      <div class="test-case-description">
        <b>Test case 7</b>
        <div>A first-line-aligned switch with label on the left</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[7]" label="Very long label, needs to wrap" firstLineAligned :labelPosition="SwitchLabelPosition.LEFT" />
      </div>
      <p class="test-app-style">value: {{ values[7] }}</p>
    </div>

    <div data-test-case="8">
      <div class="test-case-description">
        <b>Test case 8</b>
        <div>A disabled switch with label on the left</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[8]" label="I don't get turned on easily" :labelPosition="SwitchLabelPosition.LEFT" disabled />
      </div>

      <p class="test-app-style">value: {{ values[8] }}</p>
    </div>

    <div data-test-case="9">
      <div class="test-case-description">
        <b>Test case 9</b>
        <div>A default switch with label on left</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[9]" label="I'm already turned on" :labelPosition="SwitchLabelPosition.LEFT" />
      </div>

      <p class="test-app-style">value: {{ values[9] }}</p>
    </div>

    <div data-test-case="10">
      <div class="test-case-description">
        <b>Test case 10</b>
        <div>A disabled switch with first-line aligned with label on left</div>
      </div>

      <div class="small-container">
        <nck-switch v-model="values[10]" label="I'm always turned on" disabled firstLineAligned :labelPosition="SwitchLabelPosition.LEFT" />
      </div>

      <p class="test-app-style">value: {{ values[10] }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.small-container {
  width: 10rem;
  margin: auto;
}
</style>

<script setup lang="ts">
import { INckSwitch, NckSwitch, SwitchLabelPosition } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const values = ref<boolean[]>([ false, true, true, false, false, true, true, false, false, true, true ]);
const switchInstance = ref<INckSwitch | null>(null);

function focusSwitch() {
  if (switchInstance.value) {
    switchInstance.value.focus();
  }
}
</script>
