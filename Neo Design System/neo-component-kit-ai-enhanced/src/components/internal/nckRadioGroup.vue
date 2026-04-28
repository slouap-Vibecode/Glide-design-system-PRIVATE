<template>
  <div
    role="radiogroup"
    class="nck-style nck-internal nck-radio-group"
    :class="radioGroupClasses"
    :aria-labelledby="labelId"
    :aria-required="required"
  >
    <div class="radio-container" v-for="(radioOption, index) in options" :key="radioOption.value">
      <input
        type="radio"
        class="screenreader-only"
        ref="radioInput"
        :name="name"
        :value="radioOption.value"
        :id="getRadioId(index)"
        :checked="modelValue === radioOption.value"
        @click="selectValue(radioOption.value)"
        :disabled="radioOption.disabled"
        :aria-invalid="!valid || undefined"
        :aria-describedby="describeByIds"
      />
      <label
        class="font-color-ink-100 text-m"
        :class="display === 'radio' ? 'radio-display' : 'chip-display'"
        :for="getRadioId(index)"
      >
        <span v-if="display === 'radio'">
          {{ radioOption.text }}
        </span>
        <NckChip
          v-else-if="display === 'chip'"
          :label="radioOption.text"
          :disabled="radioOption.disabled"
          :active="modelValue === radioOption.value"
          :leftIconName="modelValue === radioOption.value ? 'check' : ''"
          :invalid="!valid"
        />
      </label>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../../styles/breakpointsVariables.less";
@import (reference) "../../styles/colorsVariables.less";
@import (reference) "../../styles/focusMixins.less";

