<template>
  <component
    ref="mainElement"
    :is="ariaRole === 'button' ? 'button' : 'a'"
    class="nck-style nck-internal nck-button"
    :href="ariaRole === 'link' && !(disabled || loading) ? 'javascript:void(0)' : null"
    :class="buttonStyleClasses"
    :disabled="ariaRole === 'button' ? disabled || loading : null"
    :aria-disabled="disabled || loading"
    @click="emitClicksIfInteractive"
    :tabindex="disabled || loading ? -1 : null"
    :type="nativeType"
    :form="ariaRole === 'button' ? form : null"
  >
    <div v-if="isLeftIconDisplayed" class="icon-counter-container">
      <template v-if="leftIcon">
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-extra-small"
          :class="{ 'left-icon-with-text': !!label }"
          :iconSize="IconSize.XS"
          :iconName="leftIcon"
          :iconAltText="leftIconAlternativeText"
        />
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-small"
          :class="{ 'left-icon-with-text': !!label }"
          :iconSize="IconSize.S"
          :iconName="leftIcon"
          :iconAltText="leftIconAlternativeText"
        />
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-medium"
          :class="{ 'left-icon-with-text': !!label }"
          :iconSize="IconSize.M"
          :iconName="leftIcon"
          :iconAltText="leftIconAlternativeText"
        />
      </template>
      <template v-if="counterBadgeEntry && !isRightIconDisplayed && !label && !loading">
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.M"
          class="counter-badge-with-icon counter-badge-medium"
        ></nck-counter-badge>
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.S"
          class="counter-badge-with-icon counter-badge-small"
        ></nck-counter-badge>
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.XS"
          class="counter-badge-with-icon counter-badge-extra-small"
        ></nck-counter-badge>
      </template>
    </div>

    <div class="loader loader-extra-small" aria-live="polite" :class="{ 'text-only-loader': !!label && !leftIcon }">
      <nck-loader
        v-if="loading && !rightIcon && !counterBadgeEntry"
        :size="LoaderSize.XS"
        :loadingText="loadingText ?? ''"
        :class="{ 'left-icon-with-text': !!leftIcon && !!label }"
        class="loader-component"
      />
    </div>
    <div class="loader loader-small" aria-live="polite" :class="{ 'text-only-loader': !!label && !leftIcon }">
      <nck-loader
        v-if="loading && !rightIcon && !counterBadgeEntry"
        :size="LoaderSize.S"
        :loadingText="loadingText ?? ''"
        :class="{ 'left-icon-with-text': !!leftIcon && !!label }"
        class="loader-component"
      />
    </div>
    <div class="loader loader-medium" aria-live="polite" :class="{ 'text-only-loader': !!label && !leftIcon }">
      <nck-loader
        v-if="loading && !rightIcon && !counterBadgeEntry"
        :size="LoaderSize.M"
        :loadingText="loadingText ?? ''"
        :class="{ 'left-icon-with-text': !!leftIcon && !!label }"
        class="loader-component"
      />
    </div>

    <span
      v-if="label"
      :class="{ 'invisible-text': !leftIcon && loading && !rightIcon }"
      :aria-hidden="!leftIcon && loading && !rightIcon && loading"
      >{{ label }}</span
    >

    <template v-if="label && counterBadgeEntry && !isRightIconDisplayed && !loading">
      <nck-counter-badge
        :entry="counterBadgeEntry"
        :plusPrefix="counterBadgePlusPrefix"
        :backgroundColor="counterBadgeProperties.backgroundColor"
        :fontColor="counterBadgeProperties.fontColor"
        :size="CounterBadgeSize.L"
        class="counter-badge-with-text counter-badge-large"
      ></nck-counter-badge>
      <nck-counter-badge
        :entry="counterBadgeEntry"
        :plusPrefix="counterBadgePlusPrefix"
        :backgroundColor="counterBadgeProperties.backgroundColor"
        :fontColor="counterBadgeProperties.fontColor"
        :size="CounterBadgeSize.M"
        class="counter-badge-with-text counter-badge-medium"
      ></nck-counter-badge>
      <nck-counter-badge
        :entry="counterBadgeEntry"
        :plusPrefix="counterBadgePlusPrefix"
        :backgroundColor="counterBadgeProperties.backgroundColor"
        :fontColor="counterBadgeProperties.fontColor"
        :size="CounterBadgeSize.S"
        class="counter-badge-with-text counter-badge-small"
      ></nck-counter-badge>
      <nck-counter-badge
        :entry="counterBadgeEntry"
        :plusPrefix="counterBadgePlusPrefix"
        :backgroundColor="counterBadgeProperties.backgroundColor"
        :fontColor="counterBadgeProperties.fontColor"
        :size="CounterBadgeSize.XS"
        class="counter-badge-with-text counter-badge-extra-small"
      ></nck-counter-badge>
    </template>

    <div v-if="isRightIconDisplayed" class="icon-counter-container">
      <template v-if="rightIcon">
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-extra-small"
          :class="{ 'right-icon-with-text': !!label }"
          :iconSize="IconSize.XS"
          :iconName="rightIcon"
          :iconAltText="rightIconAlternativeText"
        />
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-small"
          :class="{ 'right-icon-with-text': !!label }"
          :iconSize="IconSize.S"
          :iconName="rightIcon"
          :iconAltText="rightIconAlternativeText"
        />
        <nck-icon
          :primaryColor="iconColor"
          :secondaryColor="iconColor"
          class="icon-medium"
          :class="{ 'right-icon-with-text': !!label }"
          :iconSize="IconSize.M"
          :iconName="rightIcon"
          :iconAltText="rightIconAlternativeText"
        />
      </template>
      <template v-if="counterBadgeEntry && !loading">
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.M"
          class="counter-badge-with-icon counter-badge-medium"
        ></nck-counter-badge>
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.S"
          class="counter-badge-with-icon counter-badge-small"
        ></nck-counter-badge>
        <nck-counter-badge
          :entry="counterBadgeEntry"
          :plusPrefix="counterBadgePlusPrefix"
          :backgroundColor="counterBadgeProperties.backgroundColor"
          :fontColor="counterBadgeProperties.fontColor"
          :size="CounterBadgeSize.XS"
          class="counter-badge-with-icon counter-badge-extra-small"
        ></nck-counter-badge>
      </template>
    </div>

    <div
      class="loader loader-extra-small"
      aria-live="polite"
      :class="{ 'text-only-loader': !!label && !rightIcon && !counterBadgeEntry }"
    >
      <nck-loader
        v-if="loading && (rightIcon || counterBadgeEntry)"
        :size="LoaderSize.XS"
        :loadingText="loadingText ?? ''"
        :class="{ 'right-icon-with-text': (!!rightIcon || !!counterBadgeEntry) && !!label }"
        class="loader-component"
      />
    </div>
    <div
      class="loader loader-small"
      aria-live="polite"
      :class="{ 'text-only-loader': !!label && !rightIcon && !counterBadgeEntry }"
    >
      <nck-loader
        v-if="loading && (rightIcon || counterBadgeEntry)"
        :size="LoaderSize.S"
        :loadingText="loadingText ?? ''"
        :class="{ 'right-icon-with-text': (!!rightIcon || !!counterBadgeEntry) && !!label }"
        class="loader-component"
      />
    </div>
    <div
      class="loader loader-medium"
      aria-live="polite"
      :class="{ 'text-only-loader': !!label && !rightIcon && !counterBadgeEntry }"
    >
      <nck-loader
        v-if="loading && (rightIcon || counterBadgeEntry)"
        :size="LoaderSize.M"
        :loadingText="loadingText ?? ''"
        :class="{ 'right-icon-with-text': (!!rightIcon || !!counterBadgeEntry) && !!label }"
        class="loader-component"
      />
    </div>
  </component>
