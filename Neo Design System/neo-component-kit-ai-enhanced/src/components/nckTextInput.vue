<template>
  <span :class="attrs.class" v-bind="{ ...otherAttributes }">
    <NckInputContainer
      ref="textInputContainer"
      parentComponent="NckTextInput"
      :label="label"
      :required="required"
      :errorMessage="errors[0]"
      :helpMessage="helpMessage"
      :inputId="inputId"
      :helpMessageId="helpMessageId"
      :errorMessageId="errorMessageId"
      :highlight="isHighLighted"
      :isMiniLabel="isMiniLabel"
      :readonly="readonly"
      :disabled="disabled"
      :inputFocused="inputFocused"
      :highlightText="highlightText"
      :hightlightTextId="hightlightTextId"
      :labelStyleVariant="labelOutside ? 'outside' : 'floating'"
      @update:label-hover="(isHovering) => setInputHoverState(isHovering)"
    >
      <div
        class="input-background-and-inline-completion nck-input-field nck-style nck-internal font-color-ink-70"
        :class="{
          'right-spacing': hasRightContent,
          'left-spacing': hasInnerLeftContent,
          'font-color-ink-40': disabled,
          'background-color-blue-grey-100': !readonly && !inputFocused,
          'background-color-white': !readonly && inputFocused,
          'label-outside': labelOutside,
          'no-label': !label,
        }"
        :readonly="readonly"
        :disabled="disabled"
        aria-hidden="true"
      >
        <div class="inline-completion-prefix">{{ modelValue ? modelValue.replace(/\s/g, "&nbsp;") : "&nbsp;" }}</div>
        <div class="inline-completion-suffix background-color-bright-blue-100">
          {{
            inlineCompletion && modelValue ? inlineCompletion.substring(modelValue.length).replace(/\s/g, "&nbsp;") : ""
          }}
        </div>
      </div>
      <input
        :aria-required="required"
        :aria-describedby="helpMessageId + ' ' + hightlightTextId + ' ' + errorMessageId + ' ' + additionalDescribedBy"
        :name="name"
        class="outside-focus nck-input-field nck-text-input nck-style nck-internal font-color-ink-100"
        :class="{
          'right-spacing': hasRightContent,
          'left-spacing': hasInnerLeftContent,
          'font-color-ink-40': disabled,
          highlighted: isHighLighted,
          'label-outside': labelOutside,
          'no-label': !label,
          'with-leading-content': hasLeadingContent,
          readonly,
        }"
        :title="title"
        type="text"
        :value="modelValue"
        @input="updateValue"
        :id="inputId"
        :readonly="readonly"
        :disabled="disabled"
        :aria-invalid="errors.length > 0"
        v-bind="{ ...inputAttributes }"
        :inputmode="inputMode"
        :autocomplete="autocompleteType"
        :placeholder="placeholder"
        v-on="handlers"
        @focus="onInputFocused"
        @blur="onInputBlurred"
        @beforeinput="onBeforeInput"
        @keydown.down="downKeyPressed"
        @keydown.up="upKeyPressed"
        @keydown.esc="escapeKeyPressed"
        @keydown.enter="enterKeyPressed"
        @mouseover="setInputHoverState(true)"
        @mouseleave="setInputHoverState(false)"
        ref="textInputControl"
      />

      <template v-if="leadingIcon" #leading-icon>
        <NckIcon :iconName="leadingIcon" :iconSize="IconSize.S" iconAltText="" :primaryColor="leadingIconColor" />
      </template>

      <template v-if="hasLeadingContent" #leading-content>
        <!-- @slot For custom leading content if it's not an icon -->
        <slot name="leading-content" />
      </template>

      <template #trailing-content>
        <button
          v-if="clearable"
          class="nck-style nck-internal clear-input-button outside-focus"
          type="button"
          @click="clearValue"
          :disabled="disabled || readonly"
        >
          <NckIcon
            iconName="close-dark"
            :iconSize="IconSize.S"
            :iconAltText="clearButtonAltText ?? ''"
            :primaryColor="trailingIconColor"
          />
        </button>
      </template>
    </NckInputContainer>
  </span>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/animationsVariables.less";

