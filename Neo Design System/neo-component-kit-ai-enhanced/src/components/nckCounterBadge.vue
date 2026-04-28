<template>
  <div
    v-if="!errored"
    class="nck-style nck-internal nck-base-badge nck-counter-badge"
    :class="badgeClasses"
    v-text="displayedNumber"
  />
</template>

<style lang="less" scoped>
.nck-style.nck-counter-badge {
  &.nck-counter-badge-xs {
    padding: 0.0625rem 0.125rem;
    min-width: 0.75rem;
  }
  &.nck-counter-badge-s {
    padding: 0.125rem 0.1875rem;
    min-width: 0.875rem;
  }
  &.nck-counter-badge-m {
    padding: 0.1875rem 0.3125rem;
    min-width: 1rem;
  }
  &.nck-counter-badge-l {
    padding: 0.3125rem 0.375rem;
    min-width: 1.25rem;
  }
}
</style>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { Colors } from "@/constants/colors";
import { CounterBadgeSize } from "@/constants/counterBadgeSize";

/**
 * @component
 * @displayName nck-counter-badge
 * A badge to display numbers.
 *
 * Note that the display is currently limited at 99 and will display 99+ if more.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = defineProps({
  /**
   * Number to display, maximum is 99, and will display 99+ instead of a superior number. It has to be an integer >= 0.
   */
  entry: {
    required: true,
    type: Number,
  },

  /**
   * Font color of the badge. See possible values in [Colors section](#colors).
   */
  fontColor: {
    type: String as PropType<Colors>,
    default: Colors.WHITE,
    validator: (val: Colors) => Object.values(Colors).includes(val) || val === undefined,
  },

  /**
   * Background color of the badge. See possible values in [Colors section](#colors).
   */
  backgroundColor: {
    type: String as PropType<Colors>,
    default: Colors.BRIGHT_BLUE_300,
    validator: (val: Colors) => Object.values(Colors).includes(val) || val === undefined,
  },

  /**
   * To add a "+" prefix in front of the number.
   *
   * Note that if the number is above 99 it will display "+99"
   */
  plusPrefix: { type: Boolean, default: false },

  /**
   * Size at which the badge should be rendered.
   * Accepted values are the [CounterBadgeSize](#counterbadgesize) enum values
   * @values CounterBadgeSize enum values.
   */
  size: {
    type: String as PropType<CounterBadgeSize>,
    validator: (val: CounterBadgeSize) => Object.values(CounterBadgeSize).includes(val),
    default: CounterBadgeSize.L,
  },
});

const MAX_NUMBER = 99;
const errored = ref(false);

const displayedNumber = computed(() => {
  if (props.plusPrefix) {
    return `+${props.entry > MAX_NUMBER ? "99" : props.entry}`;
  }
  return props.entry > MAX_NUMBER ? "99+" : props.entry;
});

const badgeClasses = computed(() => {
  return [
    `nck-counter-badge-${props.size}`,
    `font-color-${props.fontColor}`,
    `background-color-${props.backgroundColor}`,
  ];
});

if (props.entry < 0 || !Number.isInteger(props.entry)) {
  errored.value = true;
  throw new Error(`Error in NckCounterBadge. ${props.entry} is invalid. Entry should be a positive integer.`);
}
</script>

<docs>
A simple counter badge with the default colors
```jsx
<nck-counter-badge :entry="2" ></nck-counter-badge>
```

A counter badge that displays a number above 99
```jsx
<nck-counter-badge :entry="123"></nck-counter-badge>
```

A counter badge with a plus prefix
```jsx
<nck-counter-badge :entry="42" plusPrefix></nck-counter-badge>
```

You can customize background color
```jsx
<nck-counter-badge :entry="10" :backgroundColor="Colors.RED_300"></nck-counter-badge>
```

You can also customize font color
```jsx
<nck-counter-badge :entry="99" :fontColor="Colors.INK_70"></nck-counter-badge>
```

The counter badge sizes are XS, S, M, L (Default).
```jsx
<nck-counter-badge :entry="2" :size="CounterBadgeSize.XS" ></nck-counter-badge>
<nck-counter-badge :entry="2" :size="CounterBadgeSize.S" ></nck-counter-badge>
<nck-counter-badge :entry="2" :size="CounterBadgeSize.M" ></nck-counter-badge>
<nck-counter-badge :entry="2" :size="CounterBadgeSize.L" ></nck-counter-badge>
```
</docs>
