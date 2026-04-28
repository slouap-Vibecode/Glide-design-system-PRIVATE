<template>
  <div
    class="nck-style nck-internal nck-checkbox"
    :class="{
      disabled,
      'nck-checkbox-right': right && !hideLabel,
      'nck-checkbox-first-line-aligned': firstLineAligned,
    }"
  >
    <div class="checkbox-content">
      <input
        class="screenreader-only"
        type="checkbox"
        :name="name"
        :id="internalId"
        v-model="internalValue"
        @click="emitCheckboxClicked"
        :disabled="disabled"
        ref="input"
        :tabindex="onlyFocusableProgrammatically ? '-1' : '0'"
      />
      <label :for="internalId" class="font-color-ink-100 text-m">
        <div class="checkbox-display" :class="{ 'nck-invalid-border': errors.length > 0 }">
          <span class="nck-checkmark">
            <div class="nck-indeterminate-line"></div>
            <svg viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <g
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline
                  class="nck-checkmark-path"
                  stroke-width="2"
                  points="0.997741699 3.63619995 3.99942017 6.81130981 9.00457764 1.18789673"
                ></polyline>
              </g>
            </svg>
          </span>
        </div>
        <span class="checkbox-label" :class="{ 'screenreader-only': hideLabel }">{{ label }}</span>
        <span
          v-if="required"
          aria-hidden="true"
          :class="{ 'font-color-red-300': !disabled }"
          class="required-sign text-m"
          >*</span
        >
      </label>
      <div class="messages-area error text-s" v-if="errors[0]" :id="errorMessageId">
        <NckIcon
          class="error-icon"
          iconName="glyphs-warning-filled"
          :iconAltText="errorText"
          :iconSize="IconSize.XS"
          :primaryColor="IconColors.RED_300"
        />
        <span>{{ errors[0] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/sizeVariables.less";
@import (reference) "../styles/focusMixins.less";

.nck-internal.nck-style.nck-checkbox {
  position: relative;
  display: inline-block;
  max-width: 100%;

  @padding: 0.25rem;

  padding: @padding;
  margin: -@padding;

  .checkbox-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;

    .checkbox-display {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: @checkbox-size;
      height: @checkbox-size;

      @media @desktop {
        width: @checkbox-size-desktop;
        height: @checkbox-size-desktop;
      }

      margin-right: @checkbox-margin-right;
      border-radius: var(--nck-radius-s);
      background: var(--white);
      border: var(--nck-border-width-s) solid var(--nck-border-neutral-hover);
      transition:
        border var(--nck-duration-400) var(--nck-easing-out),
        background var(--nck-duration-400) var(--nck-easing-out);
      box-sizing: border-box;
      position: relative;

      &.nck-invalid-border {
        border-color: var(--nck-border-negative);
      }

      .nck-indeterminate-line {
        display: none;
        height: 0.125rem;
        width: calc(@checkbox-size / 2);
        border-radius: 0.0625rem;

        @media @desktop {
          width: calc(@checkbox-size-desktop / 2);
          border-radius: 0.125rem;
        }

        background: var(--white);
        flex: 0 0 auto;
      }
    }

    // Clickable area
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 1;
    }
  }

  .nck-checkmark {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.875rem;
    height: 0.875rem;

    @media @desktop {
      width: 1rem;
      height: 1rem;
    }

    svg {
      display: block;
      width: 0.625rem;
      height: 0.5rem;

      .nck-checkmark-path {
        stroke: var(--nck-icon-reverse);
        stroke-dasharray: 12;
        stroke-dashoffset: 12;
      }
    }
  }

  .checkbox-label {
    flex: 1 1 auto;
  }

  &.nck-checkbox-right {
    width: 100%;

    label {
      flex-direction: row-reverse;

      .checkbox-display {
        margin-right: 0;
        margin-left: var(--nck-spacing-s);
      }
    }
  }

  &.nck-checkbox-first-line-aligned {
    label {
      align-items: flex-start;

      @media @desktop {
        .checkbox-display {
          top: 0.125rem;
        }
      }
    }
  }

  input[type="checkbox"] {
    &:focus {
      outline-offset: 0;
    }

    &:not(:disabled):not(:checked):not(:focus):not(:indeterminate):hover ~ label > .checkbox-display {
      border: var(--nck-border-width-s) solid var(--nck-border-active-hover);
      &.nck-invalid-border {
        border-color: var(--nck-border-negative-hover);
      }
    }

    &:focus ~ label > .checkbox-display {
      border: var(--nck-border-width-s) solid var(--nck-border-active);
      &.nck-invalid-border {
        border-color: var(--nck-border-negative);
        box-shadow: var(--box-shadow-invalid);
      }
      .outside-focus-mixin();
    }

    &:checked:not(:indeterminate) {
      & ~ label .nck-checkmark .nck-checkmark-path {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset var(--nck-duration-400) var(--nck-easing-out);
      }

      & ~ label > .checkbox-display {
        background: var(--nck-surface-info-solid);
        border: none;
        &.nck-invalid-border {
          background: var(--nck-surface-negative-solid);
        }
      }

      &:hover ~ label > .checkbox-display {
        background: var(--nck-surface-info-solid-hover);
        &.nck-invalid-border {
          background: var(--nck-surface-negative-solid-hover);
        }
      }
    }

    &:disabled {
      & ~ label {
        cursor: default;
        color: var(--nck-text-disabled);
        .checkbox-display {
          border: var(--nck-border-width-s) solid var(--nck-icon-disabled);
        }
      }
      &:checked ~ label > .checkbox-display,
      &:hover:checked ~ label > .checkbox-display {
        background: var(--nck-icon-disabled);
        border: none;
      }
    }

    &:indeterminate {
      & ~ label .checkbox-display {
        .nck-indeterminate-line {
          display: block;
        }

        svg {
          display: none;
        }
      }

      & ~ label > .checkbox-display {
        background: var(--nck-surface-info-solid);
        border: none;
        &.nck-invalid-border {
          background: var(--nck-surface-negative-solid);
        }
      }

      &:hover ~ label > .checkbox-display {
        background: var(--nck-surface-info-solid-hover);
        &.nck-invalid-border {
          background: var(--nck-surface-negative-solid-hover);
        }
      }

      &:disabled ~ label > .checkbox-display {
        background: var(--nck-icon-disabled);
        border: none;
        &.nck-invalid-border {
          background: var(--nck-surface-negative-solid-hover);
        }
      }
    }
  }

  .required-sign {
    margin-left: var(--nck-spacing-3xs);
    color: var(--nck-text-negative);
  }

  .messages-area {
    margin-top: var(--nck-spacing-2xs);
    display: flex;
    &.error {
      color: var(--nck-text-negative);
    }
    .error-icon {
      margin-right: var(--nck-spacing-s);
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref, toRef, toRefs, watch } from "vue";
import { useCheckboxCore } from "@/composables/useCheckboxCore";
import NckIcon from "./nckIcon.vue";
import { IconSize } from "../constants/iconSize";
import { IconColors } from "../constants/iconColors";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";

/**
 * @component
 * @displayName nck-checkbox
 * A checkbox component to allow user to toggle a value.
 *
 * This component implements "INckCheckbox" interface.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

interface Props {
  /**
   * Value of the checkbox. This component supports "v-model" pattern.
   */
  modelValue: boolean;

  /**
   * Label of the checkbox. Note that even if it is hidden a label is needed for
   * screenreaders. So never ever put an empty string.
   */
  label: string;

  /**
   * Do not display the label (but it'll still be conveyed to screenreader users).
   */
  hideLabel?: boolean;

  /**
   * Make focus on checkbox possible only programmatically.
   * Prevent natural focus when needed.
   * The usage of this prop is only needed in a few exceptional cases.
   */
  onlyFocusableProgrammatically?: boolean;

  /**
   * Disable the checkbox.
   */
  disabled?: boolean;

  /**
   * Name of the checkbox input.
   */
  name?: string;

  /**
   * Set checkbox in indeterminate state (the display wins over checked state)
   */
  indeterminate?: boolean;

  /**
   * Put the checkbox on the right side of its container. The label stays on the left.
   */
  right?: boolean;

  /**
   * Align the checkbox with the first line of label in case of overflow
   */
  firstLineAligned?: boolean;

  /**
   * Whether the checkbox must be checked or not.
   */
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  indeterminate: false,
  name: () => AccessibilityHelper.generateId(),
});

