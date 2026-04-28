<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/dropdown-errors">another page right here</router-link>
    </div>
    <div data-test-case="0" style="background-color: lightgray">
      <b>Test case 0</b>
      <p class="test-app-style">
        Dropdown with a menu height of 5rem, a menu position of top right
        which is disabled, is <strong>readonly</strong> and is required.
        The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[0]" label="Dropdown required" :options="options[0]" :maxMenuHeight="5"
          :menuPosition="MenuPosition.TOP_RIGHT" disabled readonly required ref="dropdown0"/>
      </div>
      Value: {{values[0]}}
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        Dropdown with a menu height of 20rem, a menu position of top left
        which has an help message. The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[1]" label="Dropdown" :options="options[1]" :maxMenuHeight="20"
          :menuPosition="MenuPosition.TOP_LEFT" helpMessage="just click on it to open the dropdown" ref="dropdown1"/>
      </div>
      Value: {{values[1]}}
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        Dropdown with a menu height of 5rem, a menu position of bottom right
        which is disabled, is readonly and is required.
        The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[2]" label="Dropdown required" :options="options[2]"
          :maxMenuHeight="5" :menuPosition="MenuPosition.BOTTOM_RIGHT" disabled readonly required ref="dropdown2"/>
      </div>
      Value: {{values[2]}}
    </div>

    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        Dropdown with a menu height of 20rem, a menu position of bottom left
        which has an help message.
        The value is empty.
      </p>
      <div>
        <nck-dropdown v-model="values[3]" label="Dropdown" :options="options[3]"
          :maxMenuHeight="20" :menuPosition="MenuPosition.BOTTOM_LEFT" helpMessage="hello help" ref="dropdown3"/>
      </div>
      Value: {{values[3]}}
    </div>

    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        Dropdown with default menu height, a menu position of top left
        which is disabled and is required and has an help message.
        The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[4]" label="Dropdown required" :options="options[4]"
          :menuPosition="MenuPosition.TOP_LEFT" disabled required helpMessage="hello help" ref="dropdown4"/>
      </div>
      Value: {{values[4]}}
    </div>

    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        Dropdown with default menu height, a menu position of top right
        which is readonly.
        The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[5]" label="Dropdown" :options="options[5]"
          :menuPosition="MenuPosition.TOP_RIGHT" readonly ref="dropdown5"/>
      </div>
      Value: {{values[5]}}
    </div>

    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        Dropdown with default menu height, a menu position of bottom left
        which is disabled, and is required and has an help message.
        The value is prefilled.
      </p>
      <div>
        <nck-dropdown v-model="values[6]" label="Dropdown required" :options="options[6]"
          :menuPosition="MenuPosition.BOTTOM_LEFT" disabled required helpMessage="hello help" ref="dropdown6"/>
      </div>
      Value: {{values[6]}}
    </div>

    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        Dropdown with default menu height, a menu position of top right
        which is readonly.
        The value is empty.
      </p>
      <div>
        <nck-dropdown v-model="values[7]" label="Dropdown" :options="options[7]"
          :menuPosition="MenuPosition.TOP_RIGHT" readonly ref="dropdown7" />
      </div>
      Value: {{values[7]}}
      <button @click="focusDropdown(7)" data-focus-input class="test-app-style">Focus dropdown</button>
    </div>

    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        Dropdown with a menu size of 20rem, a menu position of top right
        which is required.
        The value is empty.
      </p>
      <div>
        <nck-dropdown v-model="valueRequired" :menuPosition="MenuPosition.TOP_RIGHT"
        :maxMenuHeight="20" required label="Dropdown required" :options="options[8]" ref="dropdown8"/>
      </div>
      Value: {{valueRequired}}
      <button @click="validateDropdown(8)" class="test-app-style validation-button">Validate field</button>
      <button @click="focusDropdown(8)" class="test-app-style" data-focus-input>Focus dropdown</button>
    </div>

    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        Dropdown with a menu position of bottom right
        which is required and has an help message.
        The value is prefilled.
      </p>
      <div class="component-wrapper">
        <nck-dropdown v-model="values[8]" :menuPosition="MenuPosition.BOTTOM_RIGHT"
          required label="small" :options="options[9]" helpMessage="it is tiny" ref="dropdown9" labelOutside />
      </div>
      Value: {{values[8]}}
    </div>

    <div data-test-case="10">
      <b>Test case 10</b>
      <p class="test-app-style">
        Dropdown with auto-select disabled, a menu size of 20rem, a menu position of top right
        which is required.
        The value is empty.
      </p>
      <div>
        <nck-dropdown v-model="values[9]" :autoSelect="false" :menuPosition="MenuPosition.TOP_RIGHT"
        :maxMenuHeight="20" label="Dropdown required" :options="options[10]" required ref="dropdown10"/>
      </div>
      Value: {{values[9]}}
      <button @click="validateDropdown(10)" class="test-app-style validation-button">Validate field</button>
    </div>

    <div data-test-case="11">
      <b>Test case 11</b>
      <p class="test-app-style">
        Dropdown with auto-select disabled
        which is required.
        The value is empty.
        Outer label
      </p>
      <div>
        <nck-dropdown v-model="values[10]" :autoSelect="false" label="Dropdown required" :options="options[11]" required labelOutside ref="dropdown11"/>
      </div>
      Value: {{values[10]}}
      <button @click="validateDropdown(11)" class="test-app-style validation-button">Validate field</button>
    </div>

    <div data-test-case="12">
      <b>Test case 12</b>
      <p class="test-app-style">
        Dropdown with auto-select disabled
        The value is prefilled.
        Outer label
      </p>
      <div>
        <nck-dropdown v-model="values[11]" :menuPosition="MenuPosition.TOP_RIGHT" :autoSelect="false" label="Dropdown" :options="options[12]" labelOutside ref="dropdown12"/>
      </div>
      Value: {{values[11]}}
      <button @click="focusDropdown(12)" class="test-app-style" data-focus-input>Focus dropdown</button>
    </div>

    <div data-test-case="13">
      <b>Test case 13</b>
      <p class="test-app-style">
        Dropdown disabled which has an help message.
        The value is prefilled.
        Outer label
      </p>
      <div>
        <nck-dropdown v-model="values[12]" label="Dropdown" :options="options[13]" labelOutside disabled ref="dropdown13" helpMessage="disabled dropdown help message"/>
      </div>
      Value: {{values[12]}}
    </div>

    <div data-test-case="14">
      <b>Test case 14</b>
      <p class="test-app-style">
        Dropdownreadonly.
        The value is prefilled.
        Outer label
      </p>
      <div>
        <nck-dropdown v-model="values[13]" label="Dropdown" :options="options[14]" labelOutside readonly ref="dropdown14" />
      </div>
      Value: {{values[13]}}
    </div>
    <ShadowDom>
      <div data-test-case="15">
        <b>Test case 15</b>
        <p class="test-app-style">
          Dropdown with auto-select disabled
          which is required.
          The value is empty.
          Outer label.
          Shadow DOM
        </p>
        <div>
          <nck-dropdown v-model="values[14]" :autoSelect="false" label="Dropdown required" :options="options[14]" required labelOutside ref="dropdown15"/>
        </div>
        Value: {{values[14]}}
      </div>
    </ShadowDom>
    <div data-test-case="16">
      <b>Test case 16</b>
      <p class="test-app-style">
        Dropdown with custom rules.
        Validate a value that is a string will trigger an error.
      </p>
      <div>
        <nck-dropdown v-model="values[15]" label="Dropdown with rules" :options="options[15]" :rules="rules" ref="dropdown16" />
      </div>
      Value: {{values[15]}}
      <button @click="validateDropdown(16)" class="test-app-style validation-button">Validate field</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  padding: .5rem;
}

