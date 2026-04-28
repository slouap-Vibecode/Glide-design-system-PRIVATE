<template>
  <div
    class="nck-internal nck-style nck-switch"
    :class="{ disabled, 'first-line-aligned': firstLineAligned, 'hide-label': hideLabel }"
  >
    <label :for="internalId" class="font-color-ink-100 text-l">
      <span
        v-if="labelPosition === SwitchLabelPosition.LEFT"
        class="switch-label"
        :class="{ 'screenreader-only': hideLabel }"
      >
        {{ label }}
      </span>
      <input
        ref="input"
        v-model="internalValue"
        type="checkbox"
        role="switch"
        :id="internalId"
        :disabled="disabled"
        class="screenreader-only"
      />
      <span
        class="switch-display"
        :class="{
          'switch-display-right': labelPosition === SwitchLabelPosition.RIGHT,
          'switch-display-left': labelPosition === SwitchLabelPosition.LEFT,
        }"
      ></span>
      <span
        v-if="labelPosition === SwitchLabelPosition.RIGHT"
        class="switch-label"
        :class="{ 'screenreader-only': hideLabel }"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/typography.less";
@import (reference) "../styles/focusMixins.less";

@thumb-color: @white;

@track-color: @blue-grey-400;
@track-color-hover: @blue-grey-500;
@track-color-disabled: @blue-grey-300;

@track-color-checked: @bright-blue-300;
@track-color-checked-hover: @bright-blue-400;
@track-color-checked-disabled: @bright-blue-200;

@track-padding: 0.125rem;

// Mixins
.responsiveTrackAndThumb(@thumb-size: 1.75rem; @track-size: 3.25rem) {
  .switch-display {
    width: @track-size;
    height: @thumb-size;

    &::before {
      width: @thumb-size;
      height: @thumb-size;
    }
  }

  input:checked {
    & ~ .switch-display {
      // Thumb
      &::before {
        transform: translateX(@track-size) translateX(-100%);
      }
    }
  }
}

.nck-internal.nck-style.nck-switch {
  position: relative;
  display: inline-block;
  max-width: 100%;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .switch-display {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      border: none;
      box-sizing: content-box;
      background: var(--nck-icon-disabled);
      border-radius: var(--nck-radius-pill);
      padding: @track-padding;
      transition: background-color var(--nck-duration-400) var(--nck-easing-out);

      // Thumb
      &::before {
        content: "";
        border-radius: 50%;
        background: var(--nck-surface-primary);
        transform: translateX(0%);
        transition: transform var(--nck-duration-400) var(--nck-easing-out);
      }

      &.switch-display-right {
        margin-right: var(--nck-spacing-s);
      }
      &.switch-display-left {
        margin-left: var(--nck-spacing-s);
      }
    }

    input {
      &:checked {
        & ~ .switch-display {
          background: var(--nck-surface-info-solid);
        }
      }

      &:disabled {
        & ~ .switch-display {
          background: var(--nck-surface-disabled);
        }

        &:checked {
          & ~ .switch-display {
            background: @track-color-checked-disabled;
          }
        }
      }

      &:not(:disabled):hover {
        & ~ .switch-display {
          background: var(--nck-icon-neutral-subtle);
        }

        &:checked {
          & ~ .switch-display {
            background: var(--nck-surface-info-solid-hover);
          }
        }
      }

      &:focus {
        & ~ .switch-display {
          .outside-focus-mixin();
        }
      }
    }

    .responsiveTrackAndThumb();

    @media @desktop {
      .text-m();
      .responsiveTrackAndThumb(@thumb-size: 1rem; @track-size: 2rem);
    }
  }

  &.disabled {
    label {
      cursor: not-allowed;
      color: var(--nck-text-disabled);
    }
  }

  &.first-line-aligned:not(.hide-label) {
    label {
      align-items: flex-start;

      @media @tablet, @phone {
        .switch-label {
          position: relative;
          top: 0.25rem;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import { useCheckboxCore } from "@/composables/useCheckboxCore";
import { SwitchLabelPosition } from "../constants/switchLabelPosition";

/**
 * @component
 * @displayName nck-switch
 * A switch component to allow user to toggle a value.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = withDefaults(
  defineProps<{
    /**
     * Value of the switch. This component supports "v-model" pattern.
     */
    modelValue: boolean;

    /**
     * Label of the switch. Note that even if it is hidden a label is needed for
     * screenreaders. So never ever put an empty string.
     */
    label: string;

    /**
     * Do not display the label (but it'll still be conveyed to screenreader users).
     */
    hideLabel?: boolean;

    /**
     * Disabled state.
     */
    disabled?: boolean;

    /**
     * Align the switch with the first line of label in case of overflow
     */
    firstLineAligned?: boolean;

    /**
     * Position of the label compared to the switch button.
     *
     * Accepts one of the [SwitchLabelPosition](#switchlabelposition) value.
     */
    labelPosition: SwitchLabelPosition;
  }>(),
  {
    labelPosition: SwitchLabelPosition.RIGHT,
  },
);

const emits = defineEmits<{
  (e: "update:modelValue", newValue: boolean): void;
}>();

const input = ref<HTMLInputElement | null>(null);
const { internalId, internalValue, focus } = useCheckboxCore(toRef(props, "modelValue"), input);

defineExpose({
  /**
   * @public
   * Focus the checkbox.
   */
  focus,
});

function updateValue() {
  /**
   * Emitted when value is changed.
   * This component supports "v-model" pattern.
   *
   * @param {boolean} value the value of the switch
   */
  emits("update:modelValue", internalValue.value);
}

watch(internalValue, updateValue);
</script>

<docs>
A simple switch.

```jsx
const value = false;

<nck-switch v-model="value" label="Come on, turn me on" />
```

Disabled switches.

```jsx
const valueFalse = false;
const valueTrue = true;
<div>
  <nck-switch v-model="valueFalse" label="I don't get turned on easily" disabled/>
  <nck-switch v-model="valueTrue" label="I'm always turned on" disabled/>
</div>
```

You can hide the label or pre-select it by default. Note that even if the label is hidden, it is still needed for screenreaders. So never ever put an empty string.

```jsx
const value = true;

<nck-switch v-model="value" label="A switch with hidden label" hide-label/>
```

A switch with wrapped label

```jsx
const value = false;

<div style="width: 10rem;">
  <nck-switch v-model="value" label="Very long label, needs to wrap"/>
</div>
```

A switch with wrapped label but first-line-aligned

```jsx
const value = false;

<div style="width: 10rem;">
  <nck-switch v-model="value" label="Very long label, needs to wrap" first-line-aligned/>
</div>
```

You can also position the label on the left on the switch button.

```jsx
const value = false;

<nck-switch v-model="value" label="label on the left" :labelPosition="SwitchLabelPosition.LEFT" />
```
</docs>