.nck-style.nck-input-field.input-background-and-inline-completion {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;

  .inline-completion-prefix {
    visibility: hidden;
    white-space: nowrap;
  }

  .inline-completion-suffix {
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.nck-style.nck-text-input {
  position: relative;
  background-color: transparent;

  &.highlighted {
    background-color: @yellow-50;
  }

  &.with-leading-content:not(.readonly) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.readonly:not(.left-spacing) {
    padding-left: 0;
  }
}

.nck-style.clear-input-button {
  border: none;
  background: none;
  position: relative;
  padding: 0;
  line-height: 0; // to force the icon inside to display to the correct size

  &:not(:disabled):after {
    @clickable-padding: 0.625rem;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    box-sizing: content-box;
    top: -@clickable-padding;
    left: -@clickable-padding;
    padding: @clickable-padding;
    cursor: pointer;
  }

  .nck-style.external-label &:not(:disabled) {
    &::after {
      @clickable-padding: 0.4375rem;
      top: -@clickable-padding;
      left: -@clickable-padding;
      padding: @clickable-padding;
    }
  }
}

.nck-input-field::placeholder {
  color: var(--nck-text-secondary);
}
.nck-input-field.font-color-ink-40::placeholder {
  color: var(--nck-text-disabled);
}
</style>

<script setup lang="ts">
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import NckInputContainer from "./internal/nckInputContainer.vue";
import NckIcon from "./nckIcon.vue";
import { IconSize } from "../constants/iconSize";
import { IconColors } from "@/constants/iconColors";
import {
  INckTextInput,
  INckTextInputForNckAutocompleteClass,
  INckTextInputForNckPhoneNumberInputClass,
} from "./interfaces/iNckTextInput";
import { ValidationMode } from "@/constants/validation/validationMode";
import { computed, onMounted, ref, useAttrs, watch, toRef, toRefs, onBeforeMount, useSlots } from "vue";
import { IFormFieldWithValidationAndCustomRulesProps } from "./interfaces/internal/iFormFieldWithValidationAndCustomRulesProps";
import { INameFormFieldProps } from "./interfaces/internal/iNameFormFieldProps";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";

/**
 * @component
 * @displayName nck-text-input
 * An input field for short text value.
 *
 * This component implements the `INckTextInput` interface.
 *
 * PREREQUISITES:
 *
 * This component implements the interface "IFormFieldWithValidation".
 * You can import this interface and use it to cast for using validation related
 * function.
 *
 * - [Required translations](#translations):
 *  - requiredField
 * - [Icons URL](#icons)
 */

interface Props extends INameFormFieldProps, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * Alternative display with label outside of input container
   */
  labelOutside?: boolean;

  /**
   * Add an action to clear the input field.
   * You need to provide a value for 'clearButtonAltText' prop if you use this field
   */
  clearable?: boolean;

  /**
   * Highlight the background of the field and label using a light yellow while value is default value.
   */
  highlight?: boolean;

  /**
   * Text to display when the field is highlighted.
   */
  highlightText?: string;

  /**
   * The alternative text for the clearable action
   */
  clearButtonAltText?: string;

  /**
   * The name of the icon to display on the left (icons comes Neo Icon Kit).
   */
  leadingIcon?: string;

  /**
   * Label of the field.
   */
  label?: string;

  /**
   * Title of the field, needed if no label is provided. Please note that this is not the recommended usage accessibility wise.
   */
  title?: string;

  /**
   * Placeholder of the field, mandatory if no label, optional if label outside.
   */
  placeholder?: string;

  /**
   * Type of data that will be entered in the field, it helps opening the dedicated keyboard on mobile devices.
   * possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   */
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

  /**
   * Allows to precise the "autocomplete" value for the field. Eg.: autocompleteType="email". Possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autocompleteType?: string;

  /**
   * Regex to validate the input value. If the key pressed does not match the regex, the input is not updated.
   */
  allowedValue?: RegExp;

  /**
   * @ignore
   * completion string provided by the Autocomplete component only. Not for public use.
   */
  inlineCompletion?: string;

  /**
   * @ignore
   * Internal use only; modifies when the field gets validated
   */
  validationMode?: ValidationMode;

  /**
   * @ignore
   * Additional content ids describing the input which are external to the text input component.
   * For now let's keep it private as it requires testing but this would be nice to open it.
   */
  additionalDescribedBy?: string;

  /**
   * Value of the field. This component supports "v-model" pattern.
   */
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  additionalDescribedBy: "",
  inputMode: "text",
  labelOutside: false,
  name: () => AccessibilityHelper.generateId(),
});

