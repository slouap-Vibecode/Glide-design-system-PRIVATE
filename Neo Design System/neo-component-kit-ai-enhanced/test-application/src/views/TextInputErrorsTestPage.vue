<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        A clearable text input without the 'clearButtonAltText' will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(0)">Toggle test case 0 to display error</button>
      <nck-text-input v-if="displayedTestCases[0]" label="I should trigger an error" clearable v-model="values[0]" />
    </div>
    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        A text input with the 'labelOutside' but without label will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(1)">Toggle test case 1 to display error</button>
      <nck-text-input v-if="displayedTestCases[1]" title="I'm a title" labelOutside placeholder="I'm a placeholder" />
    </div>
    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        A text input without label and without title will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(2)">Toggle test case 2 to display error</button>
      <nck-text-input v-if="displayedTestCases[2]" placeholder="I'm a placeholder" />
    </div>
    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        A text input without label and without placeholder will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(3)">Toggle test case 3 to display error</button>
      <nck-text-input v-if="displayedTestCases[3]" title="I'm a title" />
    </div>
    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        A text input with label and placeholder and without labelOutside will trigger an error.
      </div>
      <button class="test-app-style" @click="setError(4)">Toggle test case 4 to display error</button>
      <nck-text-input v-if="displayedTestCases[4]" label="I'm a label" placeholder="I'm a placeholder" />
    </div>
  </div>

</template>

<style scoped>
</style>

<script setup lang="ts">
import { NckTextInput } from "@neotechnologygroup/neo-component-kit";
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
  margin-bottom: 3rem;
}
</style>
