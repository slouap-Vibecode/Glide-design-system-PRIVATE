<template>
  <div class="testpage">
    <div data-test-case="9">
      <div>
        <b>Test case 9</b>
      </div>
      <div class="top">
        <span class="trigger" v-nck-info-tooltip.top="'Tooltip (top but should flip bottom)'">Trigger (top)</span>
      </div>
    </div>
    <div data-test-case="10">
      <div>
        <b>Test case 10</b>
      </div>
      <div class="left">
        <span class="trigger" v-nck-info-tooltip.left="'Tooltip (left but should flip right)'">Trigger (left)</span>
      </div>
    </div>
    <div data-test-case="11">
      <div>
        <b>Test case 11</b>
      </div>
      <div class="right">
        <span class="trigger" v-nck-info-tooltip.right="'Tooltip (right but should flip left)'">Trigger (right)</span>
      </div>
    </div>
    <div data-test-case="12">
      <div>
        <b>Test case 12</b>
      </div>
      <div class="bottom">
        <span class="trigger" v-nck-info-tooltip.bottom="'Tooltip (bottom but should flip top)'">Trigger (bottom)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NckInfoTooltip as vNckInfoTooltip } from "@neotechnologygroup/neo-component-kit";
</script>

<style scoped>
.testpage > div {
  margin-bottom: 1rem;
}

.left {
  display: flex;
  flex-direction: row;
}

.right {
  display: flex;
  flex-direction: row-reverse;
}

.top,
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left > span,
.right > span,
.top > span,
.bottom > span {
  width: 12rem;
  padding: 0 4px;
  border: 1px dotted #EEE;
}

[data-test-case] {
  border: 1px solid rgba(0,0,0,0.056);
}

[data-test-case="9"] {
  padding-bottom: 56px;
}

[data-test-case="10"],
[data-test-case="11"] {
  padding-bottom: 24px;
}

[data-test-case="12"] {
  padding-top: 56px;
}

.trigger {
  box-sizing: border-box;
}
</style>
