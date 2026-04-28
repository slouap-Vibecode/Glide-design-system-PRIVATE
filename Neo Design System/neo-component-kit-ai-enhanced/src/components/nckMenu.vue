<template>
  <ul
    class="nck-style nck-internal nck-menu font-color-ink-100"
    :class="{ 'fake-focusing': forceFocusAspectOnNavigatedMenuItem }"
    role="listbox"
    :tabindex="focusableByUser ? '0' : '-1'"
    ref="menu"
    :aria-activedescendant="currentOptionId"
    :aria-multiselectable="multiselect"
    @blur.stop.prevent="emitMenuBlurred"
    :style="{ 'max-height': maxHeight }"
    @keydown.esc="emitMenuDismissed"
    @keydown.enter="validateSelection"
    @keydown.prevent.space="validateSelection"
    @keydown.down="selectNextElement"
    @keydown.up="selectPreviousElement"
    @keydown="selectElementStartingWithLetter"
  >
    <template v-for="(item, index) in items">
      <li
        v-if="isMenuDivider(item)"
        :key="'divider-' + index"
        class="nck-divider"
        role="separator"
        aria-orientation="horizontal"
      ></li>
      <li
        v-else
        role="option"
        :key="getItemKey(item)"
        class="text-m inside-focus nck-menu-item"
        @click="clickElement(item, $event)"
        :class="{ selected: isSelected(item.value), navigated: selectableItemsIndexMap[index] === navigatedIndex }"
        :aria-disabled="item.disabled"
        :aria-selected="isSelected(item.value) ? 'true' : 'false'"
        :id="getOptionIndex(selectableItemsIndexMap[index])"
      >
        <div v-if="item.leadingIcon" class="leading-container">
          <nck-icon
            :iconName="item.leadingIcon"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="getIconColor(item)"
            :secondaryColor="getIconColor(item)"
          />
        </div>
        <div class="nck-text-container">
          <nck-checkbox
            v-if="multiselect"
            :modelValue="isSelected(item.value)"
            :label="item.label"
            :disabled="item.disabled"
            onlyFocusableProgrammatically
          />
          <div v-else>{{ item.label }}</div>
          <div
            v-if="item.subLabel"
            class="font-color-ink-70 text-s nck-sublabel"
            :class="{ 'font-color-ink-40': item.disabled }"
          >
            {{ item.subLabel }}
          </div>
        </div>
        <div v-if="item.trailingIcon || item.trailingCounterValue" class="trailing-container">
          <nck-icon
            v-if="item.trailingIcon"
            :iconName="item.trailingIcon"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="getIconColor(item)"
            :secondaryColor="getIconColor(item)"
          />
          <nck-counter-badge v-else-if="item.trailingCounterValue" :entry="item.trailingCounterValue" />
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts" generic="Data, Multiple extends boolean = false">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import NckCounterBadge from "./nckCounterBadge.vue";
import NckIcon from "./nckIcon.vue";
import NckCheckbox from "./nckCheckbox.vue";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "../constants/iconSize";
import type { IMenuItem } from "../models/iMenuItem";
import { ElementSelectionController } from "../controllers/elementSelectionController";
import { DividerToken, DIVIDER_TOKEN } from "@/constants/dividerToken";
import { IMenuProps } from "./interfaces/iMenuProps";

/**
 * @component
 * @displayName nck-menu
 * Component for list-based menus.
 *
 * A menu is a list of elements allowing mono or multi selection.
 * This component is usually wrapped in a container. For instance, a [Popover](#nckpopover).
 *
 * This element is only focusable programmatically.
 *
 * This component implements the `INckMenu` interface.
 */

const props = withDefaults(defineProps<IMenuProps<Data, Multiple>>(), {
  autoSelect: true,
  maxHeight: 14.25,
  focusableByUser: false,
  navigateToFirstElementIfNoSelection: true,
  forceFocusAspectOnNavigatedMenuItem: false,
  fullHeight: false,
});

