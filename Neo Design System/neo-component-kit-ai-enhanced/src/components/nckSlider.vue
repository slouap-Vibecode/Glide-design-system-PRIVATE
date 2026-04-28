<template>
  <div class="nck-slider nck-style">
    <div class="nck-slider-header">
      <span
        :class="{
          'font-color-ink-100 text-m': initialValues && value === initialValues[index],
          'font-color-bright-blue-300 text-m-semibold': initialValues && value !== initialValues[index],
        }"
        v-for="(value, index) in iterableValue"
        :key="index"
      >
        <span>{{ formatter(value) }}</span>
      </span>
    </div>

    <div class="nck-slider-wrapper">
      <div class="nck-slider-inner" ref="sliderRoot" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, PropType } from "vue";
import noUiSlider, { API as INoUiSliderInstance } from "nouislider";
import "nouislider/dist/nouislider.min.css";

/**
 * @component
 * @displayName nck-slider
 * Sliders provide a visual indication of adjustable content between a minimum and maximum value.
 */

const props = defineProps({
  /**
   * ARIA attribute to set the slider's accessible name
   */
  accessibleLabelType: {
    type: String as PropType<"aria-label" | "aria-labelledby">,
    required: true,
    validator: (val: string) => val === "aria-label" || val === "aria-labelledby",
  },

  /**
   * Set the attribute value of the `aria-label` or the `aria-labelledby` attribute
   * (depending on your `accessibleLabelType` value).
   *
   */
  accessibleLabelValue: { required: true, type: String },

  /**
   * Display value as you want with a formatter function.
   *
   * The formatter takes one parameter that can be a string OR a number.
   * It also outputs string or number depending of your case.
   */
  formatter: { required: true, type: Function as PropType<(valueToFormat: string | number) => string | number> },

  /**
   *
   * Value of the slider. This component supports "v-model" pattern.
   */
  modelValue: { default: 0, type: Number },

  /**
   * To disable the slider.
   */
  disabled: { default: false, type: Boolean },

  /**
   * Step size of the slider when moved which is updatable.
   */
  step: { default: 1, type: Number },

  /**
   * Range of the slider which is updatable.
   */
  range: { required: true, type: Object as PropType<{ min: number; max: number }> },
});

const emits = defineEmits<{
  /**
   * Vue's vModel event
   */
  (e: "update:modelValue", value: number): void;
}>();

const slider = ref<INoUiSliderInstance | undefined>(undefined);

/**
 * copy of first value of v-model (see mounted hook)
 */
const initialValues = ref<number[]>([]);

/**
 * Template ref of root element, will be manipulated by noUiSlider
 */
const sliderRoot = ref<HTMLDivElement | null>(null);

const iterableValue = computed((): number[] => {
  return Array.isArray(props.modelValue) ? [...props.modelValue] : [props.modelValue];
});

function floatingNumberConversion(rawValue: string | number) {
  return Number.parseFloat(Number.parseFloat(rawValue.toString()).toFixed(2));
}

/**
 * noUiSlider Event params, {@link https://refreshless.com/nouislider/events-callbacks/#section-binding See docs}
 *
 * @param values  Current slider values (array)
 * @param handle Handle that caused the event (number)
 * @param unencoded Slider values without formatting (array)
 * @param tap Event was caused by the user tapping the slider (boolean)
 * @param positions Left offset of the handles (array)
 * @param noUiSlider slider public Api (noUiSlider)
 */
function onSliderUpdate(values: Array<number | string>) {
  // internally use numbers to detect if we are using the default value or not
  const parsedValues = values.map((v) => Number.parseFloat(v.toString()));
  emitInput(parsedValues[0]);
}

/**
 * noUiSlider instance
 */
function applyDisabledStateToSlider(disabledValue: boolean) {
  if (!sliderRoot.value) {
    return;
  }

  // from the docs, disable origins https://refreshless.com/nouislider/more/#section-disable
  const origins = sliderRoot.value.querySelectorAll(".noUi-origin");
  // also disable element with tabindex to prevent focus
  const handlers = sliderRoot.value.querySelectorAll(".noUi-handle");

  if (disabledValue) {
    [sliderRoot.value, ...origins, ...handlers].forEach((el) => {
      el.setAttribute("disabled", "true");
      el.setAttribute("aria-disabled", "true");
    });
    [...handlers].forEach((el) => el.removeAttribute("tabindex"));
  } else {
    [sliderRoot.value, ...origins, ...handlers].forEach((el) => {
      el.removeAttribute("disabled");
      el.removeAttribute("aria-disabled");
    });
    [...handlers].forEach((el) => el.setAttribute("tabindex", "0"));
  }
}

function applyValueToSliderInstance() {
  slider.value?.set(iterableValue.value);
}

function applyNewStepToSliderInstance() {
  slider.value?.updateOptions({ step: props.step }, true);
}

function applyNewRangeToSliderInstance() {
  slider.value?.updateOptions({ range: props.range }, true);
}

watch(() => props.disabled, applyDisabledStateToSlider, { immediate: true });
watch(() => props.modelValue, applyValueToSliderInstance);
watch(() => props.step, applyNewStepToSliderInstance);
watch(() => props.range, applyNewRangeToSliderInstance, { deep: true });

