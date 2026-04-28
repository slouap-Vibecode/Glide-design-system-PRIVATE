<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <h1 class="test-app-style nck-style header-1">Breaking use cases </h1>

    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        A placeholder without any title shoud throw an error
      </p>
      <p>
        <button class="test-app-style" @click="testCaseDisplayed = !testCaseDisplayed">Toggle test case 0 to display error</button>
      </p>
      <nck-placeholder v-if="testCaseDisplayed" subtitle="I'm missing a title" />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

<script setup lang="ts">
import { ref } from "vue";
import { NckPlaceholder } from "@neotechnologygroup/neo-component-kit";

const testCaseDisplayed = ref<boolean>(false);
</script>