</template>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";

@buttonBorderSize: var(--nck-border-width-s);

.nck-style.nck-button {
  border-radius: var(--nck-radius-s);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  text-decoration: none;
  position: relative;
  font-weight: var(--nck-font-weight-semibold);

  &:hover {
    transition:
      background-color var(--nck-duration-400) var(--nck-easing-out),
      border-color var(--nck-duration-400) var(--nck-easing-out);
  }

  &.floating {
    border-radius: var(--nck-radius-pill);

    &:not(:focus) {
      box-shadow: var(--box-shadow-level-5);

      &:hover:not(.loading) {
        box-shadow: var(--box-shadow-level-7);
      }
    }
  }

  .loader {
    line-height: 0;
    display: inline-block;

    &.text-only-loader {
      position: absolute;
      left: 50%;
      top: 50%;

      .loader-component {
        position: relative;
        margin-left: -50%;
        margin-top: -50%;
      }
    }
  }

  &.fullwidth {
    width: 100%;
    text-align: center;
  }

  &.loading {
    cursor: default;
  }

  .invisible-text {
    visibility: hidden;
  }

  /* sizes */
  .icon-extra-small,
  .icon-small,
  .icon-medium,
  .loader-extra-small,
  .loader-small,
  .loader-medium,
  .counter-badge-extra-small,
  .counter-badge-small,
  .counter-badge-medium,
  .counter-badge-large {
    display: none;
  }

  &.nck-button-small {
    &:not(.icon-only) {
      padding: 0.1875rem 0.5rem;
      @media @tablet, @phone {
        padding: 0.5rem 1rem;
      }

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.1875rem - @buttonBorderSize) calc(0.5rem - @buttonBorderSize); // remove border size to have same overall size
        @media @tablet, @phone {
          padding: calc(0.5rem - @buttonBorderSize) calc(1rem - @buttonBorderSize); // remove border size to have same overall size
        }
      }
    }

    @media @desktop {
      font-size: var(--nck-font-size-body-s);
      padding: var(--nck-spacing-2xs);
      line-height: var(--line-height-text-s);

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.25rem - @buttonBorderSize); // remove border size to have same overall size
      }

      .icon-extra-small,
      .loader-extra-small {
        display: inline-block;
      }
      .counter-badge-with-text.counter-badge-medium,
      .counter-badge-with-icon.counter-badge-extra-small {
        display: table;
      }
    }
    @media @tablet, @phone {
      padding: var(--nck-spacing-s);
      font-size: var(--nck-font-size-body-m);
      line-height: var(--line-height-text-m);

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.5rem - @buttonBorderSize); // remove border size to have same overall size
      }
      .icon-small,
      .loader-small {
        display: inline-block;
      }
      .counter-badge-with-text.counter-badge-large,
      .counter-badge-with-icon.counter-badge-small {
        display: table;
      }
    }
  }

  &.nck-button-medium {
    &:not(.icon-only) {
      padding: 0.5rem 1rem;
      @media @tablet, @phone {
        padding: 0.75rem 1.5rem;
      }

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.5rem - @buttonBorderSize) calc(1rem - @buttonBorderSize); // remove border size to have same overall size
        @media @tablet, @phone {
          padding: calc(0.75rem - @buttonBorderSize) calc(1.5rem - @buttonBorderSize); // remove border size to have same overall size
        }
      }
    }

    @media @desktop {
      font-size: var(--nck-font-size-body-m);
      padding: var(--nck-spacing-s);
      line-height: var(--line-height-text-m);

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.5rem - @buttonBorderSize); // remove border size to have same overall size
      }
      .icon-small,
      .loader-small {
        display: inline-block;
      }
      .counter-badge-with-text.counter-badge-large,
      .counter-badge-with-icon.counter-badge-small {
        display: table;
      }
    }
    @media @tablet, @phone {
      padding: var(--nck-spacing-m);
      font-size: var(--nck-font-size-body-l);
      line-height: var(--line-height-text-l);

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.75rem - @buttonBorderSize); // remove border size to have same overall size
      }
      .icon-medium,
      .loader-medium {
        display: inline-block;
      }
      .counter-badge-with-text.counter-badge-large,
      .counter-badge-with-icon.counter-badge-medium {
        display: table;
      }
    }
  }

  &.nck-button-large,
  &.nck-button-extra-large {
    font-size: var(--nck-font-size-body-l);
    line-height: var(--line-height-text-l);

    .icon-medium,
    .loader-medium {
      display: inline-block;
    }

    .counter-badge-with-text.counter-badge-large,
    .counter-badge-with-icon.counter-badge-medium {
      display: table;
    }
  }

  &.nck-button-large {
    @media @desktop {
      padding: 0.75rem;

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.75rem - @buttonBorderSize); // remove border size to have same overall size
      }
    }
    @media @tablet, @phone {
      padding: 1rem;

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(1rem - @buttonBorderSize); // remove border size to have same overall size
      }
    }

    &:not(.icon-only) {
      padding: 0.75rem 1.5rem;
      @media @tablet, @phone {
        padding: 1rem 1.5rem;
      }

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(0.75rem - @buttonBorderSize) calc(1.5rem - @buttonBorderSize); // remove border size to have same overall size
        @media @tablet, @phone {
          padding: calc(1rem - @buttonBorderSize) calc(1.5rem - @buttonBorderSize); // remove border size to have same overall size
        }
      }
    }
  }

  &.nck-button-extra-large {
    padding: 1rem;

    &.outline:not(.disabled, .floating),
    &.filled.light:not(.disabled, .floating) {
      padding: calc(1rem - @buttonBorderSize); // remove border size to have same overall size
    }

    &:not(.icon-only) {
      padding: 1rem 1.5rem;

      &.outline:not(.disabled, .floating),
      &.filled.light:not(.disabled, .floating) {
        padding: calc(1rem - @buttonBorderSize) calc(1.5rem - @buttonBorderSize); // remove border size to have same overall size
      }
    }
  }

  .filled-background-mixin(@color, @hoverColor) {
    background: @color;

    &:hover:not(.loading),
    &:active:not(.loading) {
      background: @hoverColor;
    }
  }

  /* colors */
  &.filled:not(.disabled) {
    border: none;

    & /deep/ .nck-style.nck-loader circle.moving-circle {
      stroke: var(--white);
    }

    color: var(--white);

    &.primary {
      .filled-background-mixin(@bright-blue-300, @bright-blue-400);
    }

    &.light {
      color: var(--ink-100);

      &:not(.floating) {
        background: var(--white);
        border: @buttonBorderSize solid var(--blue-grey-300);

        &:hover:not(.loading),
        &:active:not(.loading) {
          border-color: var(--blue-grey-500);
        }
      }

      &.floating {
        .filled-background-mixin(@white, @blue-grey-200);
      }

      & /deep/ .nck-style.nck-loader circle.moving-circle {
        stroke: var(--blue-grey-600);
      }
    }

    &.positive {
      .filled-background-mixin(@green-300, @green-400);
    }

    &.negative {
      .filled-background-mixin(@red-300, @red-400);
    }
  }

  .outline-and-ghost-color(@color) {
    color: @color;

    & /deep/ .nck-style.nck-loader circle.moving-circle {
      stroke: @color;
    }
  }

  &.outline:not(.disabled),
  &.ghost:not(.disabled) {
    &.primary {
      .outline-and-ghost-color(@bright-blue-300);
    }

    &.light {
      color: var(--ink-100);

      & /deep/ .nck-style.nck-loader circle.moving-circle {
        stroke: var(--blue-grey-600);
      }
    }

    &.positive {
      .outline-and-ghost-color(@green-300);
    }

    &.negative {
      .outline-and-ghost-color(@red-300);
    }
  }

  .outline-border-color-mixin(@color) {
    &:not(.loading) {
      &:hover,
      &:active {
        border-color: @color;
      }
    }
  }

  &.outline:not(.disabled) {
    background: var(--white);
    border: @buttonBorderSize solid var(--blue-grey-300);

    &.primary {
      .outline-border-color-mixin(@bright-blue-300);
    }

    &.light {
      .outline-border-color-mixin(@blue-grey-500);
    }

    &.positive {
      .outline-border-color-mixin(@green-300);
    }

    &.negative {
      .outline-border-color-mixin(@red-300);
    }
  }

  .ghost-hover-background-mixin(@color) {
    &:not(.loading) {
      &:hover,
      &:active {
        background: @color;
      }
    }
  }

  &.ghost:not(.disabled),
  &.floating.outline:not(.disabled) {
    border: none;
    background: transparent;

    &.floating {
      background: var(--white);
    }

    &.primary {
      .ghost-hover-background-mixin(@bright-blue-100);
    }

    &.light {
      .ghost-hover-background-mixin(@blue-grey-200);
    }

    &.positive {
      .ghost-hover-background-mixin(@green-100);
    }

    &.negative {
      .ghost-hover-background-mixin(@red-100);
    }
  }

  &.positive:not(.disabled):focus {
    box-shadow: 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-positive);
  }

  &.negative:not(.disabled):focus {
    box-shadow: 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-negative);
  }

  &.disabled {
    background: var(--nck-surface-disabled);
    color: var(--nck-text-disabled);
    border: none;
    cursor: default;
    pointer-events: none;
  }

  .left-icon-with-text {
    margin-right: var(--nck-spacing-s);
  }

  .right-icon-with-text {
    margin-left: var(--nck-spacing-s);
  }

  .counter-badge-with-text {
    margin-left: var(--nck-spacing-s);
    text-align: center;
  }
  .icon-counter-container {
    position: relative;
    display: flex;

    .counter-badge-with-icon {
      position: absolute;
      top: -0.375rem;
      right: -0.375rem;
      text-align: center;

      &.counter-badge-extra-small {
        top: -0.25rem;
        right: -0.25rem;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import NckIcon from "./nckIcon.vue";
import { IconSize } from "@/constants/iconSize";
import NckLoader from "./nckLoader.vue";
import { LoaderSize } from "@/constants/loaderSize";
import { ButtonSize } from "@/constants/buttonSize";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonControlType } from "@/constants/buttonControlType";
import { ButtonType } from "@/constants/buttonType";
import { IconColors } from "@/constants/iconColors";
import NckCounterBadge from "@/components/nckCounterBadge.vue";
import { CounterBadgeSize } from "@/constants/counterBadgeSize";
import { Colors } from "@/constants/colors";

/**
 * @component
 * @displayName nck-button
 * A component to display a simple button.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 * - [Icons URL](#icons) (when using icons)
 */

const props = withDefaults(
  defineProps<{
    /**
     * The aria role of the button.
     */
    ariaRole?: "button" | "link";

    /**
     * The native type of the button, only when aria role is "button".
     *
     * Accepts one of the [ButtonControlType](#buttoncontroltype) value.
     */
    controlType?: ButtonControlType;

    /**
     * The color type of the button.
     *
     * Accepts one of the [ButtonColor](#buttoncolor) value.
     */
    color?: ButtonColor;

    /**
     * The size of the button.
     *
     * Accepts one of the [ButtonSize](#buttonsize) value.
     */
    size?: ButtonSize;

    /**
     * Aspect of the button.
     *
     * Accepts one of the [ButtonType](#buttontype) value.
     */
    type?: ButtonType;

    /**
     * The name of the icon to display on the left (icons comes Neo Icon Kit).
     *
     * If none leave this value empty.
     */
    leftIcon?: string;

    /**
     * The name of the icon to display on the right (icons comes Neo Icon Kit).
     *
     * If none leave this value empty.
     */
    rightIcon?: string;

    /**
     * To disable the button.
     */
    disabled?: boolean;

    /**
     * Label for the button.
     * If it is empty, you need to provide a value for "iconAltText" for accessibility reasons.
     */
    label?: string;

    /**
     * Alternative text for icon (if any) for accessibility.
     * This is required if leftIcon is invalid.
     */
    iconAltText?: string;

    /**
     * Alternative text for right icon (if any) for accessibility.
     * This is required if rightIcon is invalid.
     */
    rightIconAltText?: string;

    /**
     * Make the button takes the full width of its parent.
     */
    fullwidth?: boolean;

    /**
     * Set the button in loading mode: the loader is displayed and user cannot interact with button.
     *
     * WARNING: only the beginning of the loading will be announced by the screen reader. It is expected that
     * you, as the component user, handle correctly the announcement of the end of the loading.
     */
    loading?: boolean;

    /**
     * Alternative text for the loader in the button when it is in loading mode.
     *
     * Mandatory if your button can be in loading mode.
     */
    loadingText?: string;

    /**
     * Designates the button as a floating-action-button. Button will become
     * round.
     *
     * There is no GHOST type. It will take OUTLINE type's style.
     */
    floating?: boolean;

    /**
     * Display a [counter badge](#nckcounterbadge) with this number in the button.
     * And will display 99+ instead of a superior number. It has to be an integer >= 0.
     *
     * The badge is after label, or in the top right corner of the right icon.
     */
    counterBadgeEntry?: number;

    /**
     * To add a "+" prefix in front of the number for the counter badge.
     */
    counterBadgePlusPrefix?: boolean;

    /**
     * The `<form>` element to associate the button with (its form owner), only when aria role is "button".
     *
     * The value of this attribute must be the ID of a `<form>` in the same document.
     *
     * If this attribute is not set, the `<button>` is associated with its ancestor `<form>` element, if any.
     *
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#form).
     */
    form?: string;
  }>(),
  {
    ariaRole: "button",
    color: ButtonColor.LIGHT,
    size: ButtonSize.M,
    type: ButtonType.FILLED,
    floating: false,
  },
);

const emit = defineEmits<{
  /**
   * Emitted when button is clicked.
   * This event is not sent when the button is disabled or is loading.
   * @param {Event} $event the DOM click event
   */
  (e: "click", $event: Event): void;
}>();

defineExpose({
  /**
   * @public
   * Focuses the button.
   */
  focus,
});

const mainElement = ref<HTMLAnchorElement | HTMLButtonElement | null>(null);

function focus() {
  if (mainElement.value instanceof HTMLElement) {
    mainElement.value.focus();
  }
}

const nativeType = computed(() => {
  // Backward compatibility:
  // When aria role is "button", the default value should be empty to keep the default behavior of the browser.
  // But this would be a breaking change for the consuming applications, because it's been historically set to ButtonControlType.BUTTON by default (NCK-106).
  // This breaking change would mean that, without a code update, buttons used within a form would now submit it when clicked, which could be unexpected.
  // So for now, we keep this behavior.
  return props.ariaRole === "button" ? (props.controlType ?? ButtonControlType.BUTTON) : null;
});

const iconColor = computed(() => {
  if (props.disabled) {
    return IconColors.BLUE_GREY_500;
  } else if (props.color === ButtonColor.LIGHT) {
    return IconColors.BLUE_GREY_600;
  } else if (props.type === ButtonType.FILLED) {
    return IconColors.WHITE;
  } else if (props.type === ButtonType.OUTLINE || props.type === ButtonType.GHOST) {
    switch (props.color) {
      case ButtonColor.PRIMARY:
        return IconColors.BRIGHT_BLUE_300;
      case ButtonColor.POSITIVE:
        return IconColors.GREEN_300;
      case ButtonColor.NEGATIVE:
        return IconColors.RED_300;
    }
  }
  return undefined;
});

const counterBadgeProperties = computed(() => {
  let fontColor = Colors.WHITE;
  if (!props.disabled && props.type === ButtonType.FILLED) {
    switch (props.color) {
      case ButtonColor.PRIMARY:
        fontColor = Colors.BRIGHT_BLUE_300;
        break;
      case ButtonColor.POSITIVE:
        fontColor = Colors.GREEN_300;
        break;
      case ButtonColor.NEGATIVE:
        fontColor = Colors.RED_300;
        break;
    }
  }

  return {
    backgroundColor: iconColor.value as Colors | undefined,
    fontColor,
  };
});

const leftIconAlternativeText = computed((): string => {
  return props.iconAltText ?? "";
});

const rightIconAlternativeText = computed((): string => {
  return props.rightIconAltText ?? "";
});

const buttonStyleClasses = computed(() => {
  const classes: string[] = [props.color, props.type, `nck-button-${props.size}`];
  if (!props.label || props.label.length === 0) {
    classes.push("icon-only");
  }
  if (props.disabled) {
    classes.push("disabled");
  } else if (!props.loading) {
    classes.push("outside-focus");
  }
  if (props.fullwidth) {
    classes.push("fullwidth");
  }
  if (props.loading) {
    classes.push("loading");
  }
  if (props.floating) {
    classes.push("floating");
  }
  return classes;
});

const isLeftIconDisplayed = computed(() => {
  const leftIconNoLoading = !!(props.leftIcon && !props.loading);
  const leftIconRightIconLabel = !!(props.leftIcon && (props.rightIcon ?? props.counterBadgeEntry) && props.label);
  const isDisplayed = leftIconNoLoading || leftIconRightIconLabel;
  return isDisplayed;
});

const isRightIconDisplayed = computed(() => {
  const rightIconNoLoading = props.rightIcon && !props.loading;
  const labelOrNoLeftIcon = !!props.label || !props.leftIcon;
  const isDisplayed = rightIconNoLoading && labelOrNoLeftIcon;
  return isDisplayed;
});

onMounted(() => {
  if (
    (!props.label || props.label.length === 0) &&
    ((!!props.leftIcon && (!props.iconAltText || props.iconAltText.length === 0)) ||
      (!!props.rightIcon && (!props.rightIconAltText || props.rightIconAltText.length === 0)))
  ) {
    throw new Error(
      "Error in NckButton: for button with icon only, you need to provide a non-empty iconAltText or a non-empty rightIconAltText",
    );
  }
});

function emitClicksIfInteractive($event: Event) {
  if (props.disabled || props.loading) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
  } else {
    emit("click", $event);
  }
}
</script>

<docs>
Buttons have the primary color (blue), a light one (white one), a positive one (green) and a negative one (red).

```js
<div>
  <nck-button :color="ButtonColor.PRIMARY" label="This is the primary color"></nck-button>
  <nck-button label="This is the default color (light)"></nck-button>
  <nck-button :color="ButtonColor.POSITIVE" label="This is the positive color (green)"></nck-button>
  <nck-button :color="ButtonColor.NEGATIVE" label="This is the negative color (red)"></nck-button>
</div>
```

Buttons can be disabled.

```js
<nck-button :color="ButtonColor.PRIMARY" label="This is a disabled button" disabled></nck-button>
```

The button sizes are S, M, L, XL. On mobile + tablet resolutions, the size is 1 size bigger

```js
<div>
  <nck-button :color="ButtonColor.PRIMARY" label="S button" :size="ButtonSize.S"></nck-button>
  <nck-button :color="ButtonColor.PRIMARY" label="M button" :size="ButtonSize.M"></nck-button>
  <nck-button label="L button" :size="ButtonSize.L"></nck-button>
  <nck-button :color="ButtonColor.NEGATIVE" label="XL button" :size="ButtonSize.XL"></nck-button>
</div>
```

A button has three different types: filled, outlined and ghost
```js
<div>
  <nck-button :type="ButtonType.FILLED" :color="ButtonColor.PRIMARY" label="Filled button" ></nck-button>
  <nck-button :type="ButtonType.OUTLINE" :color="ButtonColor.POSITIVE" label="Outline button" ></nck-button>
  <nck-button :type="ButtonType.GHOST" :color="ButtonColor.LIGHT" label="Ghost button" ></nck-button>
</div>
```

A button can have an icon, displayed on its left side.
```js
<nck-button :color="ButtonColor.PRIMARY" label="Edit" leftIcon="edit-pencil"></nck-button>
```

Or you can have icon only buttons. In this case you need to provide an 'iconAltText'
A button can have an icon, displayed on its left side.
```js
<nck-button :color="ButtonColor.POSITIVE" iconAltText="Add" leftIcon="add-plus"></nck-button>
```

A button can also have an icon, displayed on its right side.
```js
<nck-button :color="ButtonColor.PRIMARY" label="Edit" rightIcon="edit-pencil"></nck-button>
```

The equivalent of iconAltText for rightIcon is rightIconAltText
```js
<nck-button :color="ButtonColor.POSITIVE" label="Edit" rightIcon="notexisticon" rightIconAltText="icon of edition"></nck-button>
```

A button can become full-width with a parameter
```js
<nck-button :color="ButtonColor.POSITIVE" fullwidth label="FullWidth button" iconAltText="Add" leftIcon="add-plus"></nck-button>
```

A button can behave as a link, by setting ariaRole 'link'.
```js
<nck-button label="This one behaves as a link" ariaRole="link"></nck-button>
```

A button can display loading. The loader will be displayed in place of the left icon if any,
otherwise it will hide the text and display in the center of the button.
You are required to provide a loading text for a button that can be in loading state for accessibility reasons.

Be careful, the loading text is only used to announce the beginning of the loading. You MUST handle the
announce of the end of the loading to the user.
```js
const loadingState = {
  btn1: false,
  btn2: false,
  btn3: false,
  btn4: false
}
<div>
  <div>
    A loading button with text only:
    <nck-button :type="ButtonType.FILLED" :color="ButtonColor.PRIMARY" label="click to toggle loading" :loading="loadingState.btn1" loadingText="This is loading"
      @click="loadingState.btn1 = !loadingState.btn1"></nck-button>
  </div>

  <div>
    A loading button with text and icon:
    <nck-button leftIcon="add-plus" :type="ButtonType.OUTLINE" :color="ButtonColor.POSITIVE" label="click to toggle loading" :loading="loadingState.btn2" loadingText="This is also loading"
      @click="loadingState.btn2 = !loadingState.btn2"></nck-button>
  </div>

  <div>
    A loading button with icon only (click it to toggle loading):
    <nck-button leftIcon="add-plus" :type="ButtonType.GHOST" :color="ButtonColor.NEGATIVE" iconAltText="click to toggle loading" :loading="loadingState.btn3" loadingText="This is again loading"
      @click="loadingState.btn3 = !loadingState.btn3"></nck-button>
  </div>

  <div>
    A loading button with text and right icon:
    <nck-button rightIcon="add-plus" :type="ButtonType.OUTLINE" :color="ButtonColor.POSITIVE" label="click to toggle loading" :loading="loadingState.btn4" loadingText="This is also loading"
      @click="loadingState.btn4 = !loadingState.btn4"></nck-button>
  </div>
</div>
```

Floating action button

```js
<div>
  <p>Filled:</p>

  <div>
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" />
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" />
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" />
  </div>

  <div>
    <nck-button floating label="Small FAB" :size="ButtonSize.S" :color="ButtonColor.LIGHT" />
    <nck-button floating label="Medium FAB" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" />
    <nck-button floating label="Large FAB" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" />
    <nck-button floating label="X-Large FAB" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" />
  </div>

  <p>Outline:</p>

  <div>
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.S" :color="ButtonColor.LIGHT" :type="ButtonType.OUTLINE" />
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :type="ButtonType.OUTLINE" />
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :type="ButtonType.OUTLINE" />
    <nck-button floating icon-alt-text="Add" left-icon="add-plus" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :type="ButtonType.OUTLINE" />
    <nck-button floating right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.S" :color="ButtonColor.LIGHT" :type="ButtonType.OUTLINE" />
    <nck-button floating right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :type="ButtonType.OUTLINE" />
    <nck-button floating right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :type="ButtonType.OUTLINE" />
    <nck-button floating right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :type="ButtonType.OUTLINE" />
  </div>

  <div>
    <nck-button floating label="Small FAB" :size="ButtonSize.S" :color="ButtonColor.LIGHT" :type="ButtonType.OUTLINE" />
    <nck-button floating label="Medium FAB" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :type="ButtonType.OUTLINE" />
    <nck-button floating label="Large FAB" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :type="ButtonType.OUTLINE" />
    <nck-button floating label="X-Large FAB" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :type="ButtonType.OUTLINE" />
  </div>
</div>
```

A button can display a counter badge. It will be placed either at the top of right icon, or if there is no icon, next to the label.
Its color is matching the button color. You have control on the plus prefix.

```js
<div>
  <p>Label + right icon:</p>

  <div>
    <nck-button label="Hello" right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :counterBadgeEntry="2"  />
    <nck-button label="I'm a" right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :counterBadgeEntry="125" />
    <nck-button label="Label" right-icon-alt-text="Add" right-icon="add-plus" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :counterBadgeEntry="3" counterBadgePlusPrefix />
  </div>

  <p>Label only:</p>

  <div>
    <nck-button label="Hello" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :counterBadgeEntry="2"  />
    <nck-button label="I'm a" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :counterBadgeEntry="125" />
    <nck-button label="Label" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :counterBadgeEntry="3" counterBadgePlusPrefix />
  </div>

  <p>Icon only (right or left):</p>

  <div>
    <nck-button icon-alt-text="Add" left-icon="filter" :size="ButtonSize.M" :color="ButtonColor.PRIMARY" :counterBadgeEntry="2"  />
    <nck-button right-icon-alt-text="Add" right-icon="trip" :size="ButtonSize.L" :color="ButtonColor.POSITIVE" :counterBadgeEntry="125" />
    <nck-button right-icon-alt-text="Add" right-icon="trash" :size="ButtonSize.XL" :color="ButtonColor.NEGATIVE" :counterBadgeEntry="3" counterBadgePlusPrefix />
  </div>
</div>
```
</docs>
