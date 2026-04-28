<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <h1>Error test page</h1>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p>
        <i>A loading area without "loading-placeholder" and no loadingText prop will trigger an error</i>
      </p>
      <button @click="displayedTestCases[0] = !displayedTestCases[0]">Display test case 0 to check error</button>
      <div v-if="displayedTestCases[0]">
        <button class="test-app-style" @click="startLoading1">Start loading when content is already here (is this use case stupid?)</button>
        <nck-loading-area :loading="loadingsStarted[0]" :size="mediumLoaderSize"
          :loadingFinishedText="'Test case ' + numberOfSizes + ' has finished loading'">
          I am the loaded content
        </nck-loading-area>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckLoadingArea } from "@neotechnologygroup/neo-component-kit";

const loadingsStarted = ref<boolean[]>([ false ]);
const displayedTestCases = ref<boolean[]>([]);

function startLoading1() {
  loadingsStarted.value[0] = true;
  setTimeout(() => {
    loadingsStarted.value[0] = false;
  }, 10000);
}
</script>
