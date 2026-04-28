<template>
  <span>
    <div class="nck-style nck-internal nck-radio-buttons">
      <div class="font-color-ink-70 group-label" :class="{ 'screenreader-only': hideLabel }" :id="labelId">
        {{ groupLabel
        }}<span
          v-if="required"
          aria-hidden="true"
          :class="{ 'font-color-red-300': !disabled && !allOptionsDisabled }"
          class="required-sign"
          >*</span
        >
      </div>
      <NckRadioGroup
        ref="radioGroup"
        :options="options"
        :modelValue="modelValue"
        :name="name"
        :direction="direction"
        :display="display"
        :labelId="labelId"
        :required="required"
        :valid="!errors || errors.length === 0"
        :errorMessageId="errorMessageId"
        @update:model-value="selectValue($event)"
        :helpMessageId="helpMessage ? helpMessageId : null"
        :firstLineAligned="firstLineAligned"
      >
      </NckRadioGroup>
      <div class="messages-area text-s" v-if="helpMessage" :id="helpMessageId">
        <span>{{ helpMessage }}</span>
      </div>
      <div class="messages-area error text-s" v-if="errors[0]" :id="errorMessageId">
        <NckIcon
          class="error-icon"
          iconName="glyphs-warning-filled"
          :iconAltText="errorIconAltText"
          :iconSize="IconSize.XS"
          :primaryColor="IconColors.RED_300"
        />
        <span>{{ errors[0] }}</span>
      </div>
    </div>
  </span>
</template>

<style scoped lang="less">
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/typography.less";