const emit = defineEmits<{
  /**
   * Emitted when the value is modified.
   * This component supports "v-model" pattern.
   */
  (event: "update:modelValue", value: string): void;
  /**
   * Emitted when input is focused and the down key is pressed
   */
  (event: "down-key-pressed", value?: KeyboardEvent): void;
  /**
   * Emitted when input is focused and the up key is pressed
   */
  (event: "up-key-pressed", value?: KeyboardEvent): void;
  /**
   * Emitted when input is focused and the escape key is pressed
   */
  (event: "escape-key-pressed", value?: KeyboardEvent): void;
  /**
   * Emitted when input is focused and the enter key is pressed
   */
  (event: "enter-key-pressed", value?: KeyboardEvent): void;
  /**
   * Emitted when input is cleared using the clearable option
   */
  (event: "input-cleared"): void;
  /**
   * Emitted when input is focused
   */
  (event: "input-focused", value: Event): void;
  /**
   * Emitted when input is blurred
   */
  (event: "input-blurred", value: Event): void;
}>();

const textInputContainer = ref<InstanceType<typeof NckInputContainer> | null>(null);
const textInputControl = ref<HTMLInputElement | null>(null);
const inputId = AccessibilityHelper.generateId();
const helpMessageId = AccessibilityHelper.generateId();
const hightlightTextId = AccessibilityHelper.generateId();
const errorMessageId = AccessibilityHelper.generateId();

const inputFocused = ref<boolean>(false);
const inputHovered = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const valueChanged = ref<boolean>(false);

const inputAttributePrefix = "input-attribute-";
const attrs = useAttrs();
const slots = useSlots();

const { isValid, hasBeenValidated, validate, isValidationEnabled, errors, handlers } =
  useCompositionFormFieldWithValidation(
    toRefs(props),
    focus,
    toRef(props, "rules", []),
    toRef(props, "validationMode"),
  );

const hasLeadingContent = computed<boolean>(() => {
  return Boolean(slots?.["leading-content"] && !props.leadingIcon);
});

const hasInnerLeftContent = computed(() => {
  return !!props.leadingIcon && !props.labelOutside;
});

const hasRightContent = computed(() => {
  return props.clearable;
});

const isMiniLabel = computed(() => {
  if (props.labelOutside) {
    return false;
  }

  return props.modelValue !== "" || (inputFocused.value && !props.readonly);
});

const isHighLighted = computed(() => {
  return props.highlight && props.modelValue !== "" && !valueChanged.value && !props.disabled && !props.readonly;
});

const leadingIconColor = computed<IconColors>(() => {
  if (props.disabled) {
    return IconColors.BLUE_GREY_400;
  } else if (hasErrors.value) {
    if (inputHovered.value) {
      return IconColors.RED_400;
    } else {
      return IconColors.RED_300;
    }
  } else if ((inputFocused.value || inputHovered.value) && !props.readonly) {
    return IconColors.BRIGHT_BLUE_300;
  } else {
    return IconColors.BLUE_GREY_500;
  }
});

const trailingIconColor = computed<IconColors>(() => {
  return props.disabled ? IconColors.BLUE_GREY_400 : IconColors.BLUE_GREY_500;
});

