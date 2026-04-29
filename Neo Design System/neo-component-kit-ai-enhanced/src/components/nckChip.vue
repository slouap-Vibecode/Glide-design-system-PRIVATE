<template>
  <div
    :class="{
      'nck-active': active,
      'nck-invalid': invalid,
      clickable: hasClickListener,
      disabled,
      clearable,
    }"
    class="nck-style nck-internal nck-chip"
  >
    <component
      :is="hasClickListener ? 'button' : 'div'"
      :type="hasClickListener ? 'button' : null"
      @[clickChipEvent]="emitChipClick"
      :disabled="disabled"
      ref="chipContainer"
      :aria-invalid="invalid"
      :aria-pressed="ariaPressedValue"
      class="outside-focus button-label text-s-semibold"
      v-bind="chipAdditionalAttributes"
    >
      <span v-if="leftIconName" class="chip-icon">
        <nck-icon
          :iconName="leftIconName"
          :iconSize="IconSize.XS"
          iconAltText=""
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
        />
      </span>
      <span>{{ label }}</span>
      <nck-counter-badge
        v-if="isValidTrailingCounterValue && trailingCounterValue !== undefined"
        :entry="trailingCounterValue"
        class="counter-badge"
      />
      <span v-if="rightIconName && !clearable" class="chip-icon">
        <nck-icon
          :iconName="rightIconName"
          :iconSize="IconSize.XS"
          iconAltText=""
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
        />
      </span>
    </component>
    <button
      v-if="clearable"
      type="button"
      @click="emitChipClear"
      :disabled="disabled"
      class="chip-icon outside-focus close-icon"
    >
      <nck-icon
        iconName="close"
        :iconSize="IconSize.XS"
        :iconAltText="clearIconAltText ?? ''"
        :primaryColor="iconColor"
        :secondaryColor="iconColor"
      />
    </button>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/radiusVariables.less";