const emits = defineEmits<{
  /**
   * Emitted when the menu is blurred.
   * It is different from menu dismiss because usually you shouldn't
   * intervene on the focus as the user already done their own focus change.
   */
  (e: "menu-blurred"): void;

  /**
   * Emitted when the menu is dismissed (escape, or enter in case of autoselect enabled) you are
   * expected to manage focus after that if you hide the menu.
   */
  (e: "menu-dismissed"): void;

  /**
   * Emitted when a non-disabled element is triggered.
   * @param value the value of the selected item in mono-selection and the array of values of the selected items in case of multi-selection
   */
  (e: "element-selected", payload: Multiple extends false ? Data : Data[]): void;

  /**
   * Emitted when the navigated option of the Menu changes.
   * Provides the DOM id of the navigated item, and the technical value associated to it.
   * Particularly useful for parent components popping up a menu and managing focus for assistive technologies using
   * [aria-activedescendant](https://developer.mozilla.org/en-US/docs/web/Accessibility/ARIA/Attributes/aria-activedescendant),
   * or for parent components popping up a menu and requiring a manual selection of a menu item.
   * @param {{ id: string, value: Data }} option the newly navigated option. Data being the type you defined in the generic.
   */
  (e: "current-option-changed", payload: { id: string | undefined; value: Data }): void;
}>();

/*
 * Keeping track of where the user is when they navigate the options with the arrow keys.
 * Only meaningful when property autoSelect is false.
 * The value is negative when this index is not set or irrelevant.
 */
const navigatedIndex = ref<number>(-1);
const optionsIds = ref<string[]>([]);
const menu = ref<HTMLUListElement | null>(null);

/**
 * Map of indexes giving a selectable item's index depending on
 * the original index from the whole items array (as it may include dividers).
 * This is necessary because a divider causes the index of subsequent selectable items to shift up.
 *
 * Examples:
 *  - [item, item, item] will give [0, 1, 2]
 *  - [item, divider, item, item] will give [0, -1, 1, 2]
 */
const selectableItemsIndexMap = computed((): number[] => {
  const outputArray: number[] = [];
  let delta = 0;
  props.items.forEach((entry, index) => {
    const isDivider = entry === DIVIDER_TOKEN;
    if (isDivider) {
      delta += 1;
    }
    outputArray.push(isDivider ? -1 : index - delta);
  });
  return outputArray;
});

/**
 * Returns selectable items only (excluding dividers).
 */
const selectableItems = computed((): Array<IMenuItem<Data>> => {
  return props.items.filter(isSelectableItem);
});

const maxHeight = computed(() => {
  return props.fullHeight ? "100%" : `${props.maxHeight}rem`;
});

/**
 * Function that returns the index of the current active element.
 * If nothing active, it will return undefined.
 */
const currentOptionId = computed(() => {
  const selectedIdx =
    props.autoSelect && !props.multiselect
      ? selectableItems.value.findIndex((entry) => entry.value === props.selectedValue)
      : navigatedIndex.value;
  return selectedIdx > -1 ? optionsIds.value[selectedIdx] : undefined;
});

const getCurrentlySelectedIndex = computed(() => {
  const currentValueSelected = Array.isArray(props.selectedValue)
    ? props.selectedValue.slice(-1)[0]
    : props.selectedValue;
  if (currentValueSelected === undefined) {
    return -1;
  }
  return selectableItems.value.map((entry) => entry.value).indexOf(currentValueSelected);
});

/**
 * Set the focus on the menu.
 */
function focusMenu() {
  // waiting for next DOM refresh as element seems unfocusable otherwise
  void nextTick(() => {
    const menuElement = menu.value;
    if (menuElement instanceof HTMLElement) {
      menuElement.focus();
      if (navigatedIndex.value === -1) {
        navigatedIndex.value = ElementSelectionController.getNextNonDisabledElementIndex(selectableItems.value, -1);
      }
      putCurrentlySelectedElementIntoView();
    }
  });
}

function navigateToIndex(index: number) {
  navigatedIndex.value = index;
  setElementIntoView(index);
}