const inputAttributes = computed(() => {
  const inputAttributes: Record<string, string> = {};
  Object.keys(attrs)
    .filter((key) => key.includes(inputAttributePrefix))
    .forEach((key) => {
      inputAttributes[key.substring(inputAttributePrefix.length)] = attrs[key] as string;
    });
  return inputAttributes;
});

const otherAttributes = computed(() => {
  const inputAttributes: Record<string, string> = {};
  Object.keys(attrs)
    .filter((key) => !key.includes(inputAttributePrefix))
    .forEach((key) => {
      inputAttributes[key] = attrs[key] as string;
    });
  return inputAttributes;
});

const hasErrors = computed(() => {
  // the getter is getting called too soon, so using this hack allow it to wait for ref to be available
  if (isMounted.value) {
    return errors.value.length > 0;
  }
  return false;
});

function focus() {
  textInputControl.value?.focus();
}

function setInputHoverState(isHover: boolean) {
  inputHovered.value = isHover;
}

function onValueChanged() {
  if (!valueChanged.value) {
    valueChanged.value = true;
  }
}

function clearValue() {
  emit("update:modelValue", "");
  emit("input-cleared");
  focus();
}

function downKeyPressed($event?: KeyboardEvent) {
  emit("down-key-pressed", $event);
}

function upKeyPressed($event?: KeyboardEvent) {
  emit("up-key-pressed", $event);
}

function escapeKeyPressed($event?: KeyboardEvent) {
  emit("escape-key-pressed", $event);
}

function enterKeyPressed($event?: KeyboardEvent) {
  emit("enter-key-pressed", $event);
}

function onInputFocused($event: Event) {
  inputFocused.value = true;
  emit("input-focused", $event);
}

function onBeforeInput($event: Event) {
  /**
   * Emitted when input is about to be changed
   */
  // event.data is null when a key that is not a character is pressed (enter, suppr etc)
  if (
    props.allowedValue &&
    $event instanceof InputEvent &&
    $event.data &&
    !props.allowedValue.test(`${props.modelValue}${$event.data}`)
  ) {
    $event.preventDefault();
  }
}

function onInputBlurred($event: Event) {
  inputFocused.value = false;
  emit("input-blurred", $event);
}

function updateValue($event: Event) {
  const eventTarget = $event.target;
  if (eventTarget instanceof HTMLInputElement) {
    emit("update:modelValue", eventTarget.value);
  }
}

defineExpose<INckTextInput & INckTextInputForNckAutocompleteClass & INckTextInputForNckPhoneNumberInputClass>({
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
  /**
   * Returns whether or not the field was validated
   * @returns validated status
   */
  hasBeenValidated,
  /**
   * WARNING: do not use, internal use by NckPhoneNumberInput
   */
  // @ts-expect-error vue compiler will unwrap textInputContainer
  textInputContainer,
  /**
   * WARNING: do not use, internal use by NckAutocomplete
   */
  // @ts-expect-error vue compiler will unwrap textInputContainer
  textInputControl,
});

onBeforeMount(() => {
  if (props.clearable && (!props.clearButtonAltText || props.clearButtonAltText.length === 0)) {
    throw new Error(
      "Error in NckTextInput: if you set 'clearable' option, you need" + " to provide 'clearButtonAltText'.",
    );
  }

  if (props.highlight && (!props.highlightText || props.highlightText.length === 0)) {
    throw new Error("Error in NckTextInput: if you set 'highlight' option, you need" + " to provide 'highlightText'.");
  }

  if (props.highlightText && props.highlightText.length >= 0 && !props.highlight) {
    throw new Error("Error in NckTextInput: if you set 'highlightText' option, you need" + " to provide 'highlight'.");
  }

  checkLabelProps();
});

function checkLabelProps() {
  if (!props.label && !props.title) {
    throw new Error("Error in NckTextInput: if you don't provide a label, you need" + " to provide a title.");
  }

  if (!props.label && !props.placeholder) {
    throw new Error("Error in NckTextInput: if you don't provide a label, you need" + " to provide a placeholder.");
  }

  if (props.labelOutside && !props.label) {
    throw new Error("Error in NckTextInput: if you set 'labelOutside' option, you need" + " to provide a label.");
  }

  if (props.placeholder && props.label && !props.labelOutside) {
    throw new Error(
      "Error in NckTextInput: if you provide a placeholder with label, you need" +
        " to either set 'labelOutside' option or remove the placeholder.",
    );
  }
}

