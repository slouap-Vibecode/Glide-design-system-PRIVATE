<template>
  <div class="testpage">
    <div data-test-case="8">
      <div>
        <b>Test case 8</b>
      </div>
      <div class="top">
        <span class="trigger" v-nck-dialog-tooltip.top="{ heading: 'Flippin\' tooltip', content: 'top but should flip bottom', buttonLabel: 'OK' }">Trigger (top)</span>
      </div>
    </div>
    <div data-test-case="9">
      <div>
        <b>Test case 9</b>
      </div>
      <div class="left">
        <span class="trigger" v-nck-dialog-tooltip.left="{ heading: 'Flippin\' tooltip', content: 'left but should flip right', buttonLabel: 'OK' }">Trigger (left)</span>
      </div>
    </div>
    <div data-test-case="10">
      <div>
        <b>Test case 10</b>
      </div>
      <div class="right">
        <span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Flippin\' tooltip', content: 'right but should flip left', buttonLabel: 'OK' }">Trigger (right)</span>
      </div>
    </div>
    <div data-test-case="11">
      <div>
        <b>Test case 11</b>
      </div>
      <div class="bottom">
        <span class="trigger" v-nck-dialog-tooltip.bottom="{ heading: 'Flippin\' tooltip', content: 'bottom but should flip top', buttonLabel: 'OK' }">Trigger (bottom)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NckDialogTooltip as vNckDialogTooltip } from "@neotechnologygroup/neo-component-kit";
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
  padding: 3.5rem;
  padding-top: 2.5rem;
  border: 1px solid rgba(0,0,0,0.056);
}

[data-test-case="11"] {
  padding-top: 6rem;
  padding-bottom: 1rem;
}

[data-test-case="8"] {
  padding-top: 1rem;
  padding-bottom: 7.5rem;
}

.trigger {
  box-sizing: border-box;
}
</style>
