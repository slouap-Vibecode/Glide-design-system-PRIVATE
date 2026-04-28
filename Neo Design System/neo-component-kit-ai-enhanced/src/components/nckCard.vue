<template>
  <div
    class="nck-style nck-internal nck-card"
    :class="cardStyleClasses"
    :role="hasClickListener ? ariaRole : undefined"
    :tabindex="hasClickListener ? '0' : undefined"
    @[clickEvent]="click()"
    @[keyDownEvent]="clickWithKeydownEvent"
  >
    <!-- @slot Content of the card. Can be anything from rough text to advanced HTML. -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { CardBackgroundColor } from "@/constants/cardBackgroundColor";
import { CardType } from "@/constants/cardType";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";

/**
 * @component
 * @displayName nck-card
 * Cards are containers that are used to group related information together.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = defineProps({
  /**
   * Enables change of border aspect on hover.
   */
  isHoverable: Boolean,

  /**
   * Shows blue border aspect. To be used for selected state.
   */
  isSelected: Boolean,

  /**
   * Show stronger border aspect. To be used when card is active.
   */
  isActive: Boolean,

  /**
   * Show a bare card on mobile and tablet (full width, without shadows and borders).
   *
   * As a consequence, this card will not be clickable, hoverable, activable, or selectable. Usage of the related options will be prevented.
   */
  bareOnSmallResolution: Boolean,
  /**
   * The aria role of the card when it is clickable.
   * Only required when the card is clickable, ignored otherwise.
   * @values "button", "link"
   */
  ariaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },

  /**
   * The background color of the card.
   *
   * Accepts one of the [CardBackgroundColor](#cardbackgroundcolor) values
   */
  backgroundColor: {
    type: String,
    validator: (val: CardBackgroundColor) => Object.values(CardBackgroundColor).includes(val) || val === undefined,
    default: CardBackgroundColor.WHITE,
  },

  /**
   * Aspect of the card.
   *
   * Accepts one of the [CardType](#cardtype) value.
   */
  type: {
    type: String,
    validator: (val: CardType) => Object.values(CardType).includes(val) || val === undefined,
    default: CardType.ELEVATED,
  },
});

const emits = defineEmits<{
  /**
   * Event emitted when a card is clicked. Setting a listener will make the card clickable & focusable,
   * and if not present the card will neither be clickable nor focusable.
   *
   * However, it's possible to have the card change of aspect on hover independently from its clickability.
   *
   * Providing an ariaRole is mandatory when setting a click listener.
   * @event click
   */
  (e: "click"): void;
}>();

const attributes = useReactiveAttrs();
const hasClickListener = ref(false);

const cardStyleClasses = computed(() => {
  const cardClasses = [`background-color-${props.backgroundColor}`, props.type];
  if (props.isHoverable) {
    cardClasses.push("nck-hoverable");
  }
  if (hasClickListener.value) {
    cardClasses.push("nck-focusable");
    cardClasses.push("outside-focus");
  }
  if (props.isSelected) {
    cardClasses.push("nck-selected");
  }
  if (props.isActive) {
    cardClasses.push("nck-active");
  }
  if (props.bareOnSmallResolution) {
    cardClasses.push("bare-on-small-resolution");
  }

  return cardClasses;
});

const clickEvent = computed(() => {
  return hasClickListener.value ? "click" : null;
});

const keyDownEvent = computed(() => {
  return hasClickListener.value ? "keydown" : null;
});

onMounted(() => {
  if (hasClickListener.value && !props.ariaRole) {
    throw new Error("Error in NckCard: the Card is clickable while you did not provide an aria role.");
  }

  if (!hasClickListener.value && props.ariaRole) {
    throw new Error("Error in NckCard: the Card is not clickable but you have provided an ariaRole.");
  }

  if (props.type === CardType.OUTLINED && props.backgroundColor !== CardBackgroundColor.WHITE) {
    throw new Error("Error in NckCard: Only CardBackgroundColor.WHITE can be used with CardType.OUTLINED.");
  }

  checkBareOnSmallResolution();
});

function checkBareOnSmallResolution() {
  if (props.bareOnSmallResolution) {
    if (hasClickListener.value) {
      throw new Error("Error in NckCard: a clickable Card cannot be used with bareOnSmallResolution=true.");
    }
    if (props.isHoverable) {
      throw new Error("Error in NckCard: 'isHoverable' cannot be used with bareOnSmallResolution=true.");
    }
    if (props.isActive) {
      throw new Error("Error in NckCard: 'isActive' cannot be used with bareOnSmallResolution=true.");
    }
    if (props.isSelected) {
      throw new Error("Error in NckCard: 'isSelected' cannot be used with bareOnSmallResolution=true.");
    }
  }
}

function click() {
  emits("click");
}