.nck-style.nck-radio-buttons {
  .group-label {
    text-align: left;
    .text-m();

    @media @phone, @tablet {
      .text-l();
    }

    .required-sign {
      margin-left: 0.125rem;
    }
  }
  .messages-area {
    margin-top: 0.25rem;
    display: flex;
    color: var(--nck-text-secondary);
    &.error {
      color: var(--nck-text-negative);
    }
    .error-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, PropType, ref, watch, toRefs } from "vue";
import NckIcon from "./nckIcon.vue";
import NckRadioGroup from "./internal/nckRadioGroup.vue";
import { IRadioButtonOption } from "../models/iRadioButtonOption";
import { AccessibilityHelper } from "../helpers/accessibilityHelper";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import { GroupDirection } from "@/constants/groupDirection";
import { RadioButtonsDisplay } from "@/constants/radioButtonsDisplay";
import { IconSize } from "../constants/iconSize";
import { IconColors } from "../constants/iconColors";

/**
 * @component
 * @displayName nck-radio-buttons
 * A group of radio buttons to get user input on one choice among many.
 *
 * This component implements the interface "INckRadioButtons".
 * You can import this interface and use it to cast for using validation related
 * function.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - requiredField
 */

const props = defineProps({
  /**
   * An array of objects describing each radio options.
   *
   * The following properties are available:
   *
   *  - text (string, mandatory): displayed label of the radio button
   *  - value (string, mandatory): the functionnal value of the radio button
   *  - disabled (boolean, optional): whether the radio is disabled or not
   */
  options: {
    type: Array as PropType<IRadioButtonOption[]>,
    required: true,
  },

  /**
   * Value of the radio groups.
   * This component supports "v-model" pattern.
   */
  modelValue: {
    required: true,
    type: String,
  },

  /**
   * The labeling of the radio groups. It is mandatory for accessibility even if it is
   * not displayed. To hide it use the "hideLabel" prop.
   */
  groupLabel: {
    required: true,
    type: String,
  },

  /**
   * Hide the group label (visually).
   */
  hideLabel: {
    type: Boolean,
  },

  /**
   * Direction in which the radio buttons will be laid out.
   *
   * Accepts one of the [GroupDirection](#groupdirection) value.
   */
  direction: {
    default: GroupDirection.HORIZONTAL,
    type: String as PropType<GroupDirection>,
    validator: (value: GroupDirection) => Object.values(GroupDirection).includes(value),
  },

  /**
   * Display type for radio buttons (radio or chip display).
   *
   * Accepts one of the [RadioButtonsDisplay](#radiobuttonsdisplay) value.
   */
  display: {
    default: RadioButtonsDisplay.RADIO,
    type: String as PropType<RadioButtonsDisplay>,
    validator: (value: RadioButtonsDisplay) => Object.values(RadioButtonsDisplay).includes(value),
  },

  /**
   * Name of the field.
   */
  name: { type: String, default: () => AccessibilityHelper.generateId() },

  /**
   * Makes the field readonly.
   */
  readonly: {
    type: Boolean,
  },

  /**
   * Disable the field.
   */
  disabled: {
    type: Boolean,
  },

  /**
   * Whether the field is required or not.
   *
   * It provides style, accessibility and field validation.
   */
  required: {
    type: Boolean,
  },

  /**
   * Align the radio buttons with the first line of label in case of overflow.
   */
  firstLineAligned: {
    type: Boolean,
  },

  /**
   * A message to help user in their use of the field.
   * It is displayed below the field.
   */
  helpMessage: { type: String },
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes.
   * This component supports v-model pattern.
   */
  (event: "update:modelValue", value: string): void;
}>();

const labelId = AccessibilityHelper.generateId();
const errorMessageId = AccessibilityHelper.generateId();
const helpMessageId = AccessibilityHelper.generateId();

const radioGroup = ref<InstanceType<typeof NckRadioGroup> | null>(null);

const allOptionsDisabled = computed(() => {
  return props.disabled || props.options.filter((option) => !option.disabled).length === 0;
});

const ruleNames = computed(() => {
  let rules = "";

  // override of FormFieldWithValidationMixin in order to check whether all options are disabled
  if (props.disabled || props.readonly || allOptionsDisabled.value) {
    rules = "";
  } else if (props.required) {
    rules = "required";
  }

  return rules;
});

const errorIconAltText = computed(() => {
  const errorText = GlobalOptionsProvider.getInstance()?.getOptions()?.translations?.error;
  if (!errorText) {
    throw new Error("Error in nckRadioButtons: you must provide 'error' translation");
  }
  return errorText;
});

const { validate, isValid, isValidationEnabled, errors } = useCompositionFormFieldWithValidation(
  toRefs(props),
  focus,
  ruleNames,
);

function focus() {
  radioGroup.value?.focus();
}

defineExpose({
  /**
   * @public
   * Focus the radio button, either the selected if any, or the first non-disabled one otherwise
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

function selectValue(newValue: string) {
  emit("update:modelValue", newValue);
}

watch(() => props.modelValue, validate);
</script>

<docs>
Radio buttons display a choice to user where they can choose only one.

Here the most basic radio buttons. Radio buttons have a label which is always mandatory for accessibility reason.
By default the label is displayed.
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "Second value"}
];

<nck-radio-buttons name="myRadios1" groupLabel="My radio buttons" :options="radioButtonsOptions" v-model="value" />

Current value: {{value}}
```

Radio buttons can be displayed as chips
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "Second value"}
];

<nck-radio-buttons name="myRadios2" groupLabel="My radio buttons" :display="RadioButtonsDisplay.CHIP" :options="radioButtonsOptions" v-model="value" />

Current value: {{value}}
```

Radio buttons can have a help message displayed
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "Second value"}
];

<nck-radio-buttons name="myRadios3" helpMessage="you can enter a help message here" groupLabel="My radio buttons" :display="RadioButtonsDisplay.CHIP" :options="radioButtonsOptions" v-model="value" />

Current value: {{value}}
```

You can also hide the label if you don't want it.
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "Second value"}
];

<nck-radio-buttons name="myRadios4" groupLabel="My radio buttons, but with label hidden" hideLabel :options="radioButtonsOptions" v-model="value" />

Current value: {{value}}
```

Radio buttons with wrapped labels.

```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value with a very long label" },
  { value: "2", text: "Second value with a very long label"}
];

<div style="width: 10rem;">
  <nck-radio-buttons name="myRadios5" groupLabel="My radio buttons" :options="radioButtonsOptions" v-model="value" />
</div>
```

Radio buttons with wrapped labels but first-line-aligned.

```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value with a very long label" },
  { value: "2", text: "Second value with a very long label"}
];

<div style="width: 10rem;">
  <nck-radio-buttons name="myRadios6" groupLabel="My radio buttons" firstLineAligned :options="radioButtonsOptions" v-model="value" />
</div>
```

You can set a direction for your radio buttons group. By default it is
horizontally displayed, but you can also display it vertically.
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "Second value" },
  { value: "abcde", text: "Another value" }
];

<nck-radio-buttons name="myRadios7" groupLabel="My radio buttons vertically displayed" :options="radioButtonsOptions" v-model="value"
  :direction="GroupDirection.VERTICAL"/>

Current value: {{value}}
```

The value can be preselected by setting the value to one of the values of the radio buttons.
```jsx
const value = "preselected";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "preselected", text: "Second value"}
];

<nck-radio-buttons name="myRadios8" groupLabel="My radio buttons, but with label hidden" hideLabel :options="radioButtonsOptions" v-model="value" />

Current value: {{value}}
```

You can also disable one or more radio button options.
```jsx
const value = "";
const radioButtonsOptions = [
  { value: "1", text: "First value" },
  { value: "2", text: "I am disabled!", disabled: true },
  { value: "abcde", text: "Another value" }
];

<nck-radio-buttons name="myRadios9" groupLabel="My radio buttons vertically displayed" :options="radioButtonsOptions" v-model="value"
  :direction="GroupDirection.VERTICAL"/>

Current value: {{value}}
```

You can set as required the selection of a radio button within the group. This will provide a special display and handle the validation for you
on the required aspect.

You can check if the field is valid, or trigger the validation by using methods exposed
by the component. Note that if you modify the input programmatically, then you need to trigger validation
by yourself if you want the field to be validated again.

Please note also that if a radio selection is required and the group label is hidden, the user won't be visually informed
(through the '*' symbol) of the required nature of the radio group.

```vue
<template>
  <div>
    Value is : {{value}}
    <nck-radio-buttons name="myRadios10" groupLabel="Please choose an option" :options="radioButtonsOptions"
      v-model="value" ref="radios" required />

    <div>
      <button @click="displayValidity">Display radio group validity</button>
      <button @click="validateRadios">Validate radio group</button>
      <button @click="value = '' + (Number(value) + 1)">Increment value</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        radioButtonsOptions : [
          { value: "1", text: "First value" },
          { value: "2", text: "Second value" },
          { value: "3", text: "Third value" }
        ]
      }
    },
    methods: {
      displayValidity() {
        const radioButtons = this.$refs.radios;
        alert("Is field valid? " + radioButtons.isValid())
      },
      validateRadios() {
        const radioButtons = this.$refs.radios;
        radioButtons.validate();
        console.log('validation', radioButtons.$refs.validation)
      }
    }
  }
</script>
```
</docs>