/**
 * Set the currently selected element into view.
 */
function putCurrentlySelectedElementIntoView() {
  setElementIntoView(getCurrentlySelectedIndex.value);
}

/**
 * Selects the next menu item jumping from last to first if currently on the last one.
 */
function selectNextElement($event?: KeyboardEvent) {
  if ($event) {
    $event.preventDefault();
  }
  let newIndex;
  if (props.autoSelect && !props.multiselect) {
    newIndex = ElementSelectionController.getNextNonDisabledElementIndex(
      selectableItems.value,
      getCurrentlySelectedIndex.value,
    );
    emitElementSelected(selectableItems.value[newIndex]);
  } else {
    newIndex = ElementSelectionController.getNextNonDisabledElementIndex(selectableItems.value, navigatedIndex.value);
  }
  navigatedIndex.value = newIndex;
  setElementIntoView(newIndex);
}

/**
 * Selects the previous menu element jumping from first to last if currently on the first one.
 */
function selectPreviousElement($event?: KeyboardEvent) {
  if ($event) {
    $event.preventDefault();
  }
  let newIndex;
  if (props.autoSelect && !props.multiselect) {
    newIndex = ElementSelectionController.getPreviousNonDisabledElementIndex(
      selectableItems.value,
      getCurrentlySelectedIndex.value,
    );
    emitElementSelected(selectableItems.value[newIndex]);
  } else {
    newIndex = ElementSelectionController.getPreviousNonDisabledElementIndex(
      selectableItems.value,
      navigatedIndex.value,
    );
  }
  navigatedIndex.value = newIndex;
  setElementIntoView(newIndex);
}

/**
 * Set the navigated index to be the selected value or the first non disabled.
 *
 * If the prop navigateToFirstElementIfNoSelection is set to false, the behaviour of this method
 * is changed to only set the navigated index to be the selected value and not the first non disabled.
 */
function setNavigatedWithSelectedOrFirstEnabled() {
  let currentIndex = getCurrentlySelectedIndex.value;
  if (currentIndex === -1 && props.navigateToFirstElementIfNoSelection) {
    currentIndex = ElementSelectionController.getNextNonDisabledElementIndex(selectableItems.value, -1);
  }
  navigatedIndex.value = currentIndex;
  setElementIntoView(currentIndex);
}

/**
 * Checks whether the provided menu item is a divider or not.
 */
function isMenuDivider(item: IMenuItem<Data> | DividerToken): item is DividerToken {
  return item === DIVIDER_TOKEN;
}

/**
 * Checks whether the provided menu item is selectable or not.
 */
function isSelectableItem(item: IMenuItem<Data> | DividerToken): item is IMenuItem<Data> {
  return item !== DIVIDER_TOKEN;
}

/**
 * Function that checks if an element isSelected or not.
 * Works for multi and single selection.
 */
function isSelected(elementValue: Data) {
  if (Array.isArray(props.selectedValue)) {
    return props.selectedValue.includes(elementValue);
  } else {
    return elementValue === props.selectedValue;
  }
}

function emitElementSelected(item: IMenuItem<Data>) {
  if (!item?.disabled) {
    const payload: Data | Data[] = props.multiselect ? getSelectedValueAfterSelectionForMultiselect(item) : item.value;
    emits("element-selected", payload as Multiple extends false ? Data : Data[]);
  }
}

function clickElement(item: IMenuItem<Data>, $event: Event) {
  $event.preventDefault();
  emitElementSelected(item);
  if (props.multiselect) {
    navigatedIndex.value = selectableItems.value.indexOf(item);
  } else {
    emitMenuDismissed();
  }
}

/**
 * For multiselect, this function returns
 * the selected values minus the one in the parameter
 * if it was already in the selected values,
 * else it returns the selected values plus the one in parameter.
 */
