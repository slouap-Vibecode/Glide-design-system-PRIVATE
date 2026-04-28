<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">
          <i>This datepicker, not being in range mode, expects a 'label' prop</i>
        </p>
      </div>

      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to
        display error</button>
      <div>
        <nck-datepicker-range v-if="displayedTestCases[0]" v-model="singleDate" />
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">
          <i>This datepicker, being in range mode, expects a 'startRangeLabel' prop</i>
        </p>
      </div>

      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to
        display error</button>
      <div>
        <nck-datepicker-range v-if="displayedTestCases[1]" v-model="startAndEndDates" endRangeLabel="End date" />
      </div>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">
          <i>This datepicker, being in range mode, expects an 'endRangeLabel' prop</i>
        </p>
      </div>

      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to
        display error</button>
      <div>
        <nck-datepicker-range v-if="displayedTestCases[2]" v-model="startAndEndDates" startRangeLabel="Start date" />
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
import { NckDatepickerRange } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);
const singleDate = ref<Date[]>([ new Date("2022-06-01T00:00:00") ]);
const startAndEndDates = ref<Date[]>([ new Date("2022-06-12T00:00:00"), new Date("2022-06-19T00:00:00") ]);
</script>
