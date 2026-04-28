<template>
  <div class="content-switcher-container" :class="{ 'standard-width': standardWidth }">
    <div
      class="nck-style nck-internal nck-content-switcher"
      role="radiogroup"
      :class="{ 'grayed-background': atMostOneOptionIsNotDisabled }"
      :aria-label="label"
    >
      <div
        v-for="button in options"
        :key="button.value"
        class="button-element-container"
        :class="{ 'disabled-container': button.disabled }"
        @click="selectButtonIfNotDisabled(button)"
      >
        <button
          type="button"
          role="radio"
          ref="buttons"
          class="button-element text-m-semibold outside-focus"
          :class="{ active: isButtonSelectedAndNotDisabled(button) }"
          :tabindex="isTheFocusableButton(button) ? 0 : -1"
          :aria-checked="modelValue === button.value ? 'true' : 'false'"
          :disabled="button.disabled"
          @keydown="selectOtherValue"
        >
          <nck-icon
            v-if="button.icon"
            :primaryColor="getIconColor(button)"
            :iconSize="IconSize.S"
            :iconName="button.icon"
            :iconAltText="button.iconAltText ?? ''"
          />
          <span v-if="button.text" v-text="button.text" />
          <nck-counter-badge
            v-if="button.counterValue !== undefined"
            :entry="button.counterValue"
            :size="CounterBadgeSize.L"
            :fontColor="getCounterBadgeFontColor(button)"
            :backgroundColor="getCounterBadgeBackgroundColor(button)"
            class="content-switcher-counter"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/radiusVariables.less";
@import (reference) "../styles/breakpointsVariables.less";

.content-switcher-container {
  display: inline-block;
  max-width: 100%;

  &:not(.standard-width) {
    @media @tablet, @phone {
      display: block;
    }
  }
}

.nck-content-switcher {
  display: flex;

  &.grayed-background > .button-element-container {
    background-image: linear-gradient(var(--nck-border-neutral), var(--nck-border-neutral));

    &:first-child {
      background-image: linear-gradient(to left, var(--nck-border-neutral) 50%, transparent 50%);
    }

    &:last-child {
      background-image: linear-gradient(to right, var(--nck-border-neutral) 50%, transparent 50%);
    }
  }

  .button-element-container {
    display: flex;
    flex: 1 1 auto;
    cursor: pointer;
    border-style: solid;
    border-width: var(--nck-border-width-s) 0;
    border-color: var(--nck-border-neutral);

    .content-switcher-container:not(.standard-width) & {
      @media @tablet, @phone {
        flex-basis: 0;
      }
    }

    &:first-child {
      border-image: linear-gradient(to left, var(--nck-border-neutral) 50%, transparent 50%) 1;

      & > .button-element {
        background-image:
          linear-gradient(var(--nck-surface-primary), var(--nck-surface-primary)),
          linear-gradient(to left, transparent 50%, var(--nck-border-neutral) 50%);
      }
    }

    &:last-child {
      border-image: linear-gradient(to right, var(--nck-border-neutral) 50%, transparent 50%) 1;

      & > .button-element {
        background-image:
          linear-gradient(var(--nck-surface-primary), var(--nck-surface-primary)),
          linear-gradient(to right, transparent 50%, var(--nck-border-neutral) 50%);
      }
    }

    &:hover {
      & > .button-element:not(:disabled) {
        background-image:
          linear-gradient(var(--nck-surface-primary-hover), var(--nck-surface-primary-hover)),
          linear-gradient(var(--nck-surface-primary-hover), var(--nck-surface-primary-hover));
      }

      & > .button-element.active {
        border-color: var(--nck-border-active);
        background-image:
          linear-gradient(to top, fade(@bright-blue-200, 30%), fade(@bright-blue-200, 30%)),
          linear-gradient(to top, transparent, transparent);
      }
    }

    &.disabled-container {
      cursor: not-allowed;
    }

    .button-element {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: var(--nck-spacing-s);
      margin: calc(-1 * var(--nck-border-width-s)) 0; // fixes border issue in case with 2 small items
      padding: 0.4375rem 1rem;
      color: var(--nck-text-default);
      word-break: break-all;
      cursor: pointer;
      border: var(--nck-border-width-s) solid transparent;
      border-radius: var(--nck-radius-pill);
      background-color: transparent;
      background-origin: border-box;
      background-clip: padding-box, border-box;
      background-image:
        linear-gradient(var(--nck-surface-primary), var(--nck-surface-primary)),
        linear-gradient(transparent, transparent);

      > *:not(.content-switcher-counter) {
        padding: 0.0625rem 0; // counterbalances negative margin from parent element
      }

      > .content-switcher-counter {
        flex-shrink: 0; // prevent word-break from affecting counter badge text
      }

      @media @desktop {
        max-width: 16rem;
      }

      @media @tablet, @phone {
        .content-switcher-container:not(.standard-width) & {
          flex-basis: 0;
        }

        .content-switcher-container.standard-width & {
          max-width: 16rem;
        }
      }

      &.active {
        color: var(--nck-text-brand);
        background-image:
          linear-gradient(to top, var(--nck-surface-info-subtle), var(--nck-surface-info-subtle)),
          linear-gradient(to top, var(--nck-border-active), var(--nck-border-active));
      }

      &:disabled {
        color: var(--nck-text-disabled);
        cursor: not-allowed;
        background-image:
          linear-gradient(var(--nck-border-neutral), var(--nck-border-neutral)),
          linear-gradient(var(--nck-border-neutral), var(--nck-border-neutral));
      }

      &:focus {
        z-index: 1;
      }
    }
  }
}
</style>

