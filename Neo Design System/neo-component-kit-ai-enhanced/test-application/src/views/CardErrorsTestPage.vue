<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>A clickable card without an aria role will trigger an error</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to display error</button>
      <nck-card v-if="displayedTestCases[0]" @click="someRandomClick" />
      {{ displayedTestCases }}
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>A card with aria role "button" (same for "link") will trigger an error if it is not clickable</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to display error</button>
      <nck-card v-if="displayedTestCases[1]" ariaRole="button" />
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>A card of type type "outlined" will trigger an error if the background-color is not "white"</i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to display error</button>
      <nck-card v-if="displayedTestCases[2]" :backgroundColor="CardBackgroundColor.RED" :type="CardType.OUTLINED" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CardBackgroundColor, CardType, NckCard } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);

function someRandomClick() {
  window.alert("boom");
}
</script>
