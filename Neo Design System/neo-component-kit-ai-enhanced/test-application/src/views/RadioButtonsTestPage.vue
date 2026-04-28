<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div v-for="(testCase, index) in optionsList" :key="index" :data-test-case="index">
      <b>Test case {{index}}</b>
      <p class="test-app-style">{{testsDescription[index]}}</p>
      <p class="test-app-style"><a href="javascript:void(0)" class="test-app-style before-radio-buttons">I am here as an anchor for auto test. My selector is ".before-radio-buttons".</a></p>
      <nck-radio-buttons :display="display[index]" :options="testCase" v-model="values[index]" :helpMessage="helpMessage[index]" :name="'radios_' + index"
        :direction="index % 2 === 0 ? GroupDirection.HORIZONTAL : GroupDirection.VERTICAL" :disabled="disabled[index]" :firstLineAligned="firstLineAligned[index]"
        groupLabel="Radio group" :hideLabel="index % 4 <= 1" :required="required[index]" ref="radiosRef" />
      <p class="test-app-style">
        Current value is: {{values[index]}}
      </p>
      <div>
        <button class="test-app-style validate-input" @click="validate(index)">Is this input valid?</button>
        <button v-if="index === 0" class="test-app-style" data-focus-input @click="focusInput(index)">focus input</button>
        <button v-if="index === 7" class="test-app-style" data-focus-input @click="focusInput(index)">focus input</button>
        <button v-if="index === 5" class="test-app-style add-values" @click="addValuesForTc(index)">Add values for radio buttons</button>
        <button v-if="index === 12" class="test-app-style add-values" @click="addValuesForTc(index)">Add values for chip radio buttons</button>
        <p class="test-app-style" v-if="typeof validityStatus[index] === 'boolean'">
          This input is {{validityStatus[index] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
[data-test-case] {
  padding: .25rem;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { IRadioButtonOption, NckRadioButtons, GroupDirection, RadioButtonsDisplay, INckRadioButtons } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "@/components/PreloadIconComponent.vue";
import { ref } from "vue";

const optionsList = ref<IRadioButtonOption[][]>([]);
const values = ref<string[]>([]);
const testsDescription = ref<string[]>([]);
const validityStatus = ref<boolean[]>([]);
const required = ref<boolean[]>([]);
const disabled = ref<boolean[]>([]);
const display = ref<RadioButtonsDisplay[]>([]);
const helpMessage = ref<string[]>([]);
const firstLineAligned = ref<boolean[]>([]);

const radiosRef = ref<INckRadioButtons[]>([]);

// TC 0
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
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("help message is here");
testsDescription.value.push("A radio buttons with 4 buttons, and the third one is disabled. Initial value is 'hello' (1st tab)");

// TC 1
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
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(true);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 4 buttons, and the third one is disabled. Initial value is 'long' (2nd tab). firstLineAligned=true");

// TC 2
optionsList.value.push([
  { text: "PLANE", value: "plane", disabled: true },
  { text: "TRAIN", value: "train", disabled: true },
  { text: "CAR", value: "car", disabled: true },
  { text: "BIKE", value: "bike", disabled: true }
]);
values.value.push("train");
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 4 buttons all disabled. Initial value is 'train' (2nd tab)");

// TC 3
optionsList.value.push([
  { text: "A", value: "a" },
  { text: "B", value: "b" }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 2 buttons, no initial value (''), required");

// TC 4
optionsList.value.push([
  { text: "A", value: "a", disabled: true },
  { text: "B", value: "b", disabled: true }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 2 buttons, all disabled, no initial value (''), required");

// TC 5
optionsList.value.push([]);
values.value.push("");
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 0 button, no initial value (''), where you can add values by clicking on the button");

// TC 6
optionsList.value.push([
  { text: "A", value: "a" },
  { text: "B", value: "b" }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.RADIO);
helpMessage.value.push("help message is here");
testsDescription.value.push("A radio buttons with 2 buttons, horizontal, no initial value (''), required");

// TC 7
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
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("help message is here");
testsDescription.value.push("A chip radio buttons with 4 buttons, and the third one is disabled. Initial value is 'hello' (1st tab)");

// TC 8
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
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("");
testsDescription.value.push("A chip radio buttons with 4 buttons, and the third one is disabled. Initial value is 'long' (2nd tab)");

// TC 9
optionsList.value.push([
  { text: "PLANE", value: "plane", disabled: true },
  { text: "TRAIN", value: "train", disabled: true },
  { text: "CAR", value: "car", disabled: true },
  { text: "BIKE", value: "bike", disabled: true }
]);
values.value.push("train");
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("");
testsDescription.value.push("A chip radio buttons with 4 buttons all disabled. Initial value is 'train' (2nd tab)");

// TC 10
optionsList.value.push([
  { text: "A", value: "a" },
  { text: "B", value: "b" }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("");
testsDescription.value.push("A chip radio buttons with 2 buttons, no initial value (''), required");

// TC 11
optionsList.value.push([
  { text: "A", value: "a", disabled: true },
  { text: "B", value: "b", disabled: true }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("");
testsDescription.value.push("A chip radio buttons with 2 buttons, all disabled, no initial value (''), required");

// TC 12
optionsList.value.push([]);
values.value.push("");
required.value.push(false);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("");
testsDescription.value.push("A chip radio buttons with 0 button, no initial value (''), where you can add values by clicking on the button");

// TC 13
optionsList.value.push([
  { text: "A", value: "a" },
  { text: "B", value: "b" }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("help message is here");
testsDescription.value.push("A chip radio buttons with 2 buttons, vertical is not possible so display horizontal, no initial value (''), required, with a help message");

// TC 14
optionsList.value.push([
  { text: "A", value: "a" },
  { text: "B", value: "b" }
]);
values.value.push("");
required.value.push(true);
disabled.value.push(false);
firstLineAligned.value.push(false);
display.value.push(RadioButtonsDisplay.CHIP);
helpMessage.value.push("help message is here");
testsDescription.value.push("A chip radio buttons with 2 buttons, no initial value (''), required");

// TC 15
optionsList.value.push([
  { text: "PLANE", value: "plane", disabled: true },
  { text: "TRAIN", value: "train", disabled: true },
  { text: "CAR", value: "car", disabled: true },
  { text: "BIKE", value: "bike", disabled: true }
]);
values.value.push("train");
required.value.push(true);
disabled.value.push(true);
display.value.push(RadioButtonsDisplay.RADIO);
firstLineAligned.value.push(false);
helpMessage.value.push("");
testsDescription.value.push("A radio buttons with 4 buttons all disabled. Initial value is 'train' (2nd tab)");

function focusInput(index: number) {
  radiosRef.value[index].focus();
}

function addValuesForTc(index: number) {
  const nextOptionsList = [ ...optionsList.value ];
  nextOptionsList[index] = [
    { text: "A", value: "a" },
    { text: "B", value: "b" }
  ];
  optionsList.value = nextOptionsList;
}

async function validate(index: number) {
  const valid = await radiosRef.value[index].validate();
  const nextValidityStatus = [ ...validityStatus.value ];
  nextValidityStatus[index] = valid;
  validityStatus.value = nextValidityStatus;
}
</script>