onMounted(() => {
  isMounted.value = true;
});

watch(() => props.modelValue, onValueChanged);

defineOptions({
  inheritAttrs: false,
});
</script>

<docs>
Text input are intended to retrieve a short text user input.
Here is the input in its simplest form
```jsx
const value = "";

<nck-text-input label="A simple input" v-model="value" />
```

You can add a hint to help user fill its input.
And you can also prefill the input by setting a value.
```jsx
const value = "prefilled";

<nck-text-input label="A prefilled input with a hint" v-model="value" helpMessage="This is the hint" />
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

<nck-text-input label="A field with validation" helpMessage="Type more than 2 characters, or numbers to trigger an error"
  v-model="value" name="validation" :rules="validationRules" />
```

To make the input field read only, just use the 'readonly' property
````jsx
const value = "I'm readonly you cannot modify me";

<nck-text-input label="readonly input" v-model="value" readonly/>
````

You can make your field required. it will provide a special display and handle the validation for you
on the required aspect.
```jsx
const value = "I am required";

<nck-text-input label="required field" v-model="value" required />
```

You can set the "autocomplete" value for the field.
```jsx
const autocompleteType = "email";
const value = "I am required";

<nck-text-input label="required field" v-model="value" autocompleteType="autocompleteType" required/>
```

You can specify the type of data that will be entered in the field, it helps opening the dedicated keyboard on mobile devices.
```jsx
const inputMode = "text";
const value = "I am required";

<nck-text-input label="required field" v-model="value" inputMode="inputMode" required/>
```

You can check if the field is valid, or trigger the validation by using methods exposed
by the component. Note that if you modify the input programmatically, then you need to trigger validation
by yourself if you want the field to be validated again
```vue
<template>
  <div>
    <nck-text-input label="input label" ref="input" :rules="validationsRules"
      v-model="value" />

    <div>
      <button @click="displayValidity">Display input validity</button>
      <button @click="validateInput">Validate input</button>
      <button @click="value += '1'">modify input value</button>
    </div>
  </div>
</template>
<script>
import { ValidationRule } from "@/models/validationRule";

  export default {
    data() {
      return {
        value: "",
        validationsRules: [
          new ValidationRule((value) => /^[a-zA-Z]+$/.test(value), "This field should contain only letters"),
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

You can add a "clear" action to you input, by setting the 'clearable' flag.
You need to provide an alternative text by using the 'clearbleWording' prop.
```jsx
const value = "click on the cross to clear me";

<nck-text-input label="clearble field" v-model="value" clearable clearButtonAltText="Clear field" />
```

You can add a leading icon to your text input
```jsx
const value = "";

<nck-text-input leading-icon="plane" label="field with icon" v-model="value" />
```

You can allow only some characters to be entered in your input,
by setting a regexp pattern in the 'allowedValue' prop.
```jsx
const value = "";

<nck-text-input :allowedValue="/^-?[0-9]{0,9}([,\.][0-9]{0,20})?$/" label="only numbers here" v-model="value" />
```

You can highlight the background of the field (and label) while it displays
the default value. Value must not be null or empty.
The background color will reset as soon as the user changed the
value.
Readonly and disabled field will always have default background.
HighLight text will be displayed under the help message.
```jsx
const value = "important";

<nck-text-input label="input label" v-model="value" highlight highlightText="highlightText" />
```

```jsx
const value = "important";

<nck-text-input v-model="value" label="input label" :labelOutside="true" leading-icon="plane" clearable clearButtonAltText="clear field" />
```
```jsx
const value = "";

<nck-text-input v-model="value" title="search" helpMessage="this input does not have any label" />
```
```jsx
const value = "";

<nck-text-input v-model="value" title="search" placeholder="this input has a placeholder" />
```
</docs>
