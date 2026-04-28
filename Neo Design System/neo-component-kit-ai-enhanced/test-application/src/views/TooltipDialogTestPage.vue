<template>
  <div class="testpage">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <PreloadFontComponent />

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Various trigger elements, same default placement</h5>
    <div data-test-case="0" class="more-space-top">
      <div><b>Test case 0</b></div>
      <span class="trigger" v-nck-dialog-tooltip="{ heading: 'Tooltip', content: 'on span element', buttonLabel: 'OK' }">Trigger (span)</span>
    </div>
    <div data-test-case="1" class="more-space-top">
      <div><b>Test case 1</b></div>
      <div class="trigger as-div" v-nck-dialog-tooltip="{ heading: 'Tooltip', content: 'on div element', buttonLabel: 'OK' }">Trigger (div)</div>
    </div>
    <div data-test-case="2" class="more-space-top">
      <div><b>Test case 2</b></div>
      <a class="trigger as-link" v-nck-dialog-tooltip="{ heading: 'Tooltip', content: 'on a element', buttonLabel: 'OK' }">Trigger (a)</a>
    </div>
    <div data-test-case="3" class="more-space-top">
      <div><b>Test case 3</b></div>
      <button class="test-app-style trigger" v-nck-dialog-tooltip="{ heading: 'Tooltip', content: 'on button element', buttonLabel: 'OK' }">Trigger (button)</button>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Various placements</h5>
    <div data-test-case="4">
      <div><b>Test case 4</b></div>
      <span class="trigger" v-nck-dialog-tooltip.left="{ heading: 'Tooltip', content: 'left placement', buttonLabel: 'OK' }">Trigger (left)</span>
    </div>
    <div data-test-case="5">
      <div><b>Test case 5</b></div>
      <span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Tooltip', content: 'right placement', buttonLabel: 'OK' }">Trigger (right)</span>
    </div>
    <div data-test-case="6" class="more-space-top">
      <div><b>Test case 6</b></div>
      <span class="trigger" v-nck-dialog-tooltip.top="{ heading: 'Tooltip', content: 'top placement', buttonLabel: 'OK' }">Trigger (top)</span>
    </div>
    <div data-test-case="7" class="more-space-bottom">
      <div><b>Test case 7</b></div>
      <span class="trigger" v-nck-dialog-tooltip.bottom="{ heading: 'Tooltip', content: 'bottom placement', buttonLabel: 'OK' }">Trigger (bottom)</span>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Placements that flip at creation time</h5>
    <iframe class="test-app-style" :src="path + 'index.html#/dialogTooltip/flip'" title="Placements that flip at creation time"></iframe>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Html content</h5>
    <div data-test-case="12">
      <div><b>Test case 12</b></div>
      <span class="trigger" v-nck-dialog-tooltip.right.html="{ heading: 'Tooltip', content: '<i>html</i><br>content', buttonLabel: 'OK' }">Trigger (html)</span>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Graphics</h5>
    <div data-test-case="15">
      <div><b>Test case 15</b></div>
      <div style="height:32px"><img alt="Vue.js" class="trigger" src="../assets/logo.png" width="32" height="32" v-nck-dialog-tooltip.right="{ heading: 'Tooltip', content: 'image', buttonLabel: 'OK' }" /></div>
    </div>
    <div data-test-case="16">
      <div><b>Test case 16</b></div>
      <div><i class="trigger" aria-label="Turquoise rectangle" style="display: inline-block; background-color: aquamarine; width: 32px; height: 32px" v-nck-dialog-tooltip.right="{ heading: 'Tooltip', content: 'background', buttonLabel: 'OK' }"></i></div>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Append to body</h5>
    <div data-test-case="17" class="more-space-top">
      <div><b>Test case 17</b></div>
      <span class="trigger" v-nck-dialog-tooltip.global="{ heading: 'Tooltip', content: 'attached to the body element', buttonLabel: 'OK' }">Trigger (span)</span>
    </div>

    <h5 class="h5 test-app-style">Disabling tooltips</h5>
    <div data-test-case="18">
      <div><b>Test case 18</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK', disable: false }">Trigger ('disable' condition is false)</span></div>
    </div>
    <div data-test-case="19">
      <div><b>Test case 19</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'OK', disable: true }">Trigger ('disable' condition is true)</span></div>
    </div>

    <h5 class="h5 test-app-style">No heading</h5>
    <div data-test-case="20">
      <div><b>Test case 20</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ content: 'Tooltip content without heading', buttonLabel: 'OK' }">Trigger (tooltip without heading)</span></div>
    </div>

    <h5 class="h5 test-app-style">Tooltip events: The event tooltip-button-clicked is triggered and catched for all the following test cases.</h5>
    <div data-test-case="21">
      <div><b>Test case 21: closeOnButtonClick not used, default behavior used tells to close, the modal does close when the button is clicked.</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'Click me' }" @tooltip-button-clicked="showFeedback($event, 21)">Trigger</span></div>
      <div v-if="eventFeedback[21]">{{eventFeedback[21]}}</div>
    </div>
    <div data-test-case="22">
      <div><b>Test case 22: closeOnButtonClick used, closeOnButtonClick tells to close, the modal does close when the button is clicked.</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'Click me', closeOnButtonClick: true }" @tooltip-button-clicked="showFeedback($event, 22)">Trigger</span></div>
      <div v-if="eventFeedback[22]">{{eventFeedback[22]}}</div>
    </div>
    <div data-test-case="23">
      <div><b>Test case 23: closeOnButtonClick used, closeOnButtonClick tells to open, the modal does not close when the button is clicked.</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'Click me', closeOnButtonClick: false }" @tooltip-button-clicked="showFeedback($event, 23)">Trigger</span></div>
      <div v-if="eventFeedback[23]">{{eventFeedback[23]}}</div>
    </div>
    <div data-test-case="28">
      <div><b>Test case 28: the events "tooltip-shown", "tooltip-hidden" and "tooltip-button-clicked" are triggered and catched.</b></div>
      <div><span class="trigger" v-nck-dialog-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'Click me', closeOnButtonClick: true }" @tooltip-button-clicked="showFeedback($event, 28)" @tooltip-shown="showFeedback($event, 28)" @tooltip-hidden="showFeedback($event, 28)">Trigger</span></div>
      <div v-if="eventFeedback[28]">{{eventFeedback[28]}}</div>
    </div>
    <div data-test-case="29">
      <div><b>Test case 29: the events "tooltip-shown", "tooltip-hidden" and "tooltip-button-clicked" are triggered and catched.</b></div>
      <nck-button class="trigger" label="Trigger" v-nck-dialog-tooltip="{ heading: 'Heading', content: 'Tooltip content', buttonLabel: 'Click me', closeOnButtonClick: true }" @tooltip-button-clicked="showFeedback($event, 29)" @tooltip-shown="showFeedback($event, 29)" @tooltip-hidden="showFeedback($event, 29)" />
      <div v-if="eventFeedback[29]">{{eventFeedback[29]}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckDialogTooltip as vNckDialogTooltip, NckButton } from "@neotechnologygroup/neo-component-kit";