onMounted(() => {
  if (!sliderRoot.value) {
    return /** early return for typescript */;
  }

  // copy of props, prevent update
  initialValues.value = [...iterableValue.value];

  slider.value = noUiSlider.create(sliderRoot.value, {
    start: initialValues.value,
    connect: initialValues.value.length > 1 ? true : "lower",
    range: props.range,
    step: props.step,
    handleAttributes: [{ [props.accessibleLabelType]: props.accessibleLabelValue }],
    ariaFormat: {
      to: (value) => floatingNumberConversion(value),
      from: props.formatter as (valueToFormat: string | number) => number, // accept strings anyway
    },
  });

  // subscribe to update event
  slider.value.on("update", onSliderUpdate);

  // trigger custom disabling logic
  applyDisabledStateToSlider(props.disabled);
});

onUnmounted(() => {
  slider.value?.off("update");
  slider.value?.destroy();
});

function emitInput(value: number) {
  emits("update:modelValue", value);
}
</script>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/focusMixins.less";

@barsize-mobile: 0.25rem;
@barsize-desktop: 0.125rem;
@thumbsize-mobile: 2rem;
@thumbsize-desktop: 1rem;
@half-interactive-area-mobile: ((@thumbsize-mobile - @barsize-mobile) / 2);
@half-interactive-area-desktop: ((@thumbsize-desktop - @barsize-desktop) / 2);
@handle-bar-border-radius: var(--nck-radius-s);

.nck-slider.nck-style {
  .nck-slider-wrapper {
    // inline-block to prevent margin collapse
    display: inline-block;
    width: 100%;
    margin: var(--nck-spacing-s) 0;
  }

  .nck-slider-header {
    text-align: left;
  }

  .nck-slider-inner {
    // overall size and expand clickable area with pseudo-elements
    &.noUi-horizontal {
      height: auto;

      & /deep/ .noUi-base {
        height: @barsize-desktop;
        margin: @half-interactive-area-desktop 0;

        &:after,
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: @half-interactive-area-desktop;
        }

        &:before {
          top: 0;
          transform: translateY(-100%);
        }

        &:after {
          top: 100%;
        }

        @media @tablet, @phone {
          height: @barsize-mobile;
          margin: @half-interactive-area-mobile 0;

          &:before,
          &:after {
            height: @half-interactive-area-mobile;
          }
        }
      }
    }

    // range background bar
    &.noUi-target {
      box-shadow: none;
      background-color: var(--nck-border-neutral);
      border: none;
      border-radius: @handle-bar-border-radius;
    }

    /deep/ .noUi {
      &-handle {
        // inspired from https://refreshless.com/nouislider/examples/#section-styling
        border-radius: 50%;
        border: var(--nck-border-width-m) solid var(--nck-surface-primary);
        height: @thumbsize-desktop;
        width: @thumbsize-desktop;
        right: -(@thumbsize-desktop / 2);
        top: -@half-interactive-area-desktop;
        box-shadow: var(--box-shadow-level-1);

        // prevent noUi visuals
        &:before,
        &:after {
          content: none;
        }

        @media @tablet, @phone {
          border-width: 0.5rem;
          height: @thumbsize-mobile;
          width: @thumbsize-mobile;
          right: -(@thumbsize-mobile / 2);
          top: -@half-interactive-area-mobile;
        }
      }

      &-connects {
        border-radius: @handle-bar-border-radius;
      }

      &-handle,
      &-connect {
        background-color: var(--nck-surface-info-solid);
      }
    }

    &:not([disabled]) /deep/ .noUi-handle {
      &:hover,
      &:active {
        background-color: var(--nck-surface-info-solid-hover);
      }

      &:focus,
      &:focus-visible {
        .outside-focus-mixin();
      }

      &:active {
        @media @tablet, @phone {
          border-color: var(--nck-surface-primary);
          border-width: 0.25rem;
        }

        border-color: var(--nck-border-active-hover);
      }
    }

    &[disabled] /deep/ .noUi {
      &-handle,
      &-connect {
        background-color: var(--nck-icon-disabled);
      }
    }

    &[disabled],
    &[disabled] /deep/ .noUi-handle {
      cursor: auto;
    }
  }
}
</style>

<docs>
  Amount example :
  ```jsx
  const amount = 50

  <div>
    <nck-slider
      v-model="amount"
      :step="10"
      :formatter="value => value + ' $'"
      accessibleLabelType="aria-label"
      accessibleLabelValue="amount"
      :range="{ min: 0, max: 100 }"
    />
    <code>v-model: {{amount}}</code><br/>
    <button @click="amount = 80">Set amount to 80</button>
  </div>
  ```

  disabled :
  ```jsx
  const basicNumberFormatter = valueToFormat => Number.parseFloat(valueToFormat.toString());

  <nck-slider
    :modelValue="20"
    :disabled="true"
    :formatter="basicNumberFormatter"
    accessibleLabelType="aria-label"
    accessibleLabelValue="amount"
    :range="{ min: 0, max: 100 }"
  />
  ```

  Re-setting range :
  ```jsx
  const amount = 50;
  const range = { min: 0, max: 100 };

  <nck-slider
    v-model="amount"
    :formatter="value => value + ' $'"
    accessibleLabelType="aria-label"
    accessibleLabelValue="amount"
    :range="range"
    :step="10"
  />
  <button @click="range = { min: 50, max: 90 }">Set range to 50 to 90</button>
  ```

  Re-setting step :
  ```jsx
  const amount = 50;
  const step = 10;

  <nck-slider
    v-model="amount"
    :formatter="value => value + ' $'"
    accessibleLabelType="aria-label"
    accessibleLabelValue="amount"
    :range="{ min: 0, max: 100 }"
    :step="step"
  />
  <button @click="step = 20">Set step to 20</button>
  ```
</docs>
