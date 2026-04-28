<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <b>Test case 0</b>
      <p>Phone number input with an empty list of countries</p>

      <div>
        <button @click="setError(0)">
          Toggle test case 0 to display error
        </button>

        <nck-phone-number-input
          v-if="displayedTestCases[0]"
          v-model="values[0]"
          :countries="countryLists[0]"
          :countryDropdownLabel="countryDropdownLabel"
          :label="label"
        />
      </div>
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p>Phone number input with no selectable items</p>

      <div>
        <button @click="setError(1)">
          Toggle test case 1 to display error
        </button>

        <nck-phone-number-input
          v-if="displayedTestCases[1]"
          v-model="values[1]"
          :countries="countryLists[1]"
          :countryDropdownLabel="countryDropdownLabel"
          :label="label"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import { NckPhoneNumberInput, DividerToken, DIVIDER_TOKEN, IDropdownOption } from "@neotechnologygroup/neo-component-kit";

const values: Ref<string[]> = ref<string[]>([ "", "" ]);
const countryLists: Array<Array<IDropdownOption | DividerToken>> = [ [], [ DIVIDER_TOKEN ] ];
const countryDropdownLabel = "Country";
const label = "Phone number";

const displayedTestCases: Ref<boolean[]> = ref<boolean[]>([]);

function setError(index: number) {
  const nextDisplayedTestCases = [ ...displayedTestCases.value ];
  nextDisplayedTestCases[index] = !nextDisplayedTestCases[index];
  displayedTestCases.value = nextDisplayedTestCases;
}
</script>