const emits = defineEmits<{
  /**
   * Emitted when value is changed.
   * This component supports "v-model" pattern.
   *
   * @param {boolean} value the value of the checkbox
   */
  (e: "update:modelValue", newValue: boolean): void;

  /**
   * Emitted when the checkbox is clicked
   */
  (e: "checkbox-clicked"): void;
}>();

const ruleNames = computed(() => {
  if (props.disabled) {
    return "";
  } else if (props.required) {
    return "required";
  }
  return "";
});

const input = ref<HTMLInputElement | null>(null);
const { internalId, internalValue, focus } = useCheckboxCore(toRef(props, "modelValue"), input);

const { isValid, validate, isValidationEnabled, errors } = useCompositionFormFieldWithValidation(
  toRefs(props),
  focus,
  ruleNames,
);

defineExpose({
  /**
   * @public
   * Focus the checkbox.
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

const errorMessageId = AccessibilityHelper.generateId();
const errorText = computed<string>(() => {
  const errorText = GlobalOptionsProvider.getInstance().getOptions()?.translations?.error;
  return errorText ?? "";
});

function setIndeterminate() {
  if (input.value instanceof HTMLInputElement) {
    input.value.indeterminate = props.indeterminate;
  }
}

function updateValue() {
  emits("update:modelValue", internalValue.value);
}

onMounted(() => {
  setIndeterminate();
});

function emitCheckboxClicked() {
  if (!props.disabled) {
    emits("checkbox-clicked");
  }
}

watch(() => props.indeterminate, setIndeterminate);
watch(internalValue, updateValue);
watch(() => props.modelValue, validate);
</script>

<docs>
A simple checkbox.

```jsx
const value = false;

<nck-checkbox v-model="value" label="Hello checkbox" />
```

You can hide the label, and can pre-select it by default. Note that even if the label is hidden, it is needed for
screenreaders. So never ever put an empty string.
```jsx
const value = true;

<nck-checkbox v-model="value" label="Hello checkbox" hide-label/>
```

The input can be disabled.
```jsx
const value1 = false;
const value2 = true;

<div>
  <nck-checkbox v-model="value1" label="Hello checkbox" disabled/>
  <nck-checkbox v-model="value2" label="Hello checkbox" disabled/>
</div>
```

You can set indeterminate state to the checkbox. It is not something that can
be set by a user but only through code. As soon as user interacts with the checkbox
the indeterminate state will disappear.

```jsx
const value1 = false;
const value2 = true;

<div>
  <nck-checkbox v-model="value1" label="Hello checkbox" indeterminate/>
  <nck-checkbox v-model="value2" label="Hello checkbox" indeterminate disabled/>
</div>
```

Right variant

```jsx
const value = false;

<div style="width: 15rem; border: solid;">
  <nck-checkbox v-model="value" label="This label should be on the left" right />
</div>
```

A checkbox with wrapped label

```jsx
const value = false;

<div style="width: 10rem;">
  <nck-checkbox v-model="value" label="Very long label, needs to wrap"/>
</div>
```

A checkbox with wrapped label but first-line-aligned

```jsx
const value = false;

<div style="width: 10rem;">
  <nck-checkbox v-model="value" label="Very long label, needs to wrap" first-line-aligned/>
</div>
```

A checkbox that is required.

```vue
<template>
  <div>
    <nck-checkbox v-model="value" label="I accept the policy" required ref="checkbox"/>
    <p>value: {{ value }}</p>
    <button @click="checkValidityForCheckbox">Validate</button>
    <button @click="displayValidity">Display checkbox validity</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: false
      }
    },
    methods: {
      displayValidity() {
        const checkboxRef = this.$refs.checkbox;
        alert("Is the checkbox valid? " + checkboxRef.isValid())
      },
      checkValidityForCheckbox() {
        const checkboxRef = this.$refs.checkbox;
        checkboxRef.validate();
        console.log('validation', checkboxRef.$refs.validation)
      }
    }
  }
</script>
```
</docs>