function getSelectedValueAfterSelectionForMultiselect(selectedItem: IMenuItem<Data>): Data[] {
  if (!props.multiselect) {
    throw new Error(
      "Error in NckMenu: getSelectedValueAfterSelectionForMultiselect should only be called in a 'multiselect' context.",
    );
  }
  if (Array.isArray(props.selectedValue)) {
    if (props.selectedValue.includes(selectedItem.value)) {
      return props.selectedValue.filter((el) => el !== selectedItem.value);
    } else {
      return props.selectedValue.concat(selectedItem.value);
    }
  } else {
    return [selectedItem.value];
  }
}

function emitMenuBlurred() {
  emits("menu-blurred");
}

function emitMenuDismissed() {
  emits("menu-dismissed");
}

function validateSelection($event: Event) {
  $event.stopPropagation();
  $event.preventDefault();
  if (props.multiselect) {
    emitElementSelected(selectableItems.value[navigatedIndex.value]);
  } else {
    if (!props.autoSelect) {
      emitElementSelected(selectableItems.value[navigatedIndex.value]);
      navigatedIndex.value = -1;
    }
    emitMenuDismissed();
  }
}

function getOptionIndex(index: number) {
  if (!optionsIds.value[index]) {
    optionsIds.value[index] = AccessibilityHelper.generateId();
  }
  return optionsIds.value[index];
}

function setElementIntoView(elementIndex: number) {
  const menuElement = menu.value;
  const selectedElementId = optionsIds.value[elementIndex];
  if (menuElement instanceof HTMLElement && selectedElementId && menuElement.scrollHeight > menuElement.clientHeight) {
    const selectedElement = menuElement.querySelector("#" + selectedElementId);
    if (selectedElement instanceof HTMLElement) {
      const containerTopScroll = menuElement.scrollTop;
      const containerScrollBottom = menuElement.clientHeight + containerTopScroll;
      const elementTop = selectedElement.offsetTop;
      const elementBottom = selectedElement.offsetTop + selectedElement.offsetHeight;
      if (elementBottom > containerScrollBottom) {
        menuElement.scrollTop = elementBottom - menuElement.clientHeight;
      } else if (elementTop < containerTopScroll) {
        menuElement.scrollTop = elementTop;
      }
    }
  }
}

function selectElementStartingWithLetter($event: KeyboardEvent) {
  if ($event.key.length === 1) {
    const lowerCaseKey = $event.key.toLowerCase();
    const currentIndex =
      props.autoSelect && !props.multiselect ? getCurrentlySelectedIndex.value : navigatedIndex.value;
    let newIndex = selectableItems.value.findIndex(
      (option, index) =>
        index > currentIndex && !option.disabled && option.label.toLowerCase().startsWith(lowerCaseKey),
    );
    if (newIndex < 0) {
      // go back at the beginning
      newIndex = selectableItems.value.findIndex(
        (option, index) =>
          index < currentIndex && !option.disabled && option.label.toLowerCase().startsWith(lowerCaseKey),
      );
      if (newIndex < 0) {
        // if still no value found, it means only current can be focused
        newIndex = currentIndex;
      }
    }

    if (props.autoSelect && !props.multiselect) {
      emitElementSelected(selectableItems.value[newIndex]);
    } else {
      navigatedIndex.value = newIndex;
    }
    setElementIntoView(newIndex);
  }
}

function getIconColor(item: IMenuItem<Data>) {
  if (Array.isArray(props.selectedValue)) {
    return !item.disabled && props.selectedValue.includes(item.value)
      ? IconColors.BRIGHT_BLUE_300
      : IconColors.BLUE_GREY_500;
  }
  return item.value === props.selectedValue && !item.disabled ? IconColors.BRIGHT_BLUE_300 : IconColors.BLUE_GREY_500;
}

function getItemKey(item: IMenuItem<Data>): string {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return String(typeof item.value === "object" ? getHashCode(item.value) : item.value);
}

