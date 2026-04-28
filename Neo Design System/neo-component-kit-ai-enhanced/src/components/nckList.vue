<template>
  <ul
    class="nck-style nck-internal nck-list"
    role="list"
    :class="{
      'hide-first-top-border': hideFirstTopBorder,
      'hide-last-bottom-border': hideLastBottomBorder,
      'rounded-corners': hasRoundedCorners,
    }"
  >
    <li
      class="nck-list-item-container"
      :class="{ 'no-side-border': hideSideBorders }"
      v-for="(entry, index) in data"
      :key="castEntryRowUniqueValue(entry)"
    >
      <div
        class="nck-list-item inside-focus"
        :role="ariaRole"
        :class="{ clickable: hasRowClickedListener, pressed: hasRowClickedListener && pressedRowIndex === index }"
        :tabindex="hasRowClickedListener ? '0' : undefined"
        @[clickEvent]="clickRow(entry)"
        @[keyDownEvent]="
          // @ts-expect-error vue is not able to infer the type of $event
          clickRowWithKeydownEvent(entry, $event)
        "
        @[mouseDownEvent]="setCurrentPressedRow(index)"
        @[touchStartEvent]="setCurrentPressedRow(index)"
        @[mouseUpEvent]="setCurrentPressedRow(-1)"
        @[touchEndEvent]="setCurrentPressedRow(-1)"
        @[mouseLeaveEvent]="setCurrentPressedRow(-1)"
      >
        <div role="img" class="warning-area" v-if="isWarningDisplayed(entry)" :aria-label="warningAlternative"></div>
        <!-- @slot The template for a row. Row data are passed as data in the slot -->
        <slot v-bind="entry"></slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="Data extends Object">
import { onMounted, toRef } from "vue";
import { useAbstractList } from "../composables/useAbstractList";

/**
 * @component
 * @displayName nck-list
 *
 * Display data as a list.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = defineProps<{
  /**
   * Data to be displayed
   */
  data: Data[];

  /**
   * The key of property given to v-bind:key, allow to have correct performance with v-for
   * it must be a key of a property which is unique among every element
   */
  rowUniqueKey: keyof Data;

  /**
   * To determine which row displays warning mark.
   * @deprecated
   *
   * It can be:
   *
   *  - a string: the name of the property warning mark presence will be checked
   *  - a function: that will take in parameter the current row data. Warning mark
   *  will be displayed if function returns a truthy value.
   */
  hasWarningSource?: keyof Data | ((entry: Data) => boolean);

  /**
   * The alternative text for the warning symbol
   * @deprecated
   */
  warningAlternative?: string;

  /**
   * The aria role of the row when it is clickable. Possible value 'button' or 'link'
   * Note: this is only required when the row is clickable, it is ignored otherwise
   * @values 'button', 'link'
   */
  rowAriaRole?: "button" | "link";

  /**
   * Hide the left and right borders
   */
  hideSideBorders?: boolean;

  /**
   * Hide the top border of the first element of the list
   */
  hideFirstTopBorder?: boolean;

  /**
   * Hide the bottom border of the last element of the list
   */
  hideLastBottomBorder?: boolean;

  /**
   * The list container will have rounded corners.
   * Note that it must have all four borders then, and that the properties to hide them are not compatible with this option.
   */
  hasRoundedCorners?: boolean;
}>();

const emits = defineEmits<{
  /**
   * Event emitted when a row is clicked. Setting a listener will make the row clickable,
   * and if not present the row won't be clickable nor focusable.
   * You MUST provide a rowAriaRole if you have a listener
   * @event row-clicked
   * @param entry the data of the clicked row
   */
  (e: "row-clicked", entry: Data): void;
}>();

const {
  pressedRowIndex,
  ROW_CLICKED_EVENT,
  clickEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
  mouseLeaveEvent,
  touchStartEvent,
  touchEndEvent,
  hasRowClickedListener,
  ariaRole,
  setCurrentPressedRow,
} = useAbstractList(toRef(props, "rowAriaRole"));

function clickRow(entry: Data) {
  emits(ROW_CLICKED_EVENT, entry);
}

function clickRowWithKeydownEvent(entry: Data, $event: KeyboardEvent) {
  if ($event.key === "Enter" || (ariaRole.value === "button" && $event.key === " ")) {
    emits(ROW_CLICKED_EVENT, entry);
    $event.preventDefault();
    $event.stopPropagation();
  }
}

/* what about perf, this method is called often
if we pass a method that is expensive what happen? */
function isWarningDisplayed(entry: Data) {
  switch (typeof props.hasWarningSource) {
    case "string":
      return entry[props.hasWarningSource];
    case "function":
      return props.hasWarningSource(entry);
    default:
      break;
  }
}

