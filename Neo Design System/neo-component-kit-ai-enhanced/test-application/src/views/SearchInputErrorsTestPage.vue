<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Back to
      <router-link class="test-app-style" to="/search-input">search input tests</router-link>
    </div>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        A search input without the 'clearButtonAltText' will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(0)">Toggle test case 0 to display error</button>
      <nck-search-input v-if="displayedTestCases[0]" label="I should trigger an error" v-model="values[0]" searchButtonAltText="search" />
    </div>
    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        A search input without the 'searchButtonAltText' will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(1)">Toggle test case 1 to display error</button>
      <nck-search-input v-if="displayedTestCases[1]" label="I should trigger an error" v-model="values[0]" clearButtonAltText="clear" />
    </div>
    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        A search input without label and without title will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(2)">Toggle test case 2 to display error</button>
      <nck-search-input v-if="displayedTestCases[2]" placeholder="Placeholder" clearButtonAltText="clear" searchButtonAltText="search" />
    </div>
    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        A search input with invalid 'searchButtonColor' will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(3)">Toggle test case 3 to display error</button>
      <nck-search-input v-if="displayedTestCases[3]" label="I should trigger an error" clearButtonAltText="clear" searchButtonAltText="search" searchButtonColor="invalid" />
    </div>
    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        A search input with invalid 'searchButtonType' will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(4)">Toggle test case 4 to display error</button>
      <nck-search-input v-if="displayedTestCases[4]" label="I should trigger an error" clearButtonAltText="clear" searchButtonAltText="search" searchButtonType="invalid" />
    </div>
    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        A search input without label and without placeholder will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(5)">Toggle test case 5 to display error</button>
      <nck-search-input v-if="displayedTestCases[5]" title="title" clearButtonAltText="clear" searchButtonAltText="search" />
    </div>
    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        A search input with label and placeholder will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(6)">Toggle test case 6 to display error</button>
      <nck-search-input v-if="displayedTestCases[6]" placeholder="Placeholder" label="Label" clearButtonAltText="clear" searchButtonAltText="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NckSearchInput } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const values = ref([ "", "", "" ]);
const displayedTestCases = ref<boolean[]>([]);

function setError(index: number) {
  const nextDisplayedTestCases = [ ...displayedTestCases.value ];
  nextDisplayedTestCases[index] = !nextDisplayedTestCases[index];
  displayedTestCases.value = nextDisplayedTestCases;
}
</script>

<style scoped>
button {
  margin-top: 0.5rem;
}
[data-test-case] {
  margin-top: 3rem;
}
</style>
