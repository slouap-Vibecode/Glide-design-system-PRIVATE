<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">The label cannot be an empty string</p>
      </div>
      <button class="test-app-style" @click="displayTestCase(0)">
        Click me to toggle an error
      </button>
      <NckChipPopover
        v-if="isTestCaseDisplayed[0]"
        v-model="values[0]"
        label=""
      >
        <template #popover-body> I have no label </template>
      </NckChipPopover>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">The popover-body slot cannot be empty</p>
      </div>
      <button class="test-app-style" @click="displayTestCase(1)">
        Click me to toggle an error
      </button>
      <NckChipPopover
        v-if="isTestCaseDisplayed[1]"
        v-model="values[1]"
        label="I have no popover"
      />
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">
          An active chip popover should have a chip-cleared event
        </p>
      </div>
      <button class="test-app-style" @click="displayTestCase(2)">
        Click me to toggle an error
      </button>
      <NckChipPopover
        v-if="isTestCaseDisplayed[2]"
        v-model="values[2]"
        label="Active chip popover without a chip-cleared event"
        active
        clearIconAltText="Clear state"
      >
        <template #popover-body>
          I'm active but have no chip-cleared event
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        <p class="test-app-style">
          An active chip popover should have an alternative text for the clear
          icon
        </p>
      </div>

      <button class="test-app-style" @click="displayTestCase(3)">
        Click me to toggle an error
      </button>

      <NckChipPopover
        v-if="isTestCaseDisplayed[3]"
        v-model="values[3]"
        label="Active chip popover without clearIconAltText"
        active
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          I'm active but have no clearIconAltText
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        <p class="test-app-style">Counter badge must have integer value</p>
      </div>

      <button class="test-app-style" @click="displayTestCase(4)">
        Click me to toggle an error
      </button>

      <NckChipPopover
        v-if="isTestCaseDisplayed[4]"
        v-model="values[4]"
        label="Chip popover with non-integer trailing counter value"
        :trailingCounterValue="0.5"
      >
        <template #popover-body>
          I have non-integer trailing counter value
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        <p class="test-app-style">Counter badge can't have negative value</p>
      </div>

      <button class="test-app-style" @click="displayTestCase(5)">
        Click me to toggle an error
      </button>

      <NckChipPopover
        v-if="isTestCaseDisplayed[5]"
        v-model="values[5]"
        label="Chip popover with negative trailing counter value"
        :trailingCounterValue="-1"
      >
        <template #popover-body>
          I have negative trailing counter value
        </template>
      </NckChipPopover>
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  padding: 0.1875rem;
}
</style>

<script setup lang="ts">
import { NckChipPopover } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const nbTestCases = 6;

const isTestCaseDisplayed = ref(new Array(nbTestCases).fill(false));
const values = ref(new Array(nbTestCases).fill(false));

function displayTestCase(index: number) {
  const nextIsTestCaseDisplayed = [ ...isTestCaseDisplayed.value ];
  nextIsTestCaseDisplayed[index] = !isTestCaseDisplayed.value[index];
  isTestCaseDisplayed.value = nextIsTestCaseDisplayed;
}

</script>
