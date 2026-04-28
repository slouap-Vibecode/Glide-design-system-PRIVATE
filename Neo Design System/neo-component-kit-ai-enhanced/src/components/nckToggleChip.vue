<template>
  <NckChip
    :label="label"
    :active="modelValue"
    :disabled="disabled"
    ref="chip"
    :invalid="invalid"
    :leftIconName="leftIconName || defaultLeftIcon"
    :rightIconName="iconMode === 'button' && modelValue ? 'close' : ''"
    :chipAdditionalAttributes="{
      role: 'checkbox',
      'aria-checked': String(modelValue),
      name: $attrs.name,
      'aria-pressed': null,
      id: `checkbox_${AccessibilityHelper.generateId()}`,
    }"
    @chip-clicked="$emit('update:modelValue', !modelValue)"
  />
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import NckChip from "./nckChip.vue";

/**
 * @component
 * @displayName nck-toggle-chip
 *
 * A toggle chip is a component that behaves like a checkbox and looks like a chip.
 *
 * This component implements the `INckToggleChip` interface.
 *
 * REQUIRED TRANSLATIONS: none.
 */

const props = defineProps({
  /**
   * Label of the toggle chip. Never ever put an empty string.
   */
  label: {
    type: String,
    required: true,
    validator: (value) => value !== "",
  },

  /**
   * Value of the toggle chip. This component supports "v-model" pattern.
   */
  modelValue: {
    type: Boolean,
    required: true,
  },

  /**
   * Name of an icon (icons come from the Neo Icon Kit). Will be displayed on the left of the label.
   */
  leftIconName: {
    type: String,
    default: "",
  },

  /**
   * Boolean that says if the toggle chip is disabled or not.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * How the icons of the chip should display.
   *
   * With iconMode=checkbox, `leftIconName` will default as "check" when checked
   */
  iconMode: {
    type: String as PropType<"button" | "checkbox">,
    default: "button",
  },

  /**
   * @ignore
   * Set the chip in invalid mode on style and markup
   */
  invalid: { type: Boolean },
});

defineEmits<{
  /**
   * Emitted when value is changed.
   * This component supports "v-model" pattern.
   *
   * @param {boolean} value the value of the toggle chip.
   */
  (event: "update:modelValue", value: boolean): void;
}>();

const chip = ref<InstanceType<typeof NckChip>>();

function focus() {
  if (chip.value) {
    chip.value.focus();
  }
}

defineExpose({
  focus,
});

const defaultLeftIcon = computed(() => {
  return props.modelValue && props.iconMode === "checkbox" ? "check" : undefined;
});
</script>

<docs>
A simple toggle chip. Unless disabled, a toggle chip is always clickable.

```jsx
let value = false;

<nck-toggle-chip v-model="value" label="I'm a toggle chip" />
```

A toggle chip can be active. When active, it will have a 'close' icon on its right side.

```jsx
let value = true;

<nck-toggle-chip v-model="value" label="I'm an active toggle chip" />
```

A toggle chip can be disabled.

```jsx
let value = false;

<nck-toggle-chip v-model="value" label="I'm a disabled toggle chip" disabled />
```

A toggle chip can have a custom icon, but only on its left side.

```jsx
let value = false;

<nck-toggle-chip v-model="value" label="I'm a toggle chip with a custom icon" leftIconName="paperless" />
```

A toggle chip with checked icon instead of clear icon

```jsx
let value = true;

<nck-toggle-chip v-model="value" label="I'm a toggle chip without clear icon" mode="checkbox" />
```
</docs>
