<template>
  <div class="testpage">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Various trigger elements, same default placement</h5>
    <div data-test-case="0">
      <div><b>Test case 0</b></div>
      <div>
        <span class="trigger" v-nck-info-tooltip="'Tooltip (span)'">Trigger (span)</span>
      </div>
    </div>
    <div data-test-case="1">
      <div><b>Test case 1</b></div>
      <div class="nota-bene">Note : hovering the inner element '(div)' must also trigger the tooltip</div>
      <div class="trigger as-div" v-nck-info-tooltip="'Tooltip (div)'">Trigger <span class="trigger-inner" tabindex="0">(div)</span></div>
    </div>
    <div data-test-case="2">
      <div><b>Test case 2</b></div>
      <a class="trigger as-link" href="#" v-nck-info-tooltip="'Tooltip (a)'">Trigger (a)</a>
    </div>
    <div data-test-case="3">
      <div><b>Test case 3</b></div>
      <button class="test-app-style trigger" v-nck-info-tooltip="'Tooltip (button)'">Trigger (button)</button>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Append to body</h5>
    <div data-test-case="4">
      <div><b>Test case 4</b></div>
      <div><span class="test-app-style trigger" v-nck-info-tooltip.global="'Tooltip attached to the body element'">Trigger (span)</span></div>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Various placements</h5>
    <div data-test-case="5">
      <div><b>Test case 5</b></div>
      <div><span class="trigger" v-nck-info-tooltip.left="'Tooltip (left)'">Trigger (left)</span></div>
    </div>
    <div data-test-case="6">
      <div><b>Test case 6</b></div>
      <div><span class="trigger" v-nck-info-tooltip.right="'Tooltip (right)'">Trigger (right)</span></div>
    </div>
    <div data-test-case="7">
      <div><b>Test case 7</b></div>
      <div><span class="trigger" v-nck-info-tooltip.top="'Tooltip (top)'">Trigger (top)</span></div>
    </div>
    <div data-test-case="8">
      <div><b>Test case 8</b></div>
      <div><span class="trigger" v-nck-info-tooltip.bottom="'Tooltip (bottom)'">Trigger (bottom)</span></div>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Placements that flip at creation time</h5>
    <iframe class="test-app-style" :src="path + 'index.html#/infoTooltip/flip'"></iframe>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Headings and html content</h5>
    <div data-test-case="13">
      <div><b>Test case 13</b></div>
      <div><span class="trigger" v-nck-info-tooltip.bottom="{ heading: 'Heading', content: 'Tooltip content' }">Trigger (heading)</span></div>
    </div>
    <div data-test-case="14">
      <div><b>Test case 14</b></div>
      <div><span class="trigger" v-nck-info-tooltip.bottom.html="'Tooltip (<i>html content</i>)'">Trigger (html)</span></div>
    </div>
    <div data-test-case="15">
      <div><b>Test case 15</b></div>
      <div><span class="trigger" v-nck-info-tooltip.bottom.html="{ heading: 'Heading', content: '<i>html<br>content</i>' }">Trigger (heading+html)</span></div>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Graphics</h5>
    <div data-test-case="16">
      <div><b>Test case 16</b></div>
      <div style="height:32px"><img class="trigger" src="../assets/logo.png" width="32" height="32" v-nck-info-tooltip.right.html="'Tooltip (image)'" /></div>
    </div>
    <div data-test-case="17">
      <div><b>Test case 17</b></div>
      <div><i class="trigger" style="display: inline-block; background-color: aquamarine; width: 32px; height: 32px" v-nck-info-tooltip.right="'Tooltip (background)'"></i></div>
    </div>

    <hr class="test-app-style">

    <h5 class="h5 test-app-style">Disabling tooltips</h5>
    <div data-test-case="18">
      <div><b>Test case 18</b></div>
      <div><span class="trigger" v-nck-info-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', disable: false }">Trigger ('disable' condition is false)</span></div>
    </div>
    <div data-test-case="19">
      <div><b>Test case 19</b></div>
      <div><span class="trigger" v-nck-info-tooltip.right="{ heading: 'Heading', content: 'Tooltip content', disable: true }">Trigger ('disable' condition is true)</span></div>
    </div>

    <h5 class="h5 test-app-style">Tooltip events</h5>
    <div data-test-case="20">
      <div><b>Test case 20</b></div>
      <div><span class="trigger" v-nck-info-tooltip="'Tooltip content'" @tooltip-shown="tooltipShown(0)" @tooltip-hidden="tooltipHidden(0)">Trigger</span></div>
      <div v-if="eventFeedback[0]">{{eventFeedback[0]}}</div>
    </div>
    <div data-test-case="21">
      <div><b>Test case 21</b></div>
      <nck-button label="Trigger" v-nck-info-tooltip="'Tooltip content'" @tooltip-shown="tooltipShown(1)" @tooltip-hidden="tooltipHidden(1)"></nck-button>
      <div v-if="eventFeedback[1]">{{eventFeedback[1]}}</div>
    </div>

    <h5 class="h5 test-app-style">Tooltip should not override semantic role of trigger</h5>
    <div data-test-case="22">
      <div><b>Test case 22</b></div>
      <div>
        <ul style="text-align: left">
          <li>List item without tooltip</li>
          <li v-nck-info-tooltip="'Tooltip content'">List item with tooltip</li>
          <li>List item without tooltip</li>
        </ul>
      </div>
    </div>
    <div data-test-case="23">
      <div><b>Test case 23</b></div>
      <label>
        <input type="radio" v-nck-info-tooltip="'Tooltip content'"/>
        Basic radio button with tooltip
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckInfoTooltip as vNckInfoTooltip, NckButton } from "@neotechnologygroup/neo-component-kit";

const eventFeedback = ref<string[]>([]);
const path = window.location.pathname;

function tooltipShown(testCase: number) {
  eventFeedback.value[testCase] = "the event 'tooltip-shown' has been triggered.";
}

function tooltipHidden(testCase: number) {
  eventFeedback.value[testCase] = "the event 'tooltip-hidden' has been triggered.";
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

.trigger {
  box-sizing: border-box;
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

.nota-bene {
  font-size: 80%;
  font-style: italic;
}

iframe {
  width: 95%;
  height: 27rem;
  padding: 6px 3px 0;
  border: 1px solid #EEE;
}

[data-test-case] {
  padding: 3.5rem;
  border: 1px solid rgba(0,0,0,0.056);
}

[data-test-case="13"],
[data-test-case="15"] {
  padding-bottom: 6rem;
}
</style>