[data-test-case="9"] {
  margin-bottom: 6.5rem; // give space on bottom of the page for the menu for auto test
  .component-wrapper {
    width: 7rem;
    // margin-left: 5rem;
  }
}
</style>

<script setup lang="ts">
import { NckDropdown, IDropdownOption, MenuPosition, DividerToken, DIVIDER_TOKEN, INckDropdown, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "@/components/PreloadIconComponent.vue";
import { getCurrentInstance, ref } from "vue";
import ShadowDom from "@/components/ShadowDomComponent.vue";

const values = ref([
  1,
  1,
  "string value",
  null,
  true,
  "string value",
  "string value",
  null,
  1,
  null,
  null,
  "string value",
  "string value",
  "string value",
  null
]);
const valueRequired = ref("");

const simpleOptions: Array<IDropdownOption | DividerToken> = [
  { label: "Test string", value: "string value" },
  { label: "number value", value: 1 },
  { label: "boolean", value: true }
];

const simpleOptionsWithFirstOneDisabled: Array<IDropdownOption | DividerToken> = [
  { label: "Test string disabled", value: "string value disabled", disabled: true },
  { label: "Test string", value: "string value" },
  { label: "number value", value: 1 },
  DIVIDER_TOKEN,
  { label: "boolean", value: true }
];

const simpleOptionsWithDisabledAndLong: Array<IDropdownOption | DividerToken> = [
  { label: "Test string", value: "string value" },
  { label: "number value", value: 1, disabled: true },
  {
    label: "boolean very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very" +
  " very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very" +
  " very very very very very very very very very very very very very very very very very very long",
    value: true
  }
];

const optionsWithLotOfDiffentStartingLetters: Array<IDropdownOption | DividerToken> = [
  { label: "Test string", value: "string value" },
  { label: "alala", value: "a", subLabel: "this is a sublabel" },
  { label: "number value", value: 1 },
  { label: "disabled", value: "disabled", disabled: true, subLabel: "sublabel on disabled" },
  { label: "boolean", value: true },
  { label: "abracadabra", value: "magic" },
  { label: "extraterrestre", value: "alien" },
  { label: "42", value: 42 },
  { label: "careful", value: "careful" },
  { label: "some more", value: "some more" },
  { label: "#hellowrold", value: "hashtag" },
  { label: "éléphant", value: "elephant" },
  { label: "Ah! Uppercase", value: "uppercase" }
];

const options: Array<Array<IDropdownOption | DividerToken>> = [
  simpleOptions, // test case 0
  simpleOptionsWithDisabledAndLong, // test case 1
  simpleOptions, // test case 2
  optionsWithLotOfDiffentStartingLetters, // test case 3
  simpleOptions, // test case 4
  simpleOptions, // test case 5
  simpleOptions, // test case 6
  simpleOptions, // test case 7
  simpleOptions, // test case 8
  simpleOptions, // test case 9
  simpleOptionsWithFirstOneDisabled, // test case 10
  simpleOptions, // test case 11 & 13
  optionsWithLotOfDiffentStartingLetters, // test case 12
  simpleOptions, // test case 13
  simpleOptions, // test case 14
  simpleOptions, // test case 15
  optionsWithLotOfDiffentStartingLetters // test case 16
];

const rules = [
  new ValidationRule((value) => {
    return typeof value !== "string";
  }, "You should select a value that is not a string")
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const instance = getCurrentInstance()!.proxy!;
function getDropdownRef(index: number) {
  return instance.$refs[`dropdown${index}`] as INckDropdown;
}

function focusDropdown(index: number) {
  getDropdownRef(index)?.focus();
}

async function validateDropdown(index: number) {
  await getDropdownRef(index)?.validate();
}
</script>