.nck-style.nck-internal.nck-radio-group {
  display: flex;
  flex-wrap: wrap;

  &.vertical {
    flex-direction: column;
    &.chip .radio-container {
      margin-bottom: var(--nck-spacing-s);
    }
  }

  &.horizontal {
    flex-direction: row;
    &.chip .radio-container {
      margin-right: var(--nck-spacing-s);
    }
  }

  .radio-container {
    display: flex;
    position: relative;
  }

  label {
    &.radio-display {
      padding: var(--nck-spacing-2xs) var(--nck-spacing-xl) var(--nck-spacing-2xs) 0;
      @media @phone, @tablet {
        margin-top: var(--nck-spacing-2xs);
      }
    }
    &.chip-display {
      padding: var(--nck-spacing-2xs) var(--nck-spacing-s) var(--nck-spacing-2xs) 0;
    }

    margin: 0;
    display: flex;
    align-items: center;
    text-align: left;
  }

  input[type="radio"] {
    &:focus {
      outline-offset: 0;
    }

    & + label.radio-display:before {
      content: "";
      display: inline-block;
      flex: 0 0 auto;
      width: 1rem;
      height: 1rem;
      margin-right: var(--nck-spacing-s);
      vertical-align: middle;
      border-radius: 100%;
      background: var(--nck-surface-primary);
      box-sizing: border-box;

      @media @phone, @tablet {
        width: 1.25rem;
        height: 1.25rem;
      }

      border: var(--nck-border-width-s) solid var(--nck-border-neutral-hover);

      transition:
        border var(--nck-duration-400) var(--nck-easing-out),
        box-shadow var(--nck-duration-400) var(--nck-easing-out);
    }

    &:not(:disabled):not(:checked):not(:focus):hover + label {
      cursor: pointer;
    }

    &:not(:disabled):not(:checked):not(:focus):not([aria-invalid]):hover + label {
      &:before {
        border-color: var(--nck-border-active-hover);
      }
    }

    &:not([aria-invalid]):focus + label:before {
      border-color: var(--nck-border-active);
      .outside-focus-mixin();
    }

    &:not([aria-invalid]):focus + label {
      .nck-chip {
        border-color: var(--nck-border-active);
        box-shadow: var(--box-shadow-focus);
      }
    }

    &[aria-invalid]:focus + label {
      .nck-invalid {
        border-color: var(--nck-border-negative);
        box-shadow: var(--box-shadow-invalid);
      }
    }

    &:checked + label:before {
      border: 0.3125rem solid var(--nck-border-active);
      @media @phone, @tablet {
        border-width: 0.375rem;
      }
    }

    &:checked:hover + label:before {
      border: 0.3125rem solid var(--nck-border-active-hover);
      @media @phone, @tablet {
        border-width: 0.375rem;
      }
    }

    &:checked:disabled + label:before {
      border: 0.3125rem solid var(--nck-icon-disabled);
      @media @phone, @tablet {
        border-width: 0.375rem;
      }
    }

    &:disabled + label {
      color: var(--nck-text-disabled);

      &:before {
        border-color: var(--nck-icon-disabled);
      }
    }

    &[aria-invalid] + label:before {
      border-color: var(--nck-border-negative);
    }

    &[aria-invalid]:not(:disabled):not(:checked):not(:focus):hover + label:before {
      border-color: var(--nck-border-negative-hover);
    }

    &[aria-invalid]:focus + label:before {
      border-color: var(--nck-border-negative);
      box-shadow: 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-negative);
    }
  }

  &.first-line-aligned {
    label.radio-display {
      align-items: flex-start;

      @media @desktop {
        &:before {
          position: relative;
          top: 0.125rem;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import NckChip from "../nckChip.vue";
import { IRadioButtonOption } from "../../models/iRadioButtonOption";
import { AccessibilityHelper } from "../../helpers/accessibilityHelper";
import { GroupDirection } from "@/constants/groupDirection";
import { RadioButtonsDisplay } from "@/constants/radioButtonsDisplay";
import { computed, onMounted, PropType, ref, watch } from "vue";

/**
 * A group of radio buttons to get user input on one choice among many.
 * Internal component which does not include the group label, nor validation.
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
   * Name of the form control.
   */
  name: { type: String },

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
   * Error message id in case the radio button group is invalid.
   * Allows to link the message with the fields, for better accessibility.
   */
  errorMessageId: { type: String },

  /**
   * Help message id in case there is display info to help user to select a radio button.
   * Allows to link the message with the fields, for better accessibility.
   */
  helpMessageId: { type: String as PropType<string | null> },

  /**
   * Value of the radio groups.
   * This component supports "v-model" pattern.
   */
  modelValue: {
    required: true,
    type: String,
  },

  valid: { required: true, type: Boolean },

  /**
   * Whether the field is required or not.
   *
   * It provides style, accessibility and field validation.
   */
  required: {
    type: Boolean,
  },

  /**
   * Id of the label for the group
   */
  labelId: { required: true, type: String },

  /**
   * Align the radio buttons with the first line of label in case of overflow.
   */
  firstLineAligned: {
    type: Boolean,
  },
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes.
   * This component supports v-model pattern.
   */
  (event: "update:modelValue", value: string): void;
}>();

const radioIds = ref<string[]>([]);
const radioInput = ref<HTMLInputElement>();

function focus() {
  let selectedIndex = props.options.findIndex((option) => option.value === props.modelValue);
  const radioButtons = radioInput.value;
  if (Array.isArray(radioButtons)) {
    if (selectedIndex === -1) {
      for (let i = 0; i < props.options.length; i++) {
        if (!props.options[i].disabled) {
          selectedIndex = i;
        }
      }
    }
    if (selectedIndex > -1) {
      const radioButtonToFocus = radioButtons[selectedIndex];
      if (radioButtonToFocus instanceof HTMLElement) {
        radioButtonToFocus.focus();
      }
    }
  }
}

defineExpose({
  /**
   * @public
   * Focus the radio button, either the selected if any, or the first non-disabled one otherwise
   */
  focus,
});

const radioGroupClasses = computed(() => {
  const classes: string[] = [];

  if (props.direction === GroupDirection.VERTICAL && props.display !== RadioButtonsDisplay.CHIP) {
    classes.push("vertical");
  } else {
    classes.push("horizontal");
  }

  if (props.firstLineAligned) {
    classes.push("first-line-aligned");
  }

  return classes;
});

const describeByIds = computed(() => {
  const ids = [];

  if (!props.valid && props.errorMessageId) {
    ids.push(props.errorMessageId);
  }

  if (props.helpMessageId) {
    ids.push(props.helpMessageId);
  }

  return ids.join(" ");
});

onMounted(() => {
  props.options.forEach(() => {
    radioIds.value.push(AccessibilityHelper.generateId());
  });
});

function selectValue(newValue: string) {
  emit("update:modelValue", newValue);
}

function getRadioId(index: number) {
  return `radio_${radioIds.value[index]}`;
}

function updateIds() {
  props.options.forEach((element, idx) => {
    if (!radioIds.value[idx]) {
      const nextRadioIds = [...radioIds.value];
      nextRadioIds[idx] = AccessibilityHelper.generateId();
      radioIds.value = nextRadioIds;
    }
  });
}
watch(() => props.options, updateIds);
</script>
