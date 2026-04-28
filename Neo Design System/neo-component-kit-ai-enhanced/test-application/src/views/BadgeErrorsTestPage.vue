<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">
          <i>Badge with no label nor icon</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[0] = !displayedTestCases[0]"
      >
        Toggle test case 0 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[0]" />
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">
          <i>Badge with icon only but no alternative text</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[1] = !displayedTestCases[1]"
      >
        Toggle test case 1 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[1]" leadingIcon="dollar" />
      </div>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">
          <i>Badge with trailing icon but no label</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[2] = !displayedTestCases[2]"
      >
        Toggle test case 2 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[2]" trailingIcon="dollar" />
      </div>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        <p class="test-app-style">
          <i>Badge with click event but no trailing icon</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[3] = !displayedTestCases[3]"
      >
        Toggle test case 3 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[3]" label="dummy" ariaRole="button" @click="() => {}" />
      </div>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        <p class="test-app-style">
          <i>Badge with click event but no aria role</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[4] = !displayedTestCases[4]"
      >
        Toggle test case 4 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[4]" label="dummy" trailingIcon="dollar" @click="() => {}" />
      </div>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        <p class="test-app-style">
          <i>Badge with click event but no trailing icon nor aria role</i>
        </p>
      </div>

      <button
        class="test-app-style"
        @click="displayedTestCases[5] = !displayedTestCases[5]"
      >
        Toggle test case 5 to display error
      </button>
      <div>
        <nck-badge v-if="displayedTestCases[5]" label="dummy" @click="() => {}" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { NckBadge } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const displayedTestCases = ref<boolean[]>([]);
</script>
