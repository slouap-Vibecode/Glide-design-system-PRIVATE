<template>
  <div class="nck-style nck-internal nck-search-input">
    <NckTextInput
      ref="textInputRef"
      v-model="textInput"
      :additionalDescribedBy="props.additionalDescribedBy"
      :clearButtonAltText="props.clearButtonAltText"
      :inputMode="props.inputMode"
      :title="props.title"
      :placeholder="props.placeholder"
      :label="props.label"
      :disabled="props.disabled"
      :autocompleteType="props.autocompleteType"
      clearable
      class="search-input-item"
      :class="{ 'hidden-clearable': !Boolean(textInput) }"
      @input="emitInputEvent"
      @input-cleared="emitInputClearedEvent"
      @enter-key-pressed="emitEnterKeyEvent"
    />
    <NckButton
      :iconAltText="props.searchButtonAltText"
      leftIcon="search"
      :size="props.label ? ButtonSize.L : ButtonSize.M"
      :color="props.searchButtonColor"
      :type="props.searchButtonType"
      :disabled="props.disabled"
      :ariaRole="props.ariaRole"
      :loading="props.loading"
      :loadingText="props.loadingText"
      class="search-button visible-desktop search-input-item"
      @click="emitClickEvent"
    />
    <NckButton
      :iconAltText="props.searchButtonAltText"
      leftIcon="search"
      :size="props.label ? ButtonSize.M : ButtonSize.S"
      :color="props.searchButtonColor"
      :type="props.searchButtonType"
      :disabled="props.disabled"
      :ariaRole="props.ariaRole"
      :loading="props.loading"
      :loadingText="props.loadingText"
      class="search-button hidden-desktop search-input-item"
      @click="emitClickEvent"
    />
  </div>
</template>

<script setup lang="ts">
import NckButton from "@/components/nckButton.vue";
import NckTextInput from "@/components/nckTextInput.vue";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonSize } from "@/constants/buttonSize";
import { ButtonType } from "@/constants/buttonType";
import { onMounted, PropType, ref } from "vue";

/**
 * @component
 * @displayName nck-search-input
 * An input field grouping a text input and an action button.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 * - [Icons URL](#icons)
 */

const props = defineProps({
  /**
   * The alternative text for the clearable action, required.
   */
  clearButtonAltText: String,

  /**
   * The alternative text for the search action, required.
   */
  searchButtonAltText: String,

  /**
   * The color type of the search button.
   *
   * Accepts one of the [ButtonColor](#buttoncolor) value.
   */
  searchButtonColor: {
    type: String as PropType<ButtonColor>,
    validator: (val: ButtonColor) => Object.values(ButtonColor).includes(val),
    default: ButtonColor.LIGHT,
  },

  /**
   * Aspect of the search button.
   *
   * Accepts one of the [ButtonType](#buttontype) value.
   */
  searchButtonType: {
    type: String as PropType<ButtonType>,
    validator: (val: ButtonType) => Object.values(ButtonType).includes(val),
    default: ButtonType.FILLED,
  },

  /**
   * Disable the field.
   */
  disabled: Boolean,

  /**
   * Label of the field.
   */
  label: String,

  /**
   * Title of the field, required if label is missing.
   */
  title: String,

  /**
   * Placeholder of the field, required if label is missing.
   */
  placeholder: String,

  /**
   * Type of data that will be entered in the field, it helps opening the dedicated keyboard on mobile devices.
   * possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   */
  inputMode: String as PropType<"none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search">,

  /**
   * Allows to precise the "autocomplete" value for the field. Eg.: autocompleteType="email". Possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autocompleteType: String,

  /**
   * @ignore
   * Additional content ids describing the input which are external to the text input component.
   * For now let's keep it private as it requires testing but this would be nice to open it.
   */
  additionalDescribedBy: String,

  /**
   * Value of the field. This component supports "v-model" pattern.
   */
  modelValue: String,

  /**
   * The aria role of the button.
   *
   * @values "button", "link"
   * @default "button"
   */
  ariaRole: {
    type: String as PropType<"button" | "link">,
    validator: (val: string) => ["link", "button"].includes(val),
    default: "button",
  },

  /**
   * Set the button in loading mode: the loader is displayed and user cannot interact with button.
   *
   * WARNING: only the beginning of the loading will be announced by the screen reader. It is expected that
   * you, as the component user, handle correctly the announce of the end of the loading.
   */
  loading: Boolean,

  /**
   * Alternative text for the loader in the button when it is in loading mode.
   *
   * Mandatory if your button can be in loading mode.
   */
  loadingText: String,
});

const emit = defineEmits<{
  /**
   * Event emitted when the action button is clicked.
   *
   * @event click
   */
  (e: "click", value: string): void;
  /**
   * Event emitted when the input is focused and the enter key is pressed.
   *
   * @event click
   */
  (e: "enter-key-pressed", value: string): void;
  /**
   * Emitted when the value is modified.
   * This component supports "v-model" pattern.
   */
  (event: "update:modelValue", value: string): void;
  /**
   * Emitted when the value is cleared using the clearable icon from text-input.
   */
  (event: "input-cleared"): void;
}>();

const textInput = ref<string>(props.modelValue ?? "");
const textInputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (!props.searchButtonAltText) {
    throw new Error("Error in NckSearchInput: you need to provide a non-empty searchButtonAltText");
  }
  if (!props.label && !props.placeholder) {
    throw new Error("Error in NckSearchInput: you need to provide a placeholder when label is missing");
  }
});

function emitInputEvent(): void {
  emit("update:modelValue", textInput.value);
}

function emitClickEvent(): void {
  emit("click", textInput.value);
}

function emitEnterKeyEvent(): void {
  emit("enter-key-pressed", textInput.value);
}

function emitInputClearedEvent(): void {
  emit("input-cleared");
}
</script>

<style lang="less" scoped>
.nck-search-input {
  display: inline-flex;
}

.hidden-clearable /deep/ .trailing-content {
  visibility: hidden;
}

// allow element focus to go over its sibling (text-input vs button)
.search-input-item {
  z-index: 0;
}
.search-input-item:focus-within,
.search-input-item:hover {
  z-index: 1;
}

/deep/ .nck-style.nck-text-input.nck-input-field, /* external container */
/deep/ .nck-style.nck-input-field {
  /* inner input */
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.nck-style.nck-button {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.search-button {
  margin-left: calc(-1 * var(--nck-border-width-s));
}
</style>

<docs>

  Base version of the search input.

  ```js
  <nck-search-input title="title" placeholder="placeholder" clearButtonAltText="clear" searchButtonAltText="search" />
  ```

  Search input with a label - it is larger.

  ```js
  <nck-search-input label="label" clearButtonAltText="clear" searchButtonAltText="search" />
  ```

  Search input with custom button color & button type.

  ```js
  <nck-search-input title="title" placeholder="placeholder" :searchButtonColor="ButtonColor.PRIMARY" :search-button-type="ButtonType.FILLED" clearButtonAltText="clear" searchButtonAltText="search" />
  ```

  Disabled search input.

  ```js
  <nck-search-input title="title" placeholder="placeholder" disabled clearButtonAltText="clear" searchButtonAltText="search" />
  ```
</docs>
