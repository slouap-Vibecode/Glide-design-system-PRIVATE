<template>
  <div class="nck-style nck-internal nck-loader" :class="type" :id="id">
    <progress class="screenreader-only" max="100" :value="modelValue" :aria-label="loadingText" />

    <div v-if="type === LoaderType.LINEAR" class="linear-loader" :class="displayContext">
      <div class="background" />
      <div v-if="Number.isFinite(modelValue)" class="line static" :style="{ width: `${modelValue}%` }" />
      <template v-else>
        <div class="line inc" />
        <div class="line dec" />
      </template>
    </div>

    <svg
      v-else
      focusable="false"
      class="circular-loader"
      :class="size"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="moving-circle" :class="displayContext" cx="12" cy="12" r="10.5" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { LoaderSize } from "@/constants/loaderSize";
import { LoaderType } from "@/constants/loaderType";
import { DisplayContext } from "@/constants/displayContext";

/**
 * @component
 * @displayName nck-loader
 *
 * A component to display waiting state to the user.
 *
 * This component only handles accessibility for the loader itself, requiring you
 * to implement the behavior surrounding the loader. For advanced accessibility support
 * on page loading for instance, it is advised to use [NckLoadingArea](#nckloadingarea) component.
 *
 * NOTE: Currently the circular type is only supporting indefinite loading.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

defineProps({
  /**
   * ID to set on the loader component
   */
  id: { type: String },

  /**
   * Text announced to assistive technologies.
   */
  loadingText: { required: true, type: String },

  /**
   * Adapt the style of the loader displayed based on its background.
   *
   * Values are the one [DisplayContext](#displaycontext) which
   * are here to described the background color.
   */
  displayContext: {
    type: String,
    default: DisplayContext.WHITE_BACKGROUND,
    validator: (value: DisplayContext) => Object.values(DisplayContext).includes(value),
  },

  /**
   * Size of the loader. Only for circular loader. It will be ignored for linear loader.
   *
   * Takes values from [LoaderSize](#loadersize) enum.
   */
  size: {
    type: String,
    default: LoaderSize.M,
    validator: (value: LoaderSize) => Object.values(LoaderSize).includes(value),
  },

  /**
   * Type of loader.
   *
   * Takes values from [LoaderType](#loadertype) enum.
   */
  type: {
    type: String,
    default: LoaderType.CIRCULAR,
    validator: (value: LoaderType) => Object.values(LoaderType).includes(value),
  },

  /**
   * Percentage of the progression (between 0 and 100 inclusive).
   *
   * If omitted, the loader is indeterminate.
   *
   * NOTE: This property works only for linear loader at the moment.
   * Circular loader will ignore it and stay indeterminate.
   */
  modelValue: {
    type: Number,
    validator: (value: number) => value >= 0 && value <= 100,
  },
});
</script>

<style lang="less" scoped>
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/colorsVariables.less";

.nck-style.nck-internal.nck-loader {
  &.linear {
    display: block;
    width: 100%;

    div.linear-loader {
      position: relative;
      height: 0.25rem;
      width: 100%;
      overflow: hidden;

      .background {
        height: 100%;
        width: 100%;
        background-color: var(--nck-surface-info-subtle);
      }

      .line {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--nck-surface-info-solid);

        &.static {
          transition: all var(--nck-duration-600) var(--nck-easing-out);
        }

        @keyframes increase {
          from {
            left: -5%;
            width: 5%;
          }
          to {
            left: 130%;
            width: 100%;
          }
        }

        @keyframes decrease {
          from {
            left: -80%;
            width: 80%;
          }
          to {
            left: 110%;
            width: 10%;
          }
        }

        &.inc {
          animation: increase var(--nck-duration-1000) infinite;
        }

        &.dec {
          animation: decrease var(--nck-duration-1000) var(--nck-duration-600) infinite;
        }
      }

      &.displayed-on-dark-background {
        .background {
          background-color: fade(@white, 20);
        }
        .line {
          background-color: var(--white);
        }
      }
    }
  }

  &.circular {
    display: inline-block;

    svg.circular-loader {
      @keyframes svg-animation {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }

      animation: var(--nck-duration-900) linear infinite svg-animation;

      .loader-size-mixin(@size) {
        width: @size;
        height: @size;
      }

      &.xs {
        .loader-size-mixin(1rem);
      }

      &.s {
        .loader-size-mixin(1.25rem);
      }

      &.m {
        .loader-size-mixin(1.5rem);
      }

      &.l {
        .loader-size-mixin(2rem);
      }

      &.xl {
        .loader-size-mixin(3rem);
      }

      &.xxl {
        .loader-size-mixin(4rem);
      }

      @keyframes circle-animation {
        0%,
        25% {
          stroke-dashoffset: 55;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 13;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 55;
          transform: rotate(360deg);
        }
      }

      circle.moving-circle {
        animation: var(--nck-duration-1000) ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        stroke: var(--nck-border-active);
        stroke-linecap: round;
        stroke-dasharray: 56;
        stroke-dashoffset: 14;
        stroke-width: 0.09375rem;
        transform-origin: 50% 50%;

        &.displayed-on-dark-background {
          stroke: var(--white);
        }
      }
    }
  }
}
</style>

<docs>
The loader shows user something is happening and they need to wait.

It doesn't handle much accessibility and you need to manage it on your own
(focus management, updating status to user etc.). For more advanced behavior, you can
use [NckLoadingArea](#nckloadingarea) which constrains a bit more but handles a lot of accessibility for you.

Here is a loader in its simplest form:
```jsx
<nck-loader loading-text="Loading" />
```

With dark background:
```jsx
<div style="background-color: black;">
  <nck-loader loading-text="Loading" :display-context="DisplayContext.DARK_BACKGROUND" />
</div>
```

Circular loaders have different sizes:
```jsx
<div>
  <nck-loader loading-text="Loading" :size="LoaderSize.XS" />
  <nck-loader loading-text="Loading" :size="LoaderSize.S" />
  <nck-loader loading-text="Loading" :size="LoaderSize.M" />
  <nck-loader loading-text="Loading" :size="LoaderSize.L" />
  <nck-loader loading-text="Loading" :size="LoaderSize.XL" />
  <nck-loader loading-text="Loading" :size="LoaderSize.XXL" />
</div>
```

Linear loader:
```jsx
<nck-loader loading-text="Loading" :type="LoaderType.LINEAR" />
```

Linear loader with dark background:
```jsx
<div style="background-color: black; height: 10rem;">
  <nck-loader loading-text="Loading" :display-context="DisplayContext.DARK_BACKGROUND" :type="LoaderType.LINEAR" />
</div>
```

Linear loader with percentage:
```jsx
let value = 10;

<div>
  <nck-loader :loading-text="`Loading ${value}%`" :type="LoaderType.LINEAR" :modelValue="value <= 100 ? value : 100" />
  <button :disabled="value >= 100" @click="value += 10">Add 10%</button>
  <button @click="value = 0">Reset</button>
</div>
```
</docs>
