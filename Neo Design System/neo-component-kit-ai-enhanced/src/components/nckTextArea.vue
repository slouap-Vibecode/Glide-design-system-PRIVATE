<template>
  <span>
    <NckInputContainer
      parentComponent="NckTextArea"
      :label="label"
      :required="required"
      :errorMessage="errors[0]"
      :helpMessage="helpMessage"
      :inputId="inputId"
      :helpMessageId="helpMessageId"
      :errorMessageId="errorMessageId"
      :isMiniLabel="isMiniLabel"
      :readonly="readonly"
      :disabled="disabled"
      :inputFocused="inputFocused"
    >
      <textarea
        ref="textAreaRef"
        :aria-required="required"
        :aria-describedby="helpMessageId + ' ' + errorMessageId"
        :name="name"
        class="outside-focus nck-input-field nck-text-area nck-style nck-internal font-color-ink-100"
        :class="{
          'font-color-ink-40': disabled,
          'background-color-blue-grey-100': !readonly && !inputFocused,
          'background-color-white': !readonly && inputFocused,
          readonly,
        }"
        type="text"
        :value="modelValue"
        @input="updateValue"
        :id="inputId"
        :readonly="readonly"
        :disabled="disabled"
        :aria-invalid="errors.length > 0"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
        :inputmode="inputMode"
        :autocomplete="autocompleteType"
        v-on="handlers"
      >
      </textarea>
    </NckInputContainer>
  </span>
</template>

<style lang="less" scoped>
.nck-style.nck-text-area {
  resize: vertical;
  &.readonly {
    background-color: transparent;
    padding-left: 0;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, toRefs, toRef, watch, onMounted, useTemplateRef } from "vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";
import NckInputContainer from "./internal/nckInputContainer.vue";
import { IFormFieldWithValidationAndCustomRulesProps } from "./interfaces/internal/iFormFieldWithValidationAndCustomRulesProps";
import { INameFormFieldProps } from "./interfaces/internal/iNameFormFieldProps";

/**
 * @component
 * @displayName nck-text-area
 * An input field for long text value
 *
 * This component implements the interface "INckTextArea".
 * You can import this interface and use it to cast for using validation related
 * function.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - requiredField
 */

interface Props extends INameFormFieldProps, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * Height of the text area in rem
   */
  height?: number;

  /**
   * Label of the field.
   */
  label: string;

  /**
   * Type of data that will be entered in the field, it helps opening the dedicated keyboard on mobile devices.
   * possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   */
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

  /**
   * Allows to precise the "autocomplete" value for the field. Possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autocompleteType?: string;

  /**
   * Value of the field. This component supports "v-model" pattern.
   */
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 10,
  inputMode: "text",
  name: () => AccessibilityHelper.generateId(),
});

const emits = defineEmits<{
  /**
   * Emitted when the value is modified.
   * This component supports "v-model" pattern.
   */
  (event: "update:modelValue", value: string): void;
}>();

const { isValid, validate, isValidationEnabled, errors, handlers } = useCompositionFormFieldWithValidation(
  toRefs(props),
  focus,
  toRef(props, "rules", []),
);

defineExpose({
  /**
   * @public
   * Focus the text area.
   */
  focus,
  /**
   * @public
   * Return validity of the group. Be careful you need to validate first. Use 'validate' method
   *
   * Returns: true if valid, false otherwise
   */
  isValid,
  /**
   * @public
   * Validate that at least one checkbox is checked. Disabled checkboxes are ignored.
   *
   * Returns: Promise<boolean> — Promise resolving to true if the group is valid and to false otherwise
   */
  validate,
  /**
   * @public
   * Whether validation is enabled or not
   *
   * Returns: boolean
   */
  isValidationEnabled,
});