function clickWithKeydownEvent($event: KeyboardEvent) {
  if ($event.key === "Enter" || (props.ariaRole === "button" && $event.key === " ")) {
    emits("click");
    $event.preventDefault();
    $event.stopPropagation();
  }
}

watch(
  attributes,
  () => {
    hasClickListener.value = !!attributes.value.onClick;
  },
  { immediate: true, deep: true },
);
</script>

<style lang="less" scoped>
@import (reference) "../styles/breakpointsVariables.less";
.nck-style.nck-card {
  border-radius: var(--nck-radius-m);
  transition: box-shadow var(--nck-duration-500) var(--nck-easing-in-out);
  overflow-wrap: break-word;
  hyphens: auto;

  &.elevated {
    box-shadow: var(--box-shadow-level-2);
  }

  &.outlined {
    border: var(--nck-border-width-s) solid var(--nck-border-neutral);
  }

  &.nck-hoverable:hover {
    box-shadow: var(--box-shadow-level-3);
  }

  &.nck-active {
    box-shadow: var(--box-shadow-level-5);
    &.nck-hoverable:hover {
      box-shadow: var(--box-shadow-level-6);
    }
  }

  &.nck-focusable {
    cursor: pointer;

    &:focus {
      box-shadow: var(--box-shadow-level-2), var(--box-shadow-focus);

      &.nck-hoverable:hover {
        box-shadow: var(--box-shadow-level-3), var(--box-shadow-focus);
      }

      &.nck-active {
        box-shadow: var(--box-shadow-level-5), var(--box-shadow-focus);
        &.nck-hoverable:hover {
          box-shadow: var(--box-shadow-level-6), var(--box-shadow-focus);
        }
      }
    }
  }

  &.nck-selected {
    border: var(--nck-border-width-s) solid var(--nck-border-active);
  }

  @media @phone, @tablet {
    &.bare-on-small-resolution {
      box-shadow: none;
      border: none;
      border-radius: initial;
      width: 100%;
    }
  }
}
</style>

<docs>

  Base version of the card, background white, not selected, not clickable, not hoverable, type elevated.

  ```js
  <nck-card>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
  </nck-card>
  ```

  Selected version of the card, not clickable, not hoverable.

  ```js
  <nck-card :isSelected=true>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
  </nck-card>
  ```

  Hoverable version of the card, not selected, not clickable.

  ```js
  <nck-card :isHoverable=true>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
  </nck-card>
  ```

  Clickable version of the card, not selected, not hoverable.

  ```jsx
  function cardWasClicked() {
    alert("card was clicked!");
  }

  <nck-card @click="cardWasClicked()" ariaRole="button">
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
  </nck-card>
  ```

  The card with its different background colors.

  ```vue
  <template>
    <div>
      <nck-card :backgroundColor="CardBackgroundColor.WHITE"><span>This is the white color</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.RED"><span>This is the red color</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.ORANGE"><span>This is the orange color</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.GREEN"><span>This is the green color</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.BRIGHT_BLUE"><span>This is the bright blue color</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.BLUE_GREY"><span>This is the blue grey color</span></nck-card>
    </div>
  </template>

  <style scoped>
    .nck-card {
      margin: 1rem;
      padding: 1rem;
    }
  </style>
  ```

  The card with its different default aspects.

  ```vue
  <template>
    <div class="card-types-container background-color-bright-blue-100">
      <nck-card :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.OUTLINED"><span>Outlined</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.ELEVATED"><span>Elevated</span></nck-card>
      <nck-card :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.FLAT"><span>Flat</span></nck-card>
    </div>
  </template>

  <style scoped>
    .card-types-container {
      padding: 2rem;
      display: flex;
      gap: 2rem;
    }
    .nck-card {
      width: 10rem;
      padding: 2rem;
    }
  </style>
  ```

  By default, a nck-card component has no dimensions imposed. Calling content is responsible for styling the card dimensions if needed.

  ```vue
  <template>
    <nck-card class="card-style" :isSelected=true>
      <img src="7-de-coeur.jpg" alt="Playing card 7 of hearts"/>
    </nck-card>
  </template>

  <style scoped>
    .card-style {
      width: calc(520/16 * 1rem);
      padding: calc(5/16 * 1rem);
    }
  </style>
  ```

  Using this component providing a click handler but no ariaRole will throw an error as it's mandatory to clarify what is the interactive role (button or link) of the clickable control.

  Using this component providing an ariaRole but no click handler will throw an error as it's incorrect to provide a button or link ariaRole on a non-clickable control.

  Using this component providing a CardType.OUTLINED and not CardBackgroundColor.WHITE will throw an error as outlined aspect must only be used with white background color.

  Using this component with bareOnSmallResolution=true will throw an error when combining with one of these incompatible options:
    - A clickable Card.
    - An hoverable Card.
    - An active Card.
    - A selected Card.
</docs>
