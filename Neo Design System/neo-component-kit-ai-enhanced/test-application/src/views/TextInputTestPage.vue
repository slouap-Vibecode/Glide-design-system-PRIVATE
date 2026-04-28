<template>
  <div :class="{ 'no-cursor': cursorHidden }">
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/textInput-errors">another page right here</router-link>
    </div>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        An input with 2 rules for validation (only accept letter from a to z, and no more than 2 characters), with a leading icon
      </div>
      <nck-text-input label="input label" :rules="rules" v-model="values[0]" ref="input0" leadingIcon="add-plus"/>
      <div>
        <button class="test-app-style validate-input" @click="validateInput(0)">Is this input valid?</button>
        <button class="test-app-style" data-focus-input @click="focusInput(0)">focus input</button>
        <p class="test-app-style" v-if="typeof validityStatus[0] === 'boolean'">
          This input is {{validityStatus[0] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        An input prefilled with "prefilled" which is clearable with a leading icon
      </div>
      <nck-text-input label="input label" v-model="values[1]" clearable clearButtonAltText="clear field" leadingIcon="add-plus" ref="input1"/>
      <div>
        <button class="test-app-style validate-input" @click="validateInput(1)">Validate this input</button>
        <p class="test-app-style" v-if="typeof validityStatus[1] === 'boolean'">
          This input is {{validityStatus[1] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="2" style="background-color: lightgray">
      <div>
        <b>Test case 2</b>
        An input which is clearable, have an help message "This is the help message.", which is <strong>read only</strong> and have two rules (only accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-input label="input label" v-model="values[2]" clearable clearButtonAltText="clear field" helpMessage="This is the help message" readonly :rules="rules" ref="input2"/>
      <div>
        <button class="test-app-style validate-input" @click="validateInput(2)">Is this input valid?</button>
        <button class="test-app-style" data-focus-input @click="focusInput(2)">focus input</button>
        <p class="test-app-style" v-if="typeof validityStatus[2] === 'boolean'">
          This input is {{validityStatus[2] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        An input prefilled with "prefilled", which is readonly and required, with a leading icon.
      </div>
      <nck-text-input label="input label" readonly required leadingIcon="add-plus"
        v-model="values[3]"/>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        An input prefilled with "prefilled", clearable, have an help message "This is the help message.", and two rules (only accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-input label="input label" v-model="values[4]" clearable clearButtonAltText="clear field" helpMessage="This is the help message" :rules="rules" ref="input4"/>
      <div>
        <button class="test-app-style validate-input" @click="validateInput(4)">Validate this input</button>
        <p class="test-app-style" v-if="typeof validityStatus[4] === 'boolean'">
          This input is {{validityStatus[4] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        An input field with an help message "This is the help message.", which is read only, and which is required.
      </div>
      <nck-text-input label="input label" v-model="values[5]" helpMessage="This is the help message." readonly required/>
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        An input field which is clearable, and is required. It has autocompleteType set to "name".
      </div>
      <nck-text-input label="input label" v-model="values[6]" clearButtonAltText="clear field" autocompleteType="name" required ref="input6"/>
      <div>
        <button class="test-app-style validate-input" @click="validateInput(6)">Validate this input</button>
        <p class="test-app-style" v-if="typeof validityStatus[6] === 'boolean'">
          This input is {{validityStatus[6] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="7">
      <div>
        <b>Test case 7</b>
        An input field which is clearable, is read only, and required and have two rules (only accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-input label="input label" v-model="values[7]" clearable clearButtonAltText="clear field" readonly required :rules="rules"/>
    </div>

    <div data-test-case="8">
      <div>
        <b>Test case 8</b>
        An input field which is prefilled with value "prefilled", has an help message "This is the help message." and is readonly
      </div>
      <nck-text-input label="input label" v-model="values[8]" helpMessage="This is the help message." readonly />
    </div>

    <div data-test-case="9">
      <div>
        <b>Test case 9</b>
        An input field which is disabled with a leading icon
      </div>
      <nck-text-input label="input label" v-model="values[9]" disabled leadingIcon="add-plus"/>
    </div>

    <div data-test-case="10">
      <div>
        <b>Test case 10</b>
        An input field which is disabled, prefilled, and is clearable
      </div>
      <nck-text-input label="input label" v-model="values[10]" disabled clearable clearButtonAltText="clear field" />
    </div>

    <div data-test-case="11">
      <div>
        <b>Test case 11</b>
        An input field wich accepts only numbers, and opens the decimal keyboard on mobile devices
      </div>
      <nck-text-input label="only numbers are allowed here" v-model="values[11]" inputMode="decimal" :allowedValue="/^-?[0-9]{0,9}([,\.][0-9]{0,20})?$/" clearButtonAltText="clear field" />
    </div>

    <div data-test-case="12">
      <div>
        <b>Test case 12</b>
        An input field which accepts only letters, and is clearable
      </div>
      <nck-text-input label="only letters are allowed here" v-model="values[12]" :allowedValue="/^[a-zA-Z]+$/" clearable clearButtonAltText="clear field" />
    </div>

    <div data-test-case="13">
      <div>
        <b>Test case 13</b>
        An input field which highlights its background when having its default value, and is clearable.
      </div>
      <nck-text-input label="input label" v-model="values[13]" highlight highlightText="Highlighted" clearable clearButtonAltText="clear field" />
    </div>

    <div data-test-case="14">
      <div>
        <b>Test case 14</b>
        An input field with an outside label and a leading icon with a readonly state.
      </div>
      <nck-text-input leadingIcon="flash" label="input readonly" v-model="values[14]" readonly labelOutside />
    </div>

    <div data-test-case="15">
      <div>
        <b>Test case 15</b>
        An input field with an outside label and a leading icon with focus.
      </div>
      <nck-text-input leadingIcon="rotate" label="supercalifragilisticexpialidocious" :rules="rules" v-model="values[15]" labelOutside clearable clearButtonAltText="clear field" ref="input15" />
      <div>
        <button class="test-app-style validate-input" @click="validateInput(15)">Is this input valid?</button>
        <button class="test-app-style" data-focus-input @click="focusInput(15)">focus input</button>
        <p class="test-app-style" v-if="typeof validityStatus[15] === 'boolean'">
          This input is {{validityStatus[15] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="16">
      <div>
        <b>Test case 16</b>
        An input field with a required outside label.
      </div>
      <nck-text-input required label="supercalifragilisticexpialidocious" :rules="rules" v-model="values[16]" labelOutside ref="input16" helpMessage="Hello help!" />
      <div>
        <button class="test-app-style validate-input" @click="validateInput(16)">Is this input valid?</button>
        <p class="test-app-style" v-if="typeof validityStatus[16] === 'boolean'">
          This input is {{validityStatus[16] ? "valid" : "invalid"}}
        </p>
      </div>
    </div>

    <div data-test-case="17">
      <div>
        <b>Test case 17</b>
        An input field with an outside label and leading icon with a disabled state.
      </div>
      <nck-text-input leadingIcon="plane" label="input label" :rules="rules" v-model="values[17]" disabled labelOutside />
    </div>

    <div data-test-case="18">
      <div>
        <b>Test case 18</b>
        An input field which is disabled with a leading icon which is required
      </div>
      <nck-text-input label="input label" required v-model="values[18]" disabled leadingIcon="add-plus"/>
    </div>

    <div data-test-case="19">
      <div>
        <b>Test case 19</b>
        An clearable input field without label, with a title, a help message, a placeholder
      </div>
      <nck-text-input title="Hello I'm a title" clearable clearButtonAltText="clear field" v-model="values[19]" helpMessage="This is the help message" placeholder="Placeholder"/>
    </div>

    <div data-test-case="20">
      <div>
        <b>Test case 20</b>
        An input field without label, with a title, a leading icon, a placeholder
      </div>
      <nck-text-input leadingIcon="search" title="Hello I'm a title" v-model="values[20]" placeholder="Placeholder"/>
    </div>

    <div data-test-case="21">
      <div>
        <b>Test case 21</b>
        An input field without label, with a title, a placeholder
      </div>
      <nck-text-input title="Hello I'm a title" placeholder="Placeholder" v-model="values[21]"/>
    </div>

    <div data-test-case="22">
      <div>
        <b>Test case 22</b>
        An input field without label, with a title, a placeholder, disabled
      </div>
      <nck-text-input title="Hello I'm a title" placeholder="Placeholder" disabled v-model="values[22]"/>
    </div>

    <div data-test-case="23">
      <div>
        <b>Test case 23</b>
        An input field with label outside and a placeholder
      </div>
      <nck-text-input label="Hello, I'm a label outside" labelOutside placeholder="Placeholder" v-model="values[23]"/>
    </div>

  </div>
</template>

<style lang="less" scoped>
.no-cursor {
  * {
    caret-color: transparent !important;
  }
}

[data-test-case] {
  margin-top: 1.5rem;
  padding: 0 .5rem;
}

[data-test-case="11"],
[data-test-case="12"],
[data-test-case="13"] {
  padding-bottom: 0.5rem;
}
</style>

<script setup lang="ts">
import { INckTextInput, NckTextInput, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";
import { ref, computed, getCurrentInstance } from "vue";

const instance = getCurrentInstance()?.proxy;

const values = ref([ "", "prefilled", "", "prefilled", "prefilled", "", "", "", "prefilled", "", "prefilled", "", "", "prefilled", "prefilled", "", "", "disabled input", "", "", "", "", "" ]);
const validityStatus = ref<boolean[]>([]);
const rules: ValidationRule[] = [
  new ValidationRule((value: string) => /^[a-zA-Z]+$/.test(value), "This field should container only letters"),
  new ValidationRule((value: string) => !value || value.length <= 2, "This field cannot contain more than 2 characters")
];

function focusInput(index: number) {
  const input = instance?.$refs["input" + index.toString()];
  if (input) {
    (input as INckTextInput).focus();
  }
}

async function validateInput(index: number) {
  const input = instance?.$refs["input" + index.toString()] as INckTextInput;
  const valid = await input.validate();

  const nextValidityStatus = [ ...validityStatus.value ];
  nextValidityStatus[index] = valid;
  validityStatus.value = nextValidityStatus;
}

const cursorHidden = computed(() => instance?.$route.query.hideCursor === "1");
</script>
