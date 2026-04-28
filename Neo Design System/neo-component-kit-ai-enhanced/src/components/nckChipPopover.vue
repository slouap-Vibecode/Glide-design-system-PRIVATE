<template>
  <div
    v-if="label !== '' && !(active && !clearIconAltText)"
    class="nck-style nck-internal nck-chip-popover"
    :class="{
      'fullwidth-popover': popoverSize === PopoverSize.FULL_WIDTH,
      'fluidwidth-popover': popoverSize === PopoverSize.FLUID_WIDTH,
    }"
  >
    <NckChip
      ref="chip"
      :label="label"
      :active="active"
      :clearIconAltText="clearIconAltText"
      :disabled="disabled"
      :leftIconName="leftIconName"
      :rightIconName="modelValue ? 'up' : 'down'"
      :trailingCounterValue="isValidTrailingCounterValue ? trailingCounterValue : undefined"
      @chip-clicked="updateValue(!modelValue)"
      @[chipClearEvent]="emitChipClear"
    />
    <NckPopover
      ref="popover"
      :id="popoverId"
      class="nck-popover-container"
      :displayed="modelValue"
      :headerVisible="headerVisible"
      :max-height="popoverMaxHeight"
      :size="popoverSize"
      :title="title"
      :triggerElement="popoverTriggerElement"
      :placement="positionMapping[menuPosition]"
      :class="{
        'top-right': menuPosition === MenuPosition.TOP_RIGHT && !triggerToSyncPositionWith,
        'bottom-right': menuPosition === MenuPosition.BOTTOM_RIGHT && !triggerToSyncPositionWith,
        'top-left': menuPosition === MenuPosition.TOP_LEFT && !triggerToSyncPositionWith,
        'above-inputs-and-buttons': !!triggerToSyncPositionWith,
      }"
      :triggerToSyncPositionWith="triggerToSyncPositionWith"
      @hide-popover="onHidePopover"
    >
      <template v-if="hasBodySlot" #popover-body>
        <!-- @slot Content for the body of the popover -->
        <slot name="popover-body" />
      </template>
      <template v-if="hasFooterSlot" #popover-footer>
        <!-- @slot Content for the footer of the popover -->
        <slot name="popover-footer" />
      </template>
    </NckPopover>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/popoverVariables.less";
@popover-absolute-offset: @popover-chip-size + @popover-margin + 0.125rem;

.nck-style.nck-internal.nck-chip-popover {
  display: inline-block;
  position: relative;

  .nck-popover-container {
    width: auto;

    &.bottom-right {
      right: 0;
    }
    &.top-left {
      bottom: @popover-absolute-offset;
    }
    &.top-right {
      bottom: @popover-absolute-offset;
      right: 0;
    }
    &.above-inputs-and-buttons {
      z-index: 3;
    }
  }

  &.fullwidth-popover {
    position: relative;

    .nck-popover-container {
      width: 100%;
    }
  }

  &.fluidwidth-popover .nck-popover-container {
    width: max-content;
  }
}
</style>

<script setup lang="ts">
import NckChip from "./nckChip.vue";
import NckPopover from "./nckPopover.vue";
import { MenuPosition } from "../constants/menuPosition";
import { PopoverSize } from "../constants/popoverSize";
import { AccessibilityHelper } from "../helpers/accessibilityHelper";
import { computed, onMounted, PropType, ref, useSlots, watch } from "vue";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";
import { Placement } from "@floating-ui/dom";

/**
 * @component
 * @displayName nck-chip-popover
 * Chip component which triggers a popover.
 *
 * This component implements the `INckChipPopover` interface.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): close
 */