onMounted(() => {
  if (props.hasWarningSource && typeof props.warningAlternative !== "string") {
    throw new Error(
      "Fatal error in NckList: you provided a hasWarningSource but did not provide an alternative text using warningAlternative.",
    );
  }

  if (hasRowClickedListener.value && typeof props.rowAriaRole !== "string") {
    throw new Error(
      "Fatal error in NckList: your list items are clickable but you did not provide a role to your list items using rowAriaRole.",
    );
  }

  if (hasRowClickedListener.value && props.rowAriaRole !== "button" && props.rowAriaRole !== "link") {
    throw new Error(
      "Fatal error in NckList: invalid role provided in rowAriaRole for a clickable row. Valid values are 'link' or 'button'.",
    );
  }

  if (props.hasRoundedCorners && (props.hideFirstTopBorder || props.hideLastBottomBorder || props.hideSideBorders)) {
    throw new Error("Fatal error in NckList: your list has rounded border corners, which forbid hiding any border.");
  }
});

function castEntryRowUniqueValue(entry: Data): string {
  return JSON.stringify(entry[props.rowUniqueKey]);
}
</script>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";

ul.nck-list.nck-style {
  list-style: none;
  margin: 0;
  padding: 0;
  &.hide-first-top-border {
    .nck-list-item-container:first-child {
      border-top: none;
    }
  }

  &.hide-last-bottom-border {
    .nck-list-item-container:last-child {
      border-bottom: none;
    }
  }

  &.rounded-corners .nck-list-item-container {
    &:first-child {
      &,
      .nck-list-item {
        border-top-left-radius: var(--nck-radius-m);
        border-top-right-radius: var(--nck-radius-m);
      }
    }
    &:last-child {
      &,
      .nck-list-item {
        border-bottom-left-radius: var(--nck-radius-m);
        border-bottom-right-radius: var(--nck-radius-m);
      }
    }
  }

  .nck-list-item-container {
    border: var(--nck-border-width-s) solid var(--nck-border-neutral);
    outline: none;

    &.no-side-border {
      border-right: none;
      border-left: none;
    }
  }

  .nck-list-item-container + .nck-list-item-container {
    border-top: none;
  }

  .nck-list-item {
    padding: 1rem;
    position: relative;
    background-color: var(--white);

    &.clickable {
      cursor: pointer;

      &:hover {
        background-color: var(--bright-blue-100);
      }

      &.pressed {
        background-color: var(--white);
      }
    }

    .warning-area {
      height: 0;
      width: 0;
      position: absolute;
      right: 0;
      top: 0;
      border-top: 1rem solid var(--orange-300);
      border-left: 1rem solid transparent;
    }
  }
}
</style>

<docs>
A standard list with nothing special
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

<nck-list :data="data" rowUniqueKey="name">
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

You can add a warning to highlight a row.
Note that if you have a warning you MUST provide an alternative text for it.
It allows assistive technology to highlight to the user the warning.
Warning can either be a field name or a function.
Warning mark will appear if expression evaluates to a truthy value.
```js
const data = [
  { name: "Jane", age: 36, someField: false },
  { name: "Joe", age: 48, someField: true },
  { name: "Caligula", age: 2084, someField: 1}
];

<nck-list :data="data" rowUniqueKey="name" hasWarningSource="someField"
          warningAlternative="Warning!!!">
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

As mentionned in the previous example, warning mark presencee can also be determined
with a function for more advanced behavior.
```js
const data = [
  { name: "Jane", age: 36, someField: false },
  { name: "Joe", age: 48, someField: true },
  { name: "Caligula", age: 2084, someField: 1}
];

function displayWarning(entry) {
  return entry.name.indexOf("J") === 0;
}

<nck-list :data="data" rowUniqueKey="name" :hasWarningSource="displayWarning"
          warningAlternative="Warning!!!">
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

A list with rows that display a popup when clicked.
Type is "button" so it can be activated also with space and enter when focused.
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

function displayName(entry) {
  alert("Hello " + entry.name);
}

<nck-list :data="data" rowUniqueKey="name"
  @row-clicked="displayName" rowAriaRole="button">
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

You can hide the side borders
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

<nck-list :data="data" rowUniqueKey="name"
  hideSideBorders>
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

You can also hide the first top border. For instance,
when used along with another component that already has a
border.
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

<nck-list :data="data" rowUniqueKey="name"
  hideFirstTopBorder>
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

You can also hide the last bottom border
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

<nck-list :data="data" rowUniqueKey="name"
  hideLastBottomBorder>
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```

The list can be displayed with rounded corners.
However, with this option, you're not allowed to hide any border.
```jsx
const data = [
  { name: "Jane", age: 36 },
  { name: "Joe", age: 48 },
  { name: "Caligula", age: 2084}
];

<nck-list :data="data" rowUniqueKey="name"
  hasRoundedCorners>
  <template v-slot="row">
    {{row.name}} (age: <i>{{row.age}}</i>)
  </template>
</nck-list>
```
</docs>
