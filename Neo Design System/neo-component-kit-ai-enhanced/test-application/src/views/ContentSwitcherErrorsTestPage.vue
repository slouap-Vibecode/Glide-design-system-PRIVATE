<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Valid test cases have been put on
      <router-link class="test-app-style" to="/contentSwitcher">another page right here</router-link>
    </div>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>A content switcher with less than 2 buttons will trigger an error</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to
        display error</button>
      <nck-content-switcher v-if="displayedTestCases[0]" :options="oneOptionError" v-model="value" label="error test" />
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>A content switcher without a label will trigger a warning</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to
        display error</button>
      <nck-content-switcher v-if="displayedTestCases[1]" :options="twoOptions" v-model="value" />
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>A content switcher with an option missing text & icon</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to
        display error</button>
      <nck-content-switcher v-if="displayedTestCases[2]" :options="missingTextAndIconOptions" v-model="value" label="error test 2" />
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>A content switcher with an option icon-only missing iconAltText</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[3] = !displayedTestCases[3]">Toggle test case 3 to
        display error</button>
      <nck-content-switcher v-if="displayedTestCases[3]" :options="iconOnlyNoAltTextOptions" v-model="value" label="error test 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckContentSwitcher, IContentSwitcherOption } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);
const oneOptionError = ref<IContentSwitcherOption[]>([
  { text: "I will trigger an error, because I'm alone", value: "error" }
]);
const twoOptions = ref<IContentSwitcherOption[]>([
  { text: "abcde", value: "123" },
  { text: "fghe", value: "456" }
]);
const missingTextAndIconOptions = ref<IContentSwitcherOption[]>([
  { text: "fghe", value: "456" },
  { value: "123" },
  { icon: "train", value: "456", iconAltText: "a train" }
]);
const iconOnlyNoAltTextOptions = ref<IContentSwitcherOption[]>([
  { icon: "train", value: "456" },
  { icon: "hotel", value: "456" }
]);
const value = ref<string>("");
</script>