function getHashCode(object: unknown) {
  const jsonString = JSON.stringify(object);
  let hash = 0;
  let chr;
  if (jsonString.length === 0) {
    return hash;
  }
  for (let i = 0; i < jsonString.length; i++) {
    chr = jsonString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

onMounted(() => {
  setNavigatedWithSelectedOrFirstEnabled();
});

function resetNavigationIndex() {
  if (!props.multiselect) {
    setNavigatedWithSelectedOrFirstEnabled();
  }
}

function emitCurrentOptionChange() {
  emits("current-option-changed", {
    id: currentOptionId.value,
    value: selectableItems.value[navigatedIndex.value]?.value,
  });
}

watch(currentOptionId, emitCurrentOptionChange);
watch(() => props.selectedValue, resetNavigationIndex);

defineExpose({
  /**
   * @public
   * Set the focus on the menu.
   */
  focusMenu,
  /**
   * @public
   * Set the currently selected element into view.
   */
  putCurrentlySelectedElementIntoView,
  /**
   * @public
   * Selects the next menu item jumping from last to first if currently on the last one.
   */
  selectNextElement,
  /**
   * @public
   * Selects the previous menu element jumping from first to last if currently on the first one.
   */
  selectPreviousElement,
  /**
   * @public
   * Set the navigated index to be the selected value or the first non disabled.
   */
  setNavigatedWithSelectedOrFirstEnabled,
  /**
   * @ignore
   * Programmatically move the navigated index. Not publicly exposed for now.
   */
  navigateToIndex,
});
</script>

<style lang="less" scoped>
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/sizeVariables.less";
@import (reference) "../styles/focusMixins.less";

.nck-style.nck-menu {
  position: relative;

  &:focus,
  &[aria-activedescendant]:not([aria-activedescendant=""]).fake-focusing {
    outline: 0;

    .nck-menu-item.navigated {
      .inside-focus-mixin();

      &.selected {
        box-shadow:
          inset var(--box-shadow-focus),
          inset 0.1875rem 0 var(--nck-border-active);
      }
    }

    &[aria-multiselectable="true"] {
      .nck-menu-item.selected.navigated {
        .inside-focus-mixin();
      }
    }
  }

  background: none;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  width: 100%;
  overflow: auto;

  .nck-menu-item {
    display: flex;
    padding: 0.625rem 1rem;
    text-align: left;
    transition: background-color var(--nck-duration-400) var(--nck-easing-out);
    hyphens: auto;

    .leading-container,
    .nck-text-container,
    .trailing-container {
      pointer-events: none; // in IE blurred event occured before click on LI if children catches mouse events
    }

    &:not([aria-disabled]) {
      cursor: pointer;
    }

    .nck-text-container {
      width: 100%;
    }

    .leading-container {
      padding-right: 0.5rem;
      line-height: 0;
    }

    .trailing-container {
      margin-left: auto;
      padding-left: 0.5rem;
      line-height: 0;
    }

    &:hover:not([aria-disabled]) {
      background-color: var(--nck-surface-info-subtle);
    }

    &.selected {
      color: var(--nck-text-brand);
      background-color: var(--nck-surface-info-subtle);
      box-shadow: inset 0.1875rem 0 var(--nck-border-active);

      &:hover {
        background-color: fade(@bright-blue-200, 30);
      }
    }

    &[aria-disabled] {
      background-color: var(--nck-surface-primary);
      color: var(--nck-text-disabled);

      &.selected {
        background-color: var(--nck-surface-info-subtle);
        box-shadow: inset 0.1875rem 0 var(--nck-icon-disabled);
      }
    }
  }

  .nck-divider {
    border-top: var(--nck-border-width-s) solid var(--nck-border-neutral);
  }

  &[aria-multiselectable="true"] {
    .nck-menu-item {
      .nck-sublabel {
        padding-left: @checkbox-size + @checkbox-margin-right;

        @media @desktop {
          padding-left: @checkbox-size-desktop + @checkbox-margin-right;
        }
      }

      &.selected {
        background: var(--nck-surface-primary);
        box-shadow: none;

        &:hover {
          background-color: var(--nck-surface-info-subtle);
        }
      }
    }
  }
}
</style>

<docs>
A menu is navigated with the up and down arrow keys to select values,
or users can click to select a value.

Note that when the menu is dismissed with keyboard key such as Escape,
you need to manage the focus.

A simple menu looks like that:
```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "a label", value: "value" },
    { label: "another one", value: "another one" },
    { label: "a third one", value: "third" }
  ]
})

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

You can have a subLabel to add some precisions for users on some options.

```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "a label", value: "value" },
    { label: "another one", subLabel: "I am a sublabel", value: "another one" },
    { label: "a third one", subLabel: "And I am another one", value: "third" }
  ]
})

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

