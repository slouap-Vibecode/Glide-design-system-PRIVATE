<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>
          An icon with an invalid name ("azertyVSqwerty") and empty string alt text will trigger an error
        </i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to display error</button>
      <NckIcon v-if="displayedTestCases[0]" iconName="azertyVSqwerty" :iconSize="IconSize.S" iconAltText="" />
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>
          An icon with an invalid size ("boom") will trigger an error
        </i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to display error</button>
      <NckIcon v-if="displayedTestCases[1]" iconName="close" iconSize="boom" iconAltText="" />
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>
          An icon without an alternative text will trigger error
        </i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to display error</button>
      <NckIcon v-if="displayedTestCases[2]" iconName="close" :iconSize="IconSize.S" />
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>
          An icon with an invalid name ("couic") and non-empty ("couic alt") alt text will trigger an error and display the alternative text
        </i>
      </p>
      <button class="test-app-style" @click="displayedTestCases[3] = !displayedTestCases[3]">Toggle test case 3 to display error</button>
      <div>
        <NckIcon v-if="displayedTestCases[3]" iconName="couic" :iconSize="IconSize.S" iconAltText="couic alt" />
      </div>
    </div>
     <div :data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        When icon fails loading, an iconContentFailed event is raised.
      </p>
       <button class="test-app-style" @click="displayedTestCases[4] = !displayedTestCases[4]">Toggle test case 4 to display error</button>
      <div>
        <NckIcon
          v-if="displayedTestCases[4]"
          iconName="jean-michel"
          :iconSize="IconSize.M"
          iconAltText=""
          @iconContentFailed="iconLoadingCompleted = true"
        />
        <div>{{ iconLoadingCompleted ? "Icon failed loading" : "Icon not loaded yet" }}</div>
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
import { NckIcon, IconSize } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const displayedTestCases = ref<boolean[]>([]);
const iconLoadingCompleted = ref<boolean>(false);
</script>