const inputId = ref<string>(AccessibilityHelper.generateId());
const helpMessageId = ref<string>(AccessibilityHelper.generateId());
const errorMessageId = ref<string>(AccessibilityHelper.generateId());
const inputFocused = ref<boolean>(false);
const textArea = useTemplateRef("textAreaRef");

onMounted(() => {
  setHeight();
});

watch(() => props.height, setHeight);

function setHeight() {
  if (textArea.value) {
    textArea.value.style.height = `${props.height}rem`;
  }
}

const isMiniLabel = computed(() => {
  return props.modelValue !== "" || (inputFocused.value && !props.readonly);
});

function focus() {
  if (textArea.value) {
    textArea.value.focus();
  }
}

function updateValue($event: Event) {
  const eventTarget = $event.target;
  // we are forxed to check type because event doesn't have a value in its generic form
  if (eventTarget instanceof HTMLTextAreaElement) {
    emits("update:modelValue", eventTarget.value);
  }
}
</script>

<docs>
Text area are intended to retrieve a long text user input.
Here is the text area in its simplest form
```jsx
const value = "";

<nck-text-area label="A simple input" v-model="value" />
```

You can set the height of the input by passing a value (it will be in rem).
By default it is 10rem.
```jsx
const value = "";

<nck-text-area label="A long simple input" v-model="value" :height="15" />
```

You can add a hint to help user fill its text area.
And you can also prefill the text area by setting a value.
```jsx
const value = "prefilled";

<nck-text-area label="A prefilled input with a hint" v-model="value" helpMessage="This is the hint" />
```

You can (and should) add validation to your field.
This is the validation that controls the error state display, along with the messages.
Only one error message is displayed at a time.

You can use the "ValidationRule" class exported by the Neo Component Kit.
```jsx
import { ValidationRule } from "@/models/validationRule";

const value = "";
const validationRules = [
  new ValidationRule((value) => /^[a-zA-Z]+$/.test(value), "This field should container only letters"),
  new ValidationRule((value) => !value || value.length <= 2, "This field cannot contain more than 2 characters")
];

<nck-text-area label="A field with validation" helpMessage="Type more than 2 characters, or numbers to trigger an error"
  v-model="value" :rules="validationRules" />
```

To make the text area read only, just use the 'readonly' property
````jsx
const value = "I'm readonly you cannot modify me";

<nck-text-area label="readonly input" v-model="value" readonly/>
````

You can make your field required. it will provide a special display and handle the validation for you
on the required aspect.
```jsx
const value = "I am required";

<nck-text-area label="required field" v-model="value" required />
```

You can set the "autocomplete" value for the field.
```jsx
const autocompleteType = "address-level2";
const value = "I am required";

<nck-text-area label="required field" v-model="value" autocompleteType="autocompleteType" required/>
```

You can specify the type of data that will be entered in the field, it helps opening the dedicated keyboard on mobile devices.
```jsx
const inputMode = "text";
const value = "I am required";

<nck-text-area label="required field" v-model="value" inputMode="inputMode" required/>
```

You can check if the field is valid, or trigger the validation by using methods exposed
by the component. Note that if you modify the text area programmatically, then you need to trigger validation
by yourself if you want the field to be validated again
```vue
<template>
  <div>
    <nck-text-area label="input label" ref="input" :rules="validationsRules"
      v-model="value" />

    <div>
      <button @click="displayValidity">Display text area validity</button>
      <button @click="validateInput">Validate text area</button>
      <button @click="value += '1'">modify text area value</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        validationsRules: [
          new ValidationRule((value) => /^[a-zA-Z]+$/.test(value), "This field should container only letters"),
          new ValidationRule((value) => !value || value.length <= 2, "This field cannot contain more than 2 characters")
        ]
      }
    },
    methods: {
      displayValidity() {
        const inputElement = this.$refs.input;
        alert("Is field valid? " + inputElement.isValid())
      },

      validateInput() {
        const inputElement = this.$refs.input;
        inputElement.validate();
      }
    }
  }
</script>
```
</docs>