Menu items can have various aspects.
They can be disabled, have a leading icon, a trailing icon or a trailing counter badge.
Those options can be mixed together (except for the trailing icon and the trailing counter badge
there can only be one).

The value will also be preselected if you pass down a value to the menu.
```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "preselected",
  menuItems: [
    { label: "I have a leading icon", value: "leadingicon", leadingIcon: "hotel" },
    { label: "And a trailing icon", value: "trailingicon", trailingIcon: "add-plus" },
    { label: "I am preselected", value: "preselected" },
    { label: "I can have a counter", value: "counter", trailingCounterValue: 12},
    { label: "I can be disabled", value: "disabled", disabled: true },
    { label: "And I can have both icons", value: "both", leadingIcon: "add-plus", trailingIcon: "hotel"}
  ]
});

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

You can also have a divider to separate menu items.
This way you can create different groups of actions, like separating dangerous actions from the other ones.

```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "View", value: "view" },
    { label: "Edit", value: "edit" },
    { label: "Comment", value: "comment" },
    "nckDividerToken",
    { label: "Archive", value: "archive" },
    { label: "Delete", value: "delete" },
  ]
})

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

By default, a value is selected as soon as user selects it with the arrow key  (arrow up, arrow down or letter).
But you can disable this behavior by setting the props "autoSelect" to false.

User will need to press enter to explicitly select a value.
You must use this pattern if your menu is causing updates on the page or loading new data.
```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "a label", value: "value" },
    { label: "another one", value: "another one" },
    { label: "a third one", value: "third" }
  ]
});

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :autoSelect="false"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

A menu can be multiselectable.
The default behavior where a value is selected as soon as user select it with the arrow key (arrow up, arrow down or letter) is disabled when the menu is multiselectable.
Pressing enter will not close the menu but just toggle the selection of the active item.

```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: [],
  menuItems: [
    { label: "Label1", value: "label1" },
    { label: "Label2", value: "Label2" },
    { label: "Orange", subLabel: "Fruit", value: "Orange" }
  ]
});

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :multiselect="true"
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

You can set the menu to be focusable in the user flow so user can reach it with tab key (or shift + tab).
It is useful if your menu is embedded within a container that has other focusable elements.

```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "a label", value: "value" },
    { label: "another one", value: "another one" },
    { label: "a third one", value: "third" }
  ]
})

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    @element-selected="updateSelectedValue"
    focusableByUser />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```

A menu that is not in auto-select mode (autoSelect = false), will try to navigate to the selected item if any, or to the first non disabled item otherwise.
In some cases, we don't want the menu to automatically navigate to the first non disabled item if no selected item is present.
Showing a focus ring on some item before the user selects it can be confusing to the user.
This is especially true if the menu is integrated into another component that requires a manual selection of a value.

```jsx
import { ref } from "vue";

const exampleData = ref({
  selectedValue: "",
  menuItems: [
    { label: "a label", value: "value" },
    { label: "another one", value: "another one" },
    { label: "a third one", value: "third" }
  ]
})

function updateSelectedValue(newValue) {
  exampleData.value.selectedValue = newValue;
}

<div>
  <nck-menu
    :items="exampleData.menuItems"
    :selectedValue="exampleData.selectedValue"
    :navigateToFirstElementIfNoSelection="false"
    @element-selected="updateSelectedValue" />

  <p>Selected value: {{exampleData.selectedValue}}</p>
</div>
```
</docs>
