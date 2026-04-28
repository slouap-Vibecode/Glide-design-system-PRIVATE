<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>A breadcrumb that doesn't have graphic element defined will throw an error</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to
        display error</button>
      <nck-breadcrumb v-if="displayedTestCases[0]" :options="optionsWithoutGraphic" :activeStep="1" />
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>A breadcrumb that doesn't have alternative to an icon or image will throw an error</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to
        display error</button>
      <nck-breadcrumb v-if="displayedTestCases[1]" :options="optionsWithoutAlternative" :activeStep="1" />
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>A breadcrumb that doesn't have an aria-label or is labeled by an element will throw an error</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to
        display error</button>
      <nck-breadcrumb v-if="displayedTestCases[2]" :options="optionsWithoutError" :activeStep="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckBreadcrumb, IBreadcrumbOption } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);
const optionsWithoutGraphic = ref<IBreadcrumbOption[]>([
  { text: "I have a counter so I am all fine", counter: true, onClick: () => { /**/ } },
  { text: "I will cause an error, because I don't have graphics", onClick: () => { /**/ } }
]);
const optionsWithoutAlternative = ref<IBreadcrumbOption[]>([
  { text: "I have a counter so I am all fine", counter: true, onClick: () => { /**/ } },
  {
    text: "I will cause an error, because I don't have alternative",
    imageUrl: "Neo_Core_System.svg",
    onClick: () => { /**/ }
  }
]);
const optionsWithoutError = ref<IBreadcrumbOption[]>([
  { text: "I have a counter so I am all fine", counter: true, onClick: () => { /**/ } },
  { text: "Boom no alternative", counter: true, onClick: () => { /**/ } }
]);
</script>
