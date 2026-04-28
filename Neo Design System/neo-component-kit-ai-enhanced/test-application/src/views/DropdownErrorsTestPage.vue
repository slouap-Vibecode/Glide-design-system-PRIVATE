<template>
  <div class="icon-test">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p>
        Dropdown
      </p>
      <div>
        <button @click="setError(0)">Toggle test case 0 to display error</button>
        <nck-dropdown v-if="displayedTestCases[0]" v-model="values[0]" label="Dropdown" :options="options[0]"/>
      </div>
      Value: {{values[0]}}
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-test {
  .icon-test-container {
    background: lightgrey;

    .test {
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
}
</style>

<script setup lang="ts">
import { NckDropdown, IDropdownOption } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const values = ref<Array<string | number | boolean | null>>([ "" ]);
const options: IDropdownOption[][] = [
  []
];
const displayedTestCases = ref<boolean[]>([]);

function setError(index: number) {
  const nextDisplayedTestCases = [ ...displayedTestCases.value ];
  nextDisplayedTestCases[index] = !nextDisplayedTestCases[index];
  displayedTestCases.value = nextDisplayedTestCases;
}
</script>