const props = defineProps({
  /**
   * It's "true" if the popover is open. This component supports "v-model" pattern.
   */
  modelValue: { required: true, type: Boolean },

  /**
   * Label of the chip. Note that even if it is hidden a label is needed for
   * screenreaders. So never ever put an empty string.
   */
  label: { type: String, required: true },

  /**
   * Boolean that says if the chip is activated or not.
   */
  active: { type: Boolean, default: false },

  /**
   * Alternative text for the clearable icon.
   * An error will be thrown if the chip is active without clearIconAltText.
   */
  clearIconAltText: { type: String, default: "" },

  /**
   * Disable the chip.
   */
  disabled: { type: Boolean, default: false },

  /**
   * Whether the popover header is displayed or not.
   */
  headerVisible: { type: Boolean, default: false },

  /**
   * Name of an optional icon to display on the left.
   */
  leftIconName: { type: String, default: "" },

  /**
   * Max height of the popover body in 'rem'.
   */
  popoverMaxHeight: { type: Number, default: 20.75 },

  /**
   * Title of the popover.
   * By default it takes the same value as chip label.
   * When headerVisible is false, this title won't be display.
   */
  popoverTitle: { type: String },

  /**
   * Governs the width of the Popover.
   *
   * Accepts one of the [PopoverSize](#popoversize) values.
   *
   * When:
   *
   * - popoverSize = FULL_WIDTH, Popover width = Chip width
   *
   * - popoverSize = FLUID_WIDTH, Popover expands in width as much (or as less) as required to fit its own content and prevent content wrapping and cropping. Popover could be tighter, equal or wider than the Chip depending on the width of its own content
   *
   * - popoverSize = M, L or XL, Popover respects a set size, independent from Chip width & Popover content
   *
   * WARTNING: Please note that PopoverSize will strictly respect above width specifications even when this would make the Popover overflow the viewport size and/or cross viewport border,
   * which is fairly risky for instance:
   *
   * - at small width resolution (Phone-like)
   *
   * - in verbose languages
   *
   * - when displaying a Chip on the right of the page with a possibly wide & left aligned Popover
   *
   * - when user increases default font size (to accomodate vision impairment or for personal preferences)
   *
   * Risk of unwanted page horizontal scroll or invisible overflowing content should be anticipated.
   * Full width popover size is the least risky in that regard since Popover (not in document flow) will always be the same as Chip width (in document flow),
   * allowing for predictability of Popover width but less liberty in Popover visual aspect.
   */
  popoverSize: {
    type: String as PropType<PopoverSize>,
    validator: (val: PopoverSize) => Object.values(PopoverSize).includes(val),
    default: PopoverSize.FULL_WIDTH,
  },

  /**
   * A counter badge value to be displayed on the right side of the chip. It has to be an integer >= 0.
   */
  trailingCounterValue: { type: Number },

  /**
   * Position of the popover.
   * Accepts one of the [MenuPosition](#menuposition)
   */
  menuPosition: {
    type: String as PropType<MenuPosition>,
    validator: (value: MenuPosition) => Object.values(MenuPosition).includes(value),
    default: MenuPosition.BOTTOM_LEFT,
  },

  /**
   * Useful in modals, sets popover as position fixed and computes its coordinates in javascript instead of css.
   * Use this wisely as is it will impact your performances.
   *
   * Accessibility limitation: when this property is used and browser default font size is changed after page loading, the position of the dropdown menu will be wrong.
   * This problem does not occur when the browser font size is customized before initial page rendering.
   * This is a defect but considered as minor because a user requiring custom browser default font size will probably not fiddle constantly with this browser-wide setting after page load but set it once and for all.
   */
  ignoreParentOverflow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  /**
   * Emitted when value is changed.
   * This component supports "v-model" pattern.
   *
   * @param {boolean} value It's "true" if the popover is open
   */
  (event: "update:modelValue", payload: boolean): void;
  /**
   * Emitted when the clear button of an active chip that is not disabled is clicked.
   */
  (event: "chip-cleared"): void;
}>();

const popoverId = AccessibilityHelper.generateId();
const isMounted = ref(false);

const chip = ref<InstanceType<typeof NckChip>>();
const popover = ref<InstanceType<typeof NckPopover>>();

const slots = useSlots();
const attributes = useReactiveAttrs();

const positionMapping: Record<MenuPosition, Placement> = {
  [MenuPosition.BOTTOM_LEFT]: "bottom-start",
  [MenuPosition.BOTTOM_RIGHT]: "bottom-end",
  [MenuPosition.TOP_LEFT]: "top-start",
  [MenuPosition.TOP_RIGHT]: "top-end",
};

const popoverTriggerElement = computed<HTMLElement | undefined>(() => {
  // The getter is getting called too soon, so using this hack allow it to wait for ref to be available
  if (isMounted.value && chip.value) {
    // TODO VFR: access to element via query selector breaks principle of component isolation
    const chipButton = chip.value.$el.querySelector(
      // for some reason TypeScript doesn't get the Vue3Instance as ComponentPublicInstance
      "button.button-label",
    );

    if (chipButton instanceof HTMLElement) {
      chipButton.setAttribute("aria-expanded", props.modelValue.toString());
      chipButton.setAttribute("aria-controls", popoverId);

      return chipButton;
    }
  }

  return undefined;
});

const triggerToSyncPositionWith = computed<HTMLElement | null>(() => {
  return props.ignoreParentOverflow && popoverTriggerElement.value ? popoverTriggerElement.value : null;
});

const chipClearEvent = computed<string | null>(() => {
  return props.active ? "chip-cleared" : null;
});

const title = computed<string>(() => {
  return props.popoverTitle ?? props.label;
});

const isValidTrailingCounterValue = computed<boolean>(() => {
  return (
    Number.isInteger(props.trailingCounterValue) &&
    Boolean(props.trailingCounterValue && props.trailingCounterValue >= 0)
  );
});

const hasFooterSlot = computed(() => {
  return Boolean(slots["popover-footer"]?.());
});

const hasBodySlot = computed(() => {
  return Boolean(slots["popover-body"]?.());
});

function updateAriaExpanded(): void {
  popoverTriggerElement.value?.setAttribute("aria-expanded", props.modelValue.toString());
}

function emitChipClear(): void {
  emit("chip-cleared");
}

function onHidePopover(): void {
  // There was a bug when the popover is open and you click on the chip again, we expect the popover to be closed but actually this event will be triggered first (because it detects that we click outside of the popover) then the click on the chip will switch it back to open. So for a workaround, we force this event to wait a little bit.
  setTimeout(() => {
    updateValue(false);
  }, 100);
}

onMounted(() => {
  if (!slots["popover-body"]) {
    throw new Error("Error in NckChipPopover: 'popover-body' slot cannot be empty.");
  }

  isMounted.value = true;
});

function checkEmptyStringLabel(): void {
  if (props.label === "") {
    throw new Error("Error in NckChipPopover: 'label' cannot be an empty string.");
  }
}

function checkChipClearedWhenActive(): void {
  if (props.active) {
    if (!attributes.value.onChipCleared) {
      throw new Error("Error in NckChipPopover: if you set 'active' option, you should provide '@chip-cleared'.");
    }

    if (!props.clearIconAltText) {
      throw new Error(
        "Error in NckChipPopover: if you set 'active' option, you should provide a non-empty 'clearIconAltText'.",
      );
    }
  }
}

function checkTrailingCounterValue(): void {
  if (props.trailingCounterValue !== undefined && !isValidTrailingCounterValue.value) {
    throw new Error(
      `Error in NckChipPopover: trailing-counter-value should be an integer >= 0 (${props.trailingCounterValue} is invalid)`,
    );
  }
}

function updateValue(newValue: boolean): void {
  emit("update:modelValue", newValue);
  if (newValue) {
    popover.value?.focus();
  }
}

function focus() {
  if (chip.value) {
    chip.value.focus();
  }
}

defineExpose({
  focus,
});

watch(() => props.label, checkEmptyStringLabel, { immediate: true });
watch(() => props.trailingCounterValue, checkTrailingCounterValue, { immediate: true });
watch(() => props.active, checkChipClearedWhenActive, { immediate: true });
watch(() => props.modelValue, updateAriaExpanded);
</script>

<docs>
A simple chip popover
```jsx
const data = { open: false };

<nck-chip-popover v-model="data.open" label="Click me to trigger the popover">
  <template #popover-body>Tada!</template>
</nck-chip-popover>
```

A chip popover with active state
```jsx
const data = { open: false, active: true };

<nck-chip-popover v-model="data.open" label="This chip popover is active" :active="data.active" clear-icon-alt-text="Clear state" popover-size="medium" @chip-cleared="data.active = false">
  <template #popover-body><button @click="data.active = true">Turn me on</button></template>
</nck-chip-popover>
```

A disabled chip popover
```jsx
const data = { open: false };

<nck-chip-popover v-model="data.open" label="This chip popover is disabled" disabled>
  <template #popover-body>You can't see me</template>
</nck-chip-popover>
```

A chip popover with an icon on the left
```jsx
const data = { open: false };

<nck-chip-popover v-model="data.open" label="This chip popover has an icon on the left" left-icon-name="search" popover-size="large">
  <template #popover-body>Now you see me</template>
</nck-chip-popover>
```

A chip popover with popover header
```jsx
const data = { open: false };

<nck-chip-popover v-model="data.open" label="My popover has a header" header-visible popover-size="x-large" popover-title="Header">
  <template #popover-body>Look, I have a header</template>
</nck-chip-popover>
```

A chip popover with popover footer
```jsx
const data = { open: false };

<nck-chip-popover v-model="data.open" label="My popover has a footer" popover-size="fluid-width">
  <template #popover-body>Look, I have a footer</template>
  <template #popover-footer><button @click="data.open = false">Close</button></template>
</nck-chip-popover>
```

A chip popover with counter badge
```jsx
const data = { open: false, counter: 0 };

<nck-chip-popover v-model="data.open" label="You can count on me" popover-size="medium" :trailing-counter-value="data.counter > 1 ? data.counter : undefined" :active="data.counter > 0" clear-icon-alt-text="Clear counter" @chip-cleared="data.counter = 0">
  <template #popover-body><button @click="data.counter++">Add</button></template>
</nck-chip-popover>
```

Popover size (width) can be either a set width or depend on some conditions:
```jsx
const data1 = { open: false };
const data2 = { open: false };
const data3 = { open: false };
const data4 = { open: false };
const data5 = { open: false };

<nck-chip-popover v-model="data1.open" label="M Popover" popover-size="medium">
  <template #popover-body>Popover respects a set Medium size, independent from Chip width & Popover content</template>
</nck-chip-popover>
<nck-chip-popover v-model="data2.open" label="L Popover" popover-size="large">
  <template #popover-body>Popover respects a set Large size, independent from Chip width & Popover content</template>
</nck-chip-popover>
<nck-chip-popover v-model="data3.open" label="XL Popover" popover-size="x-large">
  <template #popover-body>Popover respects a set Extra Large size, independent from Chip width & Popover content</template>
</nck-chip-popover>
<nck-chip-popover v-model="data4.open" label="Fluid width Popover" popover-size="fluid-width">
  <template #popover-body>The Popover width adapts to the Popover content size to avoid text wrapping and content cropping</template>
</nck-chip-popover>
<nck-chip-popover v-model="data5.open" label="Full width Popover" popover-size="full-width">
  <template #popover-body>Whatever the popover content size, this popover will have the same width as its trigerring Chip</template>
</nck-chip-popover>
```

A chip popover with positioning
```jsx
const data1 = { open: false };
const data2 = { open: false };
const data3 = { open: false };
const data4 = { open: false };

<nck-chip-popover v-model="data1.open" label="My popover is positionned at my BOTTOM_LEFT" :menuPosition="MenuPosition.BOTTOM_LEFT">
  <template #popover-body>Now you see me</template>
</nck-chip-popover>
<br/><br/>
<nck-chip-popover v-model="data2.open" label="My popover is positionned at my BOTTOM_RIGHT" :menuPosition="MenuPosition.BOTTOM_RIGHT">
  <template #popover-body>Now you see me</template>
</nck-chip-popover>
<br/><br/>
<nck-chip-popover v-model="data3.open" label="My popover is positionned at my TOP_LEFT" :menuPosition="MenuPosition.TOP_LEFT">
  <template #popover-body>Now you see me</template>
</nck-chip-popover>
<br/><br/>
<nck-chip-popover v-model="data4.open" label="My popover is positionned at my TOP_RIGHT" :menuPosition="MenuPosition.TOP_RIGHT">
  <template #popover-body>Now you see me</template>
</nck-chip-popover>
<br/><br/>
```
</docs>
