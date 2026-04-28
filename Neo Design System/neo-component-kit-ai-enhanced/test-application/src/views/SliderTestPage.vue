<template>
  <main>

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>A disabled slider that shows an amount</div>
      </div>

      <div class="small-container">
        <nck-slider
          :range="ranges[0]"
          v-model="values[0]"
          :formatter="amountFormatter"
          :disabled="true"
          accessibleLabelType="aria-label"
          accessibleLabelValue="test case 0"
        />
      </div>
    </div>

    <div data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>A slider that shows an amount with a step of 100 and accessible with aria-labelledby</div>
      </div>

      <div class="small-container">
        <label id="label-test-case-1">Test case 1 label</label>
        <nck-slider
          :range="ranges[1]"
          v-model="values[1]"
          :formatter="amountFormatter"
          :step="100"
          accessibleLabelType="aria-labelledby"
          accessibleLabelValue="label-test-case-1"
        />
      </div>
    </div>

    <div data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>A slider that shows an amount with a step of 1 (default)</div>
      </div>

      <div class="small-container">
        <nck-slider
          :range="ranges[2]"
          v-model="values[2]"
          :formatter="amountFormatter"
          accessibleLabelType="aria-label"
          accessibleLabelValue="test case 2"
        />
      </div>
    </div>

    <div data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>Programmatically change the value of a slider</div>
      </div>

      <div class="small-container">
        <nck-slider
          v-model="values[3]"
          :range="ranges[3]"
          :formatter="hourFormatter"
          accessibleLabelType="aria-label"
          accessibleLabelValue="test case 3"
        />

        <button class="button3" v-text="'Set to 12h'" @click="values[3] = 12" />
      </div>
    </div>

    <div data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>Programmatically change the step of a slider</div>
      </div>

      <div class="small-container">
        <nck-slider
          :range="ranges[4]"
          v-model="values[4]"
          :step="step"
          :formatter="amountFormatter"
          accessibleLabelType="aria-label"
          accessibleLabelValue="test case 4"
        />

        <button class="button3" v-text="'Set to step to 100'" @click="changeStep(100)" />
      </div>
    </div>

    <div data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>Programmatically change the range of a slider</div>
      </div>

      <div class="small-container">
        <nck-slider
          v-model="values[5]"
          :range="ranges[5]"
          :formatter="amountFormatter"
          accessibleLabelType="aria-label"
          accessibleLabelValue="test case 5"
        />

        <button class="button3" v-text="'Set to range from 100 to 400'" @click="ranges[5] = { min: 100, max: 400 }" />
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckSlider } from "@neotechnologygroup/neo-component-kit";

const step = ref<number>(10);
const ranges = ref<object[]>([ { min: 0, max: 100 }, { min: 0, max: 900 }, { min: 0, max: 900 }, { min: 0, max: 23 }, { min: 0, max: 500 }, { min: 0, max: 500 } ]);
const values = ref<number[]>([ 20, 100, 400, 0, 200, 300 ]);

function changeStep(newStep: number) {
  step.value = newStep;
}

function amountFormatter(valueToFormat: string | number) {
  return valueToFormat.toString() + "$";
}

function hourFormatter(valueToFormat: string | number) {
  return valueToFormat.toString() + "h";
}
</script>

<style lang="less" scoped>
.small-container {
  width: 10rem;
  margin: 1rem auto;
}
</style>