<script setup lang="ts">
import NckIcon from "@/components/nckIcon.vue";
import NckCounterBadge from "@/components/nckCounterBadge.vue";
import { Colors } from "@/constants/colors";
import { CounterBadgeSize } from "@/constants/counterBadgeSize";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";
import { DomHelper } from "@/helpers/domHelper";
import { computed, onBeforeMount, ref } from "vue";
import { ElementSelectionController } from "../controllers/elementSelectionController";
import { type IContentSwitcherOption } from "../models/iContentSwitcherOption";

/**
 * @component
 * @displayName nck-content-switcher
 * A component acting like a group of radio buttons but with the style of a group of buttons.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = defineProps<{
  /**
   * An array of objects describing each button options.
   * The following properties are available:
   *
   *  - text [optional] (string): the text of the button
   *  - value [mandatory] (string): the value of the button that will be set when button is selected
   *  - disabled [optional] (boolean): disables the button (makes it unselectable with a specific style)
   *  - icon [optional] (string): add a leading icon
   *  - iconAltText [optional] (string): alt for the icon. Mandatory if the button is icon-only
   *  - counterValue [optional] (number): displays a counter badge with the specified number
   *  - counterBackgroundColor [optional] (Colors): custom background color for the counter badge. If not specified, defaults to bright blue. Note: disabled state always overrides custom colors and is dark grey with white font.
   *  - counterFontColor [optional] (Colors): custom font color for the counter badge. If not specified, defaults to white. Note: disabled state overrides custom font color to white.
   *
   * Please note, you need at least two buttons, and each button must contain either a "text" or an "icon" element; otherwise an error is triggered.
   */
  options: IContentSwitcherOption[];

  /**
   * The value of the selected button, acts as a "v-model" (bi-directionnal data binding,
   * see [Vue.JS documentation](https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model))
   */
  modelValue: string; // will expose a v-model

  /**
   * The label for the content switcher. It is not displayed and only announced by screenreader.
   *
   * /!\ For compatibility purpose this "prop" is not set to required, but this is actually required by accessibility.
   * Expect this prop to be required in a new major version.
   */
  label?: string;

  /**
   * When true, prevents the content switcher from taking full width on small screens (tablet and phone).
   * By default (false), the content switcher is full-width on small screens.
   */
  standardWidth?: boolean;
}>();

const emits = defineEmits<{
  /**
   * Event emitted when value changed after selection of another button,
   * acts as a "v-model" (bi-directionnal data binding,
   * see [Vue.JS documentation](https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model))
   *
   * @param {string} newValue the new selected value
   */
  (e: "update:modelValue", newValue: string): void;
}>();

const buttons = ref<HTMLElement[] | null>(null);

onBeforeMount(() => {
  if (props.options.length < 2) {
    throw new Error("Fatal error in NckContentSwitcher: you should have at least two buttons.");
  }

  if (!props.label) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning in NckContentSwitcher: 'label' is required for accessibility purpose, but not enforced for compatibility reasons." +
        " Please provide one as it will become mandatory in one of the next major release",
    );
  }

  if (props.options.some((option) => !option.text && !option.icon)) {
    throw new Error(
      "Fatal error in NckContentSwitcher: you should define at least the icon or the text for each button.",
    );
  }

  if (props.options.some((option) => !option.text && option.icon && !option.iconAltText)) {
    throw new Error("Fatal error in NckContentSwitcher: you should define iconAltText when text is not provided.");
  }
});

function focusButton(index: number) {
  if (Array.isArray(buttons.value)) {
    const currentButton = buttons.value[index];
    if (currentButton instanceof HTMLElement) {
      currentButton.focus();
    }
  }
}

function getCurrentlyFocusedButtonIndex() {
  if (Array.isArray(buttons.value)) {
    return buttons.value.findIndex((buttonElement) => DomHelper.getActiveElement() === buttonElement);
  }
  return -1;
}

function isTheFocusableButton(buttonOptions: IContentSwitcherOption) {
  if (props.modelValue.length > 0) {
    return isButtonSelected(buttonOptions);
  } else {
    const index = props.options.indexOf(buttonOptions);
    const indexOfFirstNonDisabledButton = props.options.findIndex((button) => !button.disabled);
    return index === indexOfFirstNonDisabledButton;
  }
}

function selectButton(buttonOptions: IContentSwitcherOption) {
  emits("update:modelValue", buttonOptions.value); // work in conjuction with prop value to expose v-model
}

function selectButtonIfNotDisabled(buttonOptions: IContentSwitcherOption) {
  if (!buttonOptions.disabled) {
    selectButton(buttonOptions);
  }
}

