<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>A checkbox with label displayed</div>
      </div>
      <nck-checkbox v-model="values[0]" label="hello checkbox" ref="checkbox" />
      <p class="test-app-style">value: {{ values[0] }}</p>
      <button class="test-app-style" data-focus-input @click="focusCheckbox">focus input</button>
    </div>

    <div data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>A checkbox with label hidden, and disabled</div>
      </div>
      <nck-checkbox v-model="values[1]" hideLabel disabled label="hello checkbox" />
      <p class="test-app-style">value: {{ values[1] }}</p>
    </div>

    <div data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>A checkbox with label hidden, selected and disabled</div>
      </div>
      <nck-checkbox disabled v-model="values[2]" hideLabel label="hello checkbox" />
      <p class="test-app-style">value: {{ values[2] }}</p>
    </div>

    <div data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>A checkbox with label hidden, selected</div>
      </div>
      <nck-checkbox v-model="values[3]" hideLabel label="hello checkbox" />
      <p class="test-app-style">value: {{ values[3] }}</p>
    </div>

    <div data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>A checkbox selected</div>
      </div>
      <nck-checkbox v-model="values[4]" label="hello checkbox with a very very
       very very very very very very very very very very very very very very very very
       very very very very very very very very very very very very very very very very
       very very very very very very very very very very very very very very very very
       very very very very very very very very very very very very very very very very
       very very very very very very very very very very very very very very very very
       very very very very very very very very very very very very very very very long label" />
      <p class="test-app-style">value: {{ values[4] }}</p>
    </div>

    <div data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>A checkbox disabled</div>
      </div>
      <nck-checkbox disabled v-model="values[5]" label="hello checkbox" />
      <p class="test-app-style">value: {{ values[5] }}</p>
    </div>

    <div data-test-case="6">
      <div class="test-case-description">
        <b>Test case 6</b>
        <div>An indeterminate checkbox (which is checked under the hood)</div>
      </div>
      <nck-checkbox indeterminate v-model="values[6]" label="hello checkbox" />
      <p class="test-app-style">value: {{ values[6] }}</p>
    </div>

    <div data-test-case="7">
      <div class="test-case-description">
        <b>Test case 7</b>
        <div>
          An indeterminate checkbox disabled (which is not checked under the
          hood)
        </div>
      </div>
      <nck-checkbox indeterminate disabled v-model="values[7]" label="hello checkbox" />
      <p class="test-app-style">value: {{ values[7] }}</p>
    </div>

    <div data-test-case="8">
      <div class="test-case-description">
        <b>Test case 8</b>
        <div>A disabled checkbox with right variant</div>
      </div>
      <div class="small-container">
        <nck-checkbox v-model="values[8]" label="Very long label, needs to wrap" disabled right />
      </div>
      <p class="test-app-style">value: {{ values[8] }}</p>
    </div>

    <div data-test-case="9">
      <div class="test-case-description">
        <b>Test case 9</b>
        <div>A checkbox with first-line-aligned</div>
      </div>
      <div class="small-container">
        <nck-checkbox v-model="values[9]" label="Very long label, needs to wrap" firstLineAligned />
      </div>
      <p class="test-app-style">value: {{ values[9] }}</p>
    </div>

    <div data-test-case="10">
      <div class="test-case-description">
        <b>Test case 10</b>
        <div>
          A right variant checkbox with hidden label and first-line-aligned
        </div>
      </div>
      <div class="small-container">
        <nck-checkbox v-model="values[10]" label="This label is hidden" firstLineAligned hideLabel right />
      </div>
      <p class="test-app-style">value: {{ values[10] }}</p>
    </div>

    <div data-test-case="11">
      <div class="test-case-description">
        <b>Test case 11</b>
        <div>A checkbox required, with an error message when it is not checked.</div>
      </div>
      <nck-checkbox v-model="values[11]" label="Required checkbox" ref="checkbox11" required />
      <p class="test-app-style">value: {{ values[11] }}</p>
      <button class="test-app-style validate-input" @click="checkValidityForCheckbox11">Validate</button>
      <p class="test-app-style" v-if="typeof validityStatus[11] === 'boolean'">
        This checkbox is {{ validityStatus[11] ? "valid" : "invalid" }}
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.small-container {
  width: 10rem;
  margin: auto;
  border: solid;
}
</style>

<script setup lang="ts">
import { INckCheckbox, NckCheckbox } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const validityStatus = ref<boolean[]>([]);
const values = ref<boolean[]>([
  false,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false
]);

const checkbox = ref<INckCheckbox | null>(null);
const checkbox11 = ref<INckCheckbox | null>(null);

function focusCheckbox() {
  if (checkbox.value) {
    checkbox.value.focus();
  }
}

async function checkValidityForCheckbox11() {
  const valid = await checkbox11.value.validate();
  const tmp = [ ...validityStatus.value ];
  tmp[11] = valid;
  validityStatus.value = tmp;
}
</script>
