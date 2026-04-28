<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'search'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/search-input-errors">another page right here</router-link>
    </div>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        A simple search input
      </div>
      <nck-search-input
        v-model="values[0]"
        clearButtonAltText="clear"
        searchButtonAltText="search"
        title="title"
        placeholder="Placeholder"
        @click="(value) => clickInput(0, value)"
        @enter-key-pressed="(value) => onEnterKey(0, value)"
        @input-cleared="onCleared"
      />
      <p v-if="valuesClicked[0] !== undefined">I was clicked! Value: {{ valuesClicked[0] }}</p>
      <p v-if="valuesEnterPressed[0] !== undefined">Enter pressed! Value: {{ valuesEnterPressed[0] }}</p>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        A search input which is disabled & prefilled
      </div>
      <nck-search-input
        v-model="values[1]"
        disabled
        clearButtonAltText="clear"
        searchButtonAltText="search"
        title="title"
        placeholder="Placeholder"
        @click="(value) => clickInput(1, value)"
        @enter-key-pressed="(value) => onEnterKey(1, value)"
        @input-cleared="onCleared"
      />
      <p v-if="valuesClicked[1] !== undefined">I was clicked! Value: {{ valuesClicked[1] }}</p>
      <p v-if="valuesEnterPressed[1] !== undefined">Enter pressed! Value: {{ valuesEnterPressed[1] }}</p>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        A search input with a label
      </div>
      <nck-search-input
        v-model="values[2]"
        clearButtonAltText="clear"
        searchButtonAltText="search"
        label="I'm a label"
        @click="(value) => clickInput(2, value)"
        @enter-key-pressed="(value) => onEnterKey(2, value)"
        @input-cleared="onCleared"
      />
      <p v-if="valuesClicked[2] !== undefined">I was clicked! Value: {{ valuesClicked[2] }}</p>
      <p v-if="valuesEnterPressed[2] !== undefined">Enter pressed! Value: {{ valuesEnterPressed[2] }}</p>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        A search input which has color primary & type filled
      </div>
      <nck-search-input
        v-model="values[3]"
        clearButtonAltText="clear"
        searchButtonAltText="search"
        title="title"
        placeholder="Placeholder"
        :searchButtonColor="ButtonColor.PRIMARY"
        :searchButtonType="ButtonType.FILLED"
        @click="(value) => clickInput(3, value)"
        @enter-key-pressed="(value) => onEnterKey(3, value)"
        @input-cleared="onCleared"
      />
      <p v-if="valuesClicked[3] !== undefined">I was clicked! Value: {{ valuesClicked[3] }}</p>
      <p v-if="valuesEnterPressed[3] !== undefined">Enter pressed! Value: {{ valuesEnterPressed[3] }}</p>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        A search input which is loading on click or enter
      </div>
      <nck-search-input
        v-model="values[4]"
        clearButtonAltText="clear"
        searchButtonAltText="search"
        title="title"
        placeholder="Placeholder"
        :loading="isLoading"
        loadingText="Loading"
        @click="isLoading = true"
        @enter-key-pressed="isLoading = true"
        @input-cleared="onCleared"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-top: 1.5rem;
  padding: 0 .5rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { ButtonColor, ButtonType, NckSearchInput } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";

const values = ref<string[]>([ "", "prefilled", "", "" ]);
const valuesClicked = ref<Array<string | undefined>>([]);
const valuesEnterPressed = ref<Array<string | undefined>>([]);
const isLoading = ref(false);

const clickInput = (index: number, value: string) => {
  valuesClicked.value[index] = value;
  valuesClicked.value = [ ...valuesClicked.value ]; // workaround to trigger render update
};
const onEnterKey = (index: number, value: string) => {
  valuesEnterPressed.value[index] = value;
  valuesEnterPressed.value = [ ...valuesEnterPressed.value ]; // workaround to trigger render update
};
const onCleared = () => console.log("input cleared!");
</script>