function selectNextValue() {
  const currentValueIndex = getCurrentlyFocusedButtonIndex();
  const newIndex = ElementSelectionController.getNextNonDisabledElementIndex(props.options, currentValueIndex);
  const newSelectedValue = props.options[newIndex];
  selectButton(newSelectedValue);
  focusButton(props.options.indexOf(newSelectedValue));
}

function selectOtherValue($event: KeyboardEvent) {
  if ($event.key === "ArrowRight") {
    selectNextValue();
  } else if ($event.key === "ArrowLeft") {
    selectPreviousValue();
  }
}

function selectPreviousValue() {
  const currentValueIndex = getCurrentlyFocusedButtonIndex();
  let newSelectedValue = null;
  const newIndex = ElementSelectionController.getPreviousNonDisabledElementIndex(props.options, currentValueIndex);
  newSelectedValue = props.options[newIndex];
  selectButton(newSelectedValue);
  focusButton(props.options.indexOf(newSelectedValue));
}

function isButtonSelected(buttonOptions: IContentSwitcherOption) {
  return props.modelValue === buttonOptions.value;
}

function isButtonSelectedAndNotDisabled(buttonOptions: IContentSwitcherOption) {
  return isButtonSelected(buttonOptions) && !buttonOptions.disabled;
}

function getIconColor(buttonOptions: IContentSwitcherOption) {
  if (buttonOptions.disabled) {
    return IconColors.BLUE_GREY_400;
  }

  return isButtonSelectedAndNotDisabled(buttonOptions) ? IconColors.BRIGHT_BLUE_300 : IconColors.BLUE_GREY_600;
}

const atMostOneOptionIsNotDisabled = computed(
  (): boolean => props.options.filter((button) => !button.disabled).length <= 1,
);

function getCounterBadgeFontColor(buttonOptions: IContentSwitcherOption) {
  if (buttonOptions.disabled) {
    return Colors.WHITE;
  }
  return buttonOptions.counterFontColor ?? Colors.WHITE;
}

function getCounterBadgeBackgroundColor(buttonOptions: IContentSwitcherOption) {
  if (buttonOptions.disabled) {
    return Colors.INK_40;
  }
  return buttonOptions.counterBackgroundColor ?? Colors.BRIGHT_BLUE_300;
}
</script>

<docs>
The content switcher is a radio button group-like component, with the style of button.
Each button has a "text", the displayed value, a "value" the technical value exposed in the code,
similar to what you encounter with radio buttons and an "icon" with "iconAltText". "icon" and "text" are optional, but at least one of the two is required.
"iconAltText" is mandatory when missing a "text"

The selected value is available through "v-model" (VueJS bi-directionnal databinding), allowing to set and update
value easily.

You declare each button (you need at least two) in the following way.
```js
const options = [
  { text: "Hello", value: "hello" },
  { text: "Goodbye", value: "goodbye" },
  { text: "How are you", value: "how", icon: "train", iconAltText: "a train" },
];

const value = "goodbye";

<div>
  <nck-content-switcher v-model="value" label="Greetings" :options="options" />

  Selected value is {{value}}
</div>
```

If you don't have any default value to set, an empty string will work fine also (won't select anything)

```js
const options = [
  { text: "No", value: "no" },
  { text: "Selection", value: "selection" }
];

const value = "";

<div>
  <nck-content-switcher v-model="value" label="Please select an option" :options="options" />

  Selected value is {{value}}
</div>
```

Button can be disabled, this makes them unselectable, unless you set the value programmatically.

```js
const options = [
  { text: "Hello", value: "hello" },
  { text: "Other (disabled)", value: "other", disabled: true },
  { text: "Goodbye", value: "goodbye" }
];

const value = "hello";
<div>
  <nck-content-switcher v-model="value" label="Greetings" :options="options" />

  Selected value is {{value}}
</div>
```

You can add counter badges to display numbers alongside the button text.
```jsx
const value = "preview";
<nck-content-switcher
  v-model="value"
  label="View options"
  :options="[
    { text: 'Preview', value: 'preview', counterValue: 3 },
    { text: 'Layout', value: 'layout', counterValue: 17 },
    { text: 'Other', value: 'other', counterValue: 1 }
  ]"
/>
```

You can customize colors using the `counterBackgroundColor` and `counterFontColor` properties.
```jsx
const value = "preview";
<nck-content-switcher
  v-model="value"
  label="View with colors"
  :options="[
    { text: 'Red', value: 'red', counterValue: 17, counterBackgroundColor: Colors.RED_300 },
    { text: 'Green', value: 'green', counterValue: 1, counterBackgroundColor: Colors.GREEN_300, counterFontColor: Colors.INK_100 }
  ]"
/>
```

By default, the content switcher takes full width on small screens (tablet and phone).
You can prevent this behavior by setting the `standardWidth` prop to true.

```js
const options = [
  { text:"No", value: "no" },
  { text: "Selection", value: "selection" }
];

const value = "";

<div>
  <nck-content-switcher v-model="value" label="Please select an option" :options="options" :standardWidth="true" />

  Selected value is {{value}}
</div>
```
</docs>
