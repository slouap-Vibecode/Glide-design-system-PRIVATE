<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        A text area with 2 rules for validation (only accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-area label="input label" :rules="rules" v-model="values[0]" ref="input0" />
      <div>
        <button class="test-app-style validate-input" @click="checkValidityForInput0">Is this text area valid?</button>
        <button class="test-app-style" data-focus-input @click="focusInput0">focus input</button>
        <p class="test-app-style" v-if="typeof validityStatus[0] === 'boolean'">
          This text area is {{ validityStatus[0] ? "valid" : "invalid" }}
        </p>
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        A text area prefilled with a height of "15rem"
      </div>
      <nck-text-area label="input label" v-model="values[1]" :height=15 ref="input1" />
      <div>
        <button class="test-app-style validate-input" @click="validateInput1">Validate this text area</button>
        <p class="test-app-style" v-if="typeof validityStatus[1] === 'boolean'">
          This text area is {{ validityStatus[1] ? "valid" : "invalid" }}
        </p>
      </div>
    </div>

    <div data-test-case="2" style="background-color: lightgray">
      <div>
        <b>Test case 2</b>
        A text area which have an help message "This is the help message.", which is <strong>read only</strong> and have two rules (only
        accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-area label="input label" v-model="values[2]" helpMessage="This is the help message" readonly
        :rules="rules" ref="input2" />
      <div>
        <button class="test-app-style validate-input" @click="checkValidityForInput2">Is this text area valid?</button>
        <button class="test-app-style" data-focus-input @click="focusInput2">focus input</button>
        <p class="test-app-style" v-if="typeof validityStatus[2] === 'boolean'">
          This text area is {{ validityStatus[2] ? "valid" : "invalid" }}
        </p>
      </div>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        A text area prefilled with "prefilled", which is readonly and required.
      </div>
      <nck-text-area label="input label" readonly required v-model="values[3]" />
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        An text area prefilled with "prefilled", an height of "5rem" have an help message "This is the help message.", and
        two rules (only accept letter from a to z, and no more than 2 characters)
      </div>
      <nck-text-area label="input label" v-model="values[4]" :height=5 helpMessage="This is the help message"
        :rules="rules" ref="input4" />
      <div>
        <button class="test-app-style validate-input" @click="validateInput4">Validate this text area</button>
        <p class="test-app-style" v-if="typeof validityStatus[4] === 'boolean'">
          This text area is {{ validityStatus[4] ? "valid" : "invalid" }}
        </p>
      </div>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        A text area with an help message "This is the help message.", which is read only, and which is required.
      </div>
      <nck-text-area label="input label" v-model="values[5]" helpMessage="This is the help message." readonly required />
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        A text area which is required. It has autocompleteType set to "name".
      </div>
      <nck-text-area label="input label" v-model="values[6]" required ref="input6" autocompleteType="name" />
      <div>
        <button class="test-app-style validate-input" @click="validateInput6">Validate this text area</button>
        <p class="test-app-style" v-if="typeof validityStatus[6] === 'boolean'">
          This input is {{ validityStatus[6] ? "valid" : "invalid" }}
        </p>
      </div>
    </div>

    <div data-test-case="7">
      <div>
        <b>Test case 7</b>
        A text area which is read only, and required and have two rules (only accept letter from a to z, and no more than
        2 characters)
      </div>
      <nck-text-area label="input label" v-model="values[7]" readonly required :rules="rules" />
    </div>

    <div data-test-case="8">
      <div>
        <b>Test case 8</b>
        A text area which is prefilled with value "prefilled", has an help message "This is the help message." and is
        readonly
      </div>
      <nck-text-area label="input label" v-model="values[8]" helpMessage="This is the help message." readonly />
    </div>

    <div data-test-case="9">
      <div>
        <b>Test case 9</b>
        A text area which is disabled
      </div>
      <nck-text-area label="input label" v-model="values[9]" disabled />
    </div>

    <div data-test-case="10">
      <div>
        <b>Test case 10</b>
        A text area which is disabled, prefilled
      </div>
      <nck-text-area label="input label" v-model="values[10]" disabled />
    </div>

    <div data-test-case="11">
      <div>
        <b>Test case 11</b>
        A text area which is disabled and required
      </div>
      <nck-text-area label="input label" v-model="values[11]" required disabled />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-top: 1.5rem;
  padding: 0 .5rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { INckTextArea, NckTextArea, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";

const values = ref<string[]>([ "", "prefilled", "", "prefilled", "prefilled\ntext\nthat\nwill\nlikely\nscroll", "", "", "", "prefilled", "", "prefilled", "" ]);
const rules = ref<ValidationRule[]>([
  new ValidationRule((value: string) => /^[a-zA-Z]+$/.test(value), "This field should container only letters"),
  new ValidationRule((value: string) => !value || value.length <= 2, "This field cannot contain more than 2 characters")
]);
const validityStatus = ref<boolean[]>([]);
const input0 = ref<INckTextArea | null>(null);
const input1 = ref<INckTextArea | null>(null);
const input2 = ref<INckTextArea | null>(null);
const input4 = ref<INckTextArea | null>(null);
const input6 = ref<INckTextArea | null>(null);

function focusInput0() {
  if (input0.value) {
    input0.value.focus();
  }
}

function focusInput2() {
  if (input2.value) {
    input2.value.focus();
  }
}

function checkValidityForInput0() {
  const tmp = [ ...validityStatus.value ];
  tmp[0] = input0.value.isValid();
  validityStatus.value = tmp;
}

function validateInput1() {
  void input1.value.validate()
    .then((valid: boolean) => {
      const tmp = [ ...validityStatus.value ];
      tmp[1] = valid;
      validityStatus.value = tmp;
    });
}

function checkValidityForInput2() {
  const tmp = [ ...validityStatus.value ];
  tmp[2] = input2.value.isValid();
  validityStatus.value = tmp;
}

function validateInput4() {
  void input4.value.validate()
    .then((valid: boolean) => {
      const tmp = [ ...validityStatus.value ];
      tmp[4] = valid;
      validityStatus.value = tmp;
    });
}

function validateInput6() {
  void input6.value.validate()
    .then((valid: boolean) => {
      const tmp = [ ...validityStatus.value ];
      tmp[6] = valid;
      validityStatus.value = tmp;
    });
}
</script>
