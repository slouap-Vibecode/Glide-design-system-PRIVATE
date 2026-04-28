<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">
          <i>An icon only button will trigger an error if no alternative text is provided</i>
        </p>
      </div>

      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to
        display error</button>
      <div>
        <nck-button v-if="displayedTestCases[0]" leftIcon="add-plus"></nck-button>
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">
          <i>A button without loadingText shoudl trigger an error when loading is set</i>
        </p>
      </div>

      <button class="test-app-style" @click="loading = true">Set loading on test case 1 to display error</button>
      <div>
        <nck-button :loading="loading" label="I will throw an error because I don't have a loading state"></nck-button>
      </div>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">
          <i>An icon only button will trigger an error if no alternative text is provided</i>
        </p>
      </div>

      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to
        display error</button>
      <div>
        <nck-button v-if="displayedTestCases[2]" rightIcon="add-plus"></nck-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
}

.separator {
  border: 1px solid black;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { NckButton } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([ false, false, false ]);
const loading = ref<boolean>(false);
</script>