.nck-style.nck-chip {
  display: inline-flex;
  color: var(--nck-text-default);
  background: var(--nck-surface-primary);
  border-radius: var(--nck-radius-pill);
  border: var(--nck-border-width-s) solid var(--nck-border-neutral);
  transition: all var(--nck-duration-400) var(--nck-easing-out);

  button,
  .button-label {
    display: flex;
    border: 0;
    background: transparent;
    align-items: center;

    & > * + * {
      margin-left: var(--nck-spacing-s);
    }

    &.close-icon {
      padding: var(--nck-spacing-s) var(--nck-spacing-s) var(--nck-spacing-s) var(--nck-spacing-2xs);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }

  .button-label {
    padding: var(--nck-spacing-s) var(--nck-spacing-l);
    border-radius: var(--nck-radius-pill);

    .counter-badge {
      flex-shrink: 0;
    }
  }

  &.clearable {
    .button-label {
      padding-right: var(--nck-spacing-2xs);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .close-icon:enabled {
    position: relative;
    &:hover {
      &:before {
        position: absolute;
        content: "";
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        right: 0.25rem;
        top: 50%;
        transform: translateY(-50%);
        background: fade(@blue-grey-300, 30%);
      }
    }
  }

  &.nck-active {
    position: relative;
    color: var(--nck-text-brand);
    background: var(--nck-surface-info-subtle);
    border-color: var(--nck-surface-info-subtle);
    .close-icon:enabled {
      &:hover {
        &:before {
          background: fade(@bright-blue-200, 30%);
        }
      }
    }
  }
  &.nck-invalid {
    border-color: var(--nck-border-negative);

    &:hover {
      border-color: var(--nck-border-negative-hover);
    }
    .outside-focus[aria-invalid]:focus {
      box-shadow: var(--box-shadow-invalid);
    }
  }

  &.disabled {
    background: var(--nck-surface-disabled);
    color: var(--nck-text-disabled);
    border-color: var(--nck-surface-disabled);
    cursor: default;
  }

  &.clickable:hover {
    &:not(.disabled):not(.nck-invalid) {
      border-color: var(--nck-border-neutral-hover);
      &.nck-active {
        background: tint(@bright-blue-200, 70%);
        color: var(--bright-blue-300);
        border-color: transparent;
      }
    }
  }

  .chip-icon {
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    background-color: transparent;
  }
}
</style>

<script setup lang="ts">
import { camelize, computed, onMounted, ref, toHandlerKey, watch } from "vue";
import { IconColors } from "../constants/iconColors";
import { IconSize } from "../constants/iconSize";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";

import NckCounterBadge from "./nckCounterBadge.vue";
import NckIcon from "./nckIcon.vue";

/**
 * @component
 * @displayName nck-chip
 * Chips component are compact elements that represent an input, attribute, or action.
 *
 * REQUIRED TRANSLATIONS: none.
 */

const props = defineProps({
  /**
   * Boolean that says if the chip is activated or not.
   */
  active: { type: Boolean },

  /**
   * Label of the chip. Note that even if it is hidden a label is needed for
   * screenreaders. So never ever put an empty string.
   */
  label: { required: true, type: String, validator: (value: string) => value !== "" },

  /**
   * Disable the chip.
   */
  disabled: { type: Boolean },

  /**
   * Name of an optional icon to display on the left.
   */
  leftIconName: { type: String },

  /**
   * Name of an optional icon to display on the right.
   */
  rightIconName: { type: String },

  /**
   * A counter badge value to be displayed on the right side of the chip. It has to be an integer >= 0.
   */
  trailingCounterValue: { type: Number },

  /**
   * Set the chip in invalid mode on style and markup
   */
  invalid: { type: Boolean },

  /**
   * Alternative text for the clearable icon.
   * An error will be thrown if the chip is clearable without clearIconAltText.
   */
  clearIconAltText: { type: String },

  /**
   * @ignore
   * internal prop to add attributes to the chip main node
   */
  chipAdditionalAttributes: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits<{
  /**
   * Emitted when a chip that is not disabled is clicked.
   */
  (e: "chip-clicked"): void;
  /**
   * Emitted when the clear button of a clearable chip that is not disabled is clicked.
   * Setting a listener will make the chip clearable,
   * if not present the close icon will neither be clickable nor focusable.
   */
  (e: "chip-cleared"): void;
}>();

const attributes = useReactiveAttrs();
const clearable = ref(false);
const hasClickListener = ref(false);

const CHIP_CLEARED_EVENT_NAME = "chip-cleared" as const;

const clickChipEvent = computed(() => {
  return hasClickListener.value ? "click" : null;
});

const iconColor = computed(() => {
  if (props.disabled) {
    return IconColors.BLUE_GREY_500;
  } else if (props.active) {
    return IconColors.BRIGHT_BLUE_300;
  } else {
    return IconColors.BLUE_GREY_600;
  }
});

const isValidTrailingCounterValue = computed((): boolean => {
  return (
    props.trailingCounterValue !== undefined &&
    Number.isInteger(props.trailingCounterValue) &&
    props.trailingCounterValue >= 0
  );
});

const ariaPressedValue = computed<string | null>(() => {
  if ("aria-pressed" in props.chipAdditionalAttributes) {
    return props.chipAdditionalAttributes["aria-pressed"] as string | null;
  }

  return hasClickListener.value ? (props.active && !props.disabled ? "true" : "false") : null;
});

onMounted(() => {
  if (clearable.value && !props.clearIconAltText?.length) {
    throw new Error("Error in NckChip: if you set 'clearable' option, you need" + " to provide 'clearIconAltText'.");
  }

  if (props.trailingCounterValue !== undefined && !isValidTrailingCounterValue.value) {
    throw new Error(
      `Error in NckChip: trailing-counter-value should be an integer >= 0 (${props.trailingCounterValue} is invalid)`,
    );
  }
});

function emitChipClick() {
  if (!props.disabled) {
    emits("chip-clicked");
  }
}

function emitChipClear() {
  if (!props.disabled) {
    emits("chip-cleared");
  }
}

const chipContainer = ref<HTMLElement>();
function focus() {
  chipContainer.value?.focus();
}

defineExpose({
  focus,
});

watch(
  attributes,
  () => {
    const listenersKeys = Object.keys(attributes.value);
    // dynamic event bindings can be not camelized
    const hasChipClearedListeners =
      listenersKeys.includes(toHandlerKey(CHIP_CLEARED_EVENT_NAME)) ||
      listenersKeys.includes(toHandlerKey(camelize(CHIP_CLEARED_EVENT_NAME)));

    clearable.value = hasChipClearedListeners;
    hasClickListener.value = !!attributes.value.onChipClicked;
  },
  { immediate: true, deep: true },
);
</script>

<docs>
A simple chip.
```jsx
<div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center">
  <nck-chip label="Default chip" />
  <nck-chip label="Active chip" :active="true" />
  <nck-chip label="Disabled chip" :disabled="true" />
</div>
```

A chip can be active.
```jsx
<nck-chip label="Active chip" active/>
```

A chip can be disabled.
```jsx
<nck-chip label="Disabled chip" disabled/>
```

A chip can have a left icon.
```jsx
<nck-chip label="Fastest chip" leftIconName="fastest"/>
```

A chip can have a right icon.
```jsx
<nck-chip label="Chip with icon" rightIconName="close"/>
```

A chip can have both left and right icon.
```jsx
<nck-chip label="Chip with icons" rightIconName="close" leftIconName="fastest"/>
```

A chip can be clickable.
```jsx
function chipClicked() { alert('Thanks for clicking !'); }

<nck-chip label="Chip clickable" @chip-clicked="chipClicked()" leftIconName="dollar"/>
```

A chip can be clearable.
A clearable chip is composed by two buttons, one on the label and one on the cross.
The clearIconAltText prop is mandatory when you use the clearable prop.
```jsx
function chipClicked() { alert('Thanks for clicking !'); }
function chipCleared() { alert('Thanks for clearing !'); }

<nck-chip label="Chip clearable" clearIconAltText="clear" @chip-cleared="chipCleared()" @chip-clicked="chipClicked()" leftIconName="fastest"/>
```

A chip can be clearable and active.
```jsx
function chipClicked() { alert('Thanks for clicking !'); }
function chipCleared() { alert('Thanks for clearing !'); }

<nck-chip label="Chip clearable and active" active clearIconAltText="clear" @chip-cleared="chipCleared()" @chip-clicked="chipClicked()" leftIconName="dollar" rightIconName="fastest"/>
```

A chip with counter badge.
```jsx
const data = { counter: 0 };

<nck-chip label="Chip with counter" :active="data.counter > 0" clear-icon-alt-text="reset" left-icon-name="dollar" :trailing-counter-value="data.counter" @chip-cleared="data.counter = 0" @chip-clicked="data.counter++" />
```
</docs>