import PreloadFontComponent from "@/components/PreloadFontComponent.vue";

const eventFeedback = ref<string[]>([]);
const path = window.location.pathname;

function showFeedback(event: Event, testCaseNumber: number) {
  const text = eventFeedback.value[testCaseNumber]
    ? eventFeedback.value[testCaseNumber] + ", the event '" + event.type + "' has been triggered"
    : "the event '" + event.type + "' has been triggered";
  eventFeedback.value[testCaseNumber] = text;
}
</script>

<style scoped>
.testpage > div {
  margin-bottom: 1rem;
}

h5.test-app-style {
  font-weight: 600;
  text-decoration: underline;
}

button {
  border: 0;
  background-color: transparent;
}

.trigger.as-link {
  color: #2c3e50;
  text-decoration: none;
}

.trigger.as-div {
  display: inline-block;
  left: auto;
  right: auto;
}

.trigger-inner {
  border: 1px solid red;
}

iframe {
  width: 95%;
  height: 45.5rem;
  padding: 6px 3px 0;
  border: 1px solid #EEE;
}

[data-test-case] {
  padding: 3.5rem;
  padding-top: 2.5rem;
  border: 1px solid rgba(0,0,0,0.056);
}

[data-test-case].more-space-top {
  padding-top: 6rem;
  padding-bottom: 1rem;
}

[data-test-case].more-space-bottom {
  padding-top: 1rem;
  padding-bottom: 7.5rem;
}

.trigger {
  box-sizing: border-box;
}
</style>
