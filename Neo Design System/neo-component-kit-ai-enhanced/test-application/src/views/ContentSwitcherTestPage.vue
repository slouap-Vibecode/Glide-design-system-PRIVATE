<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/contentSwitcher-errors">another page right here</router-link>
    </div>
    <div v-for="(testCase, index) in optionsList" :key="index" :data-test-case="index">
      <b>Test case {{ index }}</b>
      <p class="test-app-style">{{ testsDescription[index] }}</p>
      <p class="test-app-style"><a href="javascript:void(0)" class="test-app-style before-content-switcher">I am here as
          an anchor for auto test. my selector is ".before-content-switcher"</a></p>
      <nck-content-switcher :options="testCase" v-model="values[index]" label="test label" :standardWidth="standardWidths[index]" />
      <p class="test-app-style">
        Current value is: {{ values[index] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { IContentSwitcherOption, NckContentSwitcher, Colors } from "@neotechnologygroup/neo-component-kit";

const optionsList = ref<IContentSwitcherOption[][]>([]);
const values = ref<string[]>([]);
const testsDescription = ref<string[]>([]);
const standardWidths = ref<boolean[]>([]);

onBeforeMount(() => {
  optionsList.value.push([
    { text: "Hello button!", value: "hello" },
    {
      text: "this is the very veeryy verrrryyyy verrrrrryyyyyyy loooooong" +
        " teeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeexxxxxxxxxxxxx xxxxxxttttttttttttttt",
      value: "long"
    },
    { text: "I am disabled", disabled: true, value: "disabled" },
    { text: "Another button", value: "another" }
  ]);
  values.value.push("hello");
  testsDescription.value.push("A content switcher with 4 buttons, and the third one is disabled. Initial value is 'hello' (1st tab)");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "Hello button!", value: "hello" },
    {
      text: "this is the very veeryy verrrryyyy verrrrrryyyyyyy loooooong" +
        " teeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeexxxxxxxxxxxxx xxxxxxttttttttttttttt",
      value: "long"
    },
    { text: "I am disabled", disabled: true, value: "disabled" },
    { text: "Another button", value: "another" }
  ]);
  values.value.push("long");
  testsDescription.value.push("A content switcher with 4 buttons, and the third one is disabled. Initial value is 'long' (2nd tab)");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "PLANE", value: "plane", disabled: true },
    { text: "TRAIN", value: "train", disabled: true },
    { text: "CAR", value: "car", disabled: true },
    { text: "BIKE", value: "bike", disabled: true }
  ]);
  values.value.push("train");
  testsDescription.value.push("A content switcher with 4 buttons all disabled. Initial value is 'train' (2nd tab)");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "A", value: "a" },
    { text: "B", value: "b" }
  ]);
  values.value.push("");
  testsDescription.value.push("A content switcher with 2 buttons, no initial value ('')");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "A", value: "a", icon: "plane" },
    { text: "B", value: "b" },
    { text: "C veryyyyy looonnngggg ttttee xxxxx tttttttttttt ttttttttttttttttttt tttttttttttttt on multiple lines to check icon display", value: "c", icon: "train" },
    { text: "D", value: "d", icon: "car", disabled: true },
    { value: "e", icon: "hotel", iconAltText: "hotel" },
  ]);
  values.value.push("");
  testsDescription.value.push("A content switcher with 5 buttons, 4 icons, 1 is disabled, 1 is icon only, no initial value ('')");
  standardWidths.value.push(false);

  optionsList.value.push([
    { value: "a", icon: "plane", iconAltText: "a plane" },
    { value: "b", icon: "hotel", iconAltText: "a hotel" },
  ]);
  values.value.push("");
  testsDescription.value.push("A content switcher with 2 icon-only buttons, no initial value ('')");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "Label", value: "default", counterValue: 5 },
    { text: "Label", value: "no-counter" },
    { text: "Label", value: "hundred", counterValue: 150 },
    { text: "Label", value: "disabled", counterValue: 3, disabled: true }
  ]);
  values.value.push("default");
  testsDescription.value.push("Counter test part 1: default counter, no counter, 99+ limit, disabled with counter");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "Label", value: "custom-bg-color", counterValue: 8, counterBackgroundColor: Colors.RED_300 },
    { text: "Label", value: "custom-font-color", counterValue: 7, counterFontColor: Colors.INK_100 },
    { icon: "plane", iconAltText: "Plane", value: "icon-counter", counterValue: 2 },
    { text: "Text+Icon", icon: "train", value: "both", counterValue: 12 }
  ]);
  values.value.push("custom-bg-color");
  testsDescription.value.push("Counter test part 2: custom background color (red), custom font color (dark), icon+counter, text+icon+counter");
  standardWidths.value.push(false);

  optionsList.value.push([
    { text: "Disabled with custom colors", value: "disabled-1", counterValue: 5, disabled: true, counterBackgroundColor: Colors.GREEN_300, counterFontColor: Colors.RED_300 },
    { text: "Disabled with custom colors", value: "disabled-2", counterValue: 10, disabled: true, counterBackgroundColor: Colors.RED_300, counterFontColor: Colors.GREEN_300 }
  ]);
  values.value.push("disabled-1");
  testsDescription.value.push("Both buttons disabled with custom colors (should be overridden: grey background with white font)");
  standardWidths.value.push(false);

  optionsList.value.push([
    {
      text: "Very loooong teeeext with many characters to check wrapping behavior and layout",
      value: "long",
      counterValue: 42
    },
    {
      text: "Very loooong teeeext with many characters to check wrapping behavior and layout and big number",
      value: "longwithbignumber",
      counterValue: 100
    },
    { text: "Short", value: "short", counterValue: 3 },
    { text: "Shorter", value: "shorter", counterValue: 1 }
  ]);
  values.value.push("long");
  testsDescription.value.push("Long text with counter badge to test layout");
  standardWidths.value.push(false);

  optionsList.value.push([
    {
      text: "Very loooong teeeext with many characters to check wrapping behavior and layout",
      value: "label",
      counterValue: 42
    },
    {
      text: "Another",
      value: "label2",
      counterValue: 150
    }
  ]);
  values.value.push("label");
  testsDescription.value.push("A content switcher with 2 buttons with long text and counters, with standardWidth enabled (will NOT be full-width on small screens)");
  standardWidths.value.push(true);

  optionsList.value.push([
    { text: "Icon + Label", value: "icon-label", icon: "plane" },
    { text: "Label", value: "label" },
    { value: "icon", icon: "hotel", iconAltText: "hotel icon" }
  ]);
  values.value.push("icon-label");
  testsDescription.value.push("A content switcher with 3 buttons (icon+label, label, icon-only) with standardWidth enabled (will NOT be full-width on small screens)");
  standardWidths.value.push(true);
});
</script>
