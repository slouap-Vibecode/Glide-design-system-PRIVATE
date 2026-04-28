<template>
  <div
    class="nck-popover-wrapper"
    :class="{
      visible: displayed,
      fixed: !!triggerToSyncPositionWith,
    }"
    ref="rootElement"
  >
    <div
      class="nck-popover nck-style nck-internal"
      @keydown.esc="emitPopoverDismissed"
      @keydown.tab="emitPopoverTab"
      :class="[{ visible: displayed }, 'nck-popover-' + size]"
      :style="{
        'max-height': maxHeight + 'rem',
      }"
      tabindex="-1"
      ref="popover"
      :aria-hidden="!displayed"
      v-bind="optionalAttributes"
    >
      <div v-if="headerVisible" class="nck-popover-header">
        <h1 class="header-3">{{ title }}</h1>
        <button type="button" @click="emitCloseClicked" class="nck-popover-close outside-focus">
          <nck-icon
            iconName="close"
            :iconSize="IconSize.S"
            :primaryColor="IconColors.BLUE_GREY_600"
            :iconAltText="closeWording"
          />
        </button>
      </div>
      <div v-if="hasBodySlot" class="nck-popover-body">
        <!-- @slot A container for the body of the popover. -->
        <slot name="popover-body"></slot>
      </div>
      <div v-if="hasFooterSlot" class="nck-popover-footer">
        <!-- @slot A container for a footer of the popover, if needed. -->
        <slot name="popover-footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/sizeVariables.less";
@import (reference) "../styles/popoverVariables.less";

/* ie11 hack to have scroll on flex body */
/* from https://github.com/philipwalton/flexbugs/issues/216 */
.nck-popover-wrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  pointer-events: none;
  &.visible {
    pointer-events: auto;
  }

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  &.fixed:not(.visible) {
    height: 0;
    overflow: hidden;
  }
}

.nck-style.nck-popover {
  display: flex;
  flex-direction: column;
  border-radius: var(--nck-radius-m);
  box-shadow: var(--box-shadow-level-5);
  background: var(--white);
  transition:
    opacity var(--nck-duration-400) var(--nck-easing-out),
    margin-top var(--nck-duration-400) var(--nck-easing-out);
  visibility: hidden;
  z-index: 1060;
  opacity: 0;
  color: var(--ink-100);
  outline: none;
  &.visible {
    opacity: 1;
    margin-top: @popover-margin;
    visibility: visible;
  }
  &.nck-popover-medium {
    width: 20rem;
  }
  &.nck-popover-large {
    width: 25rem;
  }
  &.nck-popover-x-large {
    width: 32rem;
  }
  &.nck-popover-full-width {
    width: 100%;
  }
  &.nck-popover-fluid-width {
    width: auto;
  }
  .nck-popover-header {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    h1 {
      flex: 1 1 0rem;
      margin: 0;
      hyphens: auto;
      overflow-wrap: break-word;
      overflow: auto;
    }
    .nck-popover-close {
      display: flex;
      flex: 0 0 auto;
      padding: 0.625rem;
      margin: -0.625rem -0.625rem -0.625rem 0.375rem;
      border: 0;
      background: transparent;
    }
  }
  .nck-popover-body {
    display: flex;
    overflow: auto;
    flex: 1 1 auto;
    margin: 0;
  }
  .nck-popover-footer {
    flex: 0 0 auto;
    border-top: var(--nck-border-width-s) solid var(--nck-border-neutral);
    padding: var(--nck-spacing-m);
  }
}
</style>

<script lang="ts" setup>
import { computePosition, autoUpdate } from "@floating-ui/dom";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import NckIcon from "./nckIcon.vue";
import { IconSize } from "../constants/iconSize";
import { PopoverHidingEventType } from "../constants/popoverHidingEventType";
import { PopoverSize } from "../constants/popoverSize";
import { IconColors } from "../constants/iconColors";
import { pxToRemUnit } from "@/helpers/fontHelper";
import { DomHelper } from "@/helpers/domHelper";
import {
  ComponentPublicInstance,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  useSlots,
  watch,
} from "vue";

/**
 * @component
 * @displayName nck-popover
 * The skeleton for the popover component.
 * Popovers are small content containers that provide a contextual overlay.
 * They can be used as in-context feature explanations or dropdowns for example.
 *
 * This component implements the `INckPopover` interface.
 *
 * PREREQUISITES:
 *
 * - [translations](#translations): close (required if you set `headerVisible` to true)
 */

const props = defineProps({
  /**
   * Whether the popover is displayed or not.
   */
  displayed: { default: false, type: Boolean },

  /**
   * Whether the popover has a role of region or not.
   */
  hasRegionRole: { default: false, type: Boolean },

  /**
   * Whether the popover header is displayed or not.
   */
  headerVisible: { default: false, type: Boolean },

  /**
   * Max height of the popover body in 'rem'.
   */
  maxHeight: { default: 20.75, type: Number },

  /**
   * Enum for popover width (medium, large, x-large, full-width, fluid-width).
   *
   * Accepts one of the [PopoverSize](#popoversize) value.
   */
  size: {
    type: String as PropType<PopoverSize>,
    validator: (val: PopoverSize) => Object.values(PopoverSize).includes(val),
    default: PopoverSize.FULL_WIDTH,
  },

  /**
   * Element triggering the opening of the popover.
   * This element must be focusable.
   */
  triggerElement: { type: HTMLElement, default: null },

  /**
   * @ignore internal use only
   * Sync popover position with this Element
   */
  triggerToSyncPositionWith: {
    type: HTMLElement as PropType<ComponentPublicInstance | HTMLElement | null>,
    default: null,
  },

  /**
   * @ignore
   * Popover placement relative to its trigger
   */
  placement: {
    type: String as PropType<
      | "top-start"
      | "top-end"
      | "right-start"
      | "right-end"
      | "bottom-start"
      | "bottom-end"
      | "left-start"
      | "left-end"
      | "top"
      | "right"
      | "bottom"
      | "left"
    >,
    default: "bottom",
  },

  /**
   * Title of the popover.
   * Required when the popover has a region role.
   * When headerVisible is false, this title won't be display.
   */
  title: { type: String },
});

const emit = defineEmits<{
  /**
   * hide the popover, emit event "hide-popover".
   */
  (event: "hide-popover", eventType: PopoverHidingEventType): void;
}>();

/**
 * Click listener for click outside of the popover,
 * function handler is handleMousedownListener.
 */
let mousedownListener: ((event: MouseEvent) => void) | null = null;

let clickListener: ((event: MouseEvent) => void) | null = null;

/**
 * When using floating ui, don't forget to destroy instance
 */
let floatingUICleanup: (() => void) | null = null;

const isMousedownOutsidePopover = ref<boolean>(false);

const popover = ref<HTMLElement | null>(null);
const rootElement = ref<HTMLElement | null>(null);

function focus() {
  void nextTick(() => {
    if (props.displayed) {
      popover.value?.focus();
    }
  });
}

defineExpose({
  /**
   * Focuses the popover
   */
  focus,
});

const slots = useSlots();
const hasFooterSlot = computed(() => {
  return Boolean(slots["popover-footer"]?.());
});

const hasBodySlot = computed(() => {
  return Boolean(slots["popover-body"]?.());
});

const optionalAttributes = computed(() => {
  if (props.hasRegionRole) {
    return {
      role: "region",
      "aria-label": props.title,
    };
  }

  return {};
});

/**
 * translation of the close icon.
 */
const closeWording = computed(() => {
  const optionsProvider = GlobalOptionsProvider.getInstance();
  return optionsProvider.getOptions()?.translations?.close ?? "";
});

function setupFloatingUi() {
  if (floatingUICleanup) {
    floatingUICleanup();
  }

  if (!rootElement.value || !props.triggerToSyncPositionWith) {
    return;
  }

  const trigger =
    props.triggerToSyncPositionWith instanceof HTMLElement
      ? props.triggerToSyncPositionWith
      : (props.triggerToSyncPositionWith.$el as HTMLElement);
  const popover = rootElement.value;

  const cleanup = autoUpdate(trigger, popover, () => updatePopoverPosition(trigger, popover));

  updatePopoverPosition(trigger, popover);
  floatingUICleanup = cleanup;
}

onMounted(() => {
  handleMousedownListener();
});

const optionsProvider = GlobalOptionsProvider.getInstance();
if (props.headerVisible && !optionsProvider.getOptions()?.translations?.close) {
  throw new Error(
    "Error in NckPopover: you must provide translations options to the neo-component-kit library." +
      " Requires 'close'",
  );
}

if (props.hasRegionRole && !props.title) {
  throw new Error("Error in NckPopover: if you set 'hasRegionRole' option, you need" + " to provide 'title'.");
}

function isEventOutsidePopover(event: MouseEvent) {
  const eventTarget = event.target;
  if (eventTarget instanceof Element) {
    return !event.composedPath().some((el) => el instanceof Element && el.closest(".nck-popover"));
  }
  return true;
}

/**
 * handler of the mousedown listener,
 * hide popover if the mousedown is outside.
 */
function handleMousedownListener() {
  mousedownListener = (event: MouseEvent) => {
    if (props.displayed) {
      isMousedownOutsidePopover.value = isEventOutsidePopover(event);
    }
  };
  clickListener = (event: MouseEvent) => {
    if (props.displayed && isMousedownOutsidePopover.value) {
      if (isEventOutsidePopover(event)) {
        hidePopover(PopoverHidingEventType.CLICK_OUTSIDE);
      }
    }
  };
  document.addEventListener("mousedown", mousedownListener, true);
  document.addEventListener("click", clickListener, true);
}

/**
 * function raised when the user click on the close icon.
 */
function emitCloseClicked() {
  hidePopover(PopoverHidingEventType.CLOSE);
  focusTriggerElement();
}

/**
 * function raised when the user presses the escape key,
 * it hides the popover and focuses the triggering element.
 */
function emitPopoverDismissed($event: KeyboardEvent) {
  $event.preventDefault();
  $event.stopPropagation();
  hidePopover(PopoverHidingEventType.ESCAPE);
  focusTriggerElement();
}

function focusTriggerElement() {
  if (props.triggerElement && props.triggerElement instanceof HTMLElement) {
    props.triggerElement.focus();
  }
}

/**
 * function raised when the user presses the tab key,
 * it hides the popover when popover is blurred.
 */
function emitPopoverTab() {
  setTimeout(() => {
    const activeElement = DomHelper.getActiveElement();
    if (activeElement instanceof HTMLElement) {
      const isInsidePopover = !!activeElement.closest(".nck-popover");
      if (!isInsidePopover) {
        hidePopover(PopoverHidingEventType.BLUR_OUTSIDE);
      }
    }
  }, 0);
}

function hidePopover(eventType: PopoverHidingEventType) {
  if (props.displayed) {
    /**
     * Emitted when the popover is dismissed.
     * This event is not sent when the popover is not displayed.
     * The underlying event type causing this event is available through a [PopoverHidingEventType](#popoverHidingEventType) argument.
     * @param {PopoverHidingEventType} eventType indicates how the popover was hidden.
     */
    emit("hide-popover", eventType);
  }
}

function updatePopoverPosition(trigger: HTMLElement, popover: HTMLElement) {
  computePosition(trigger, popover, {
    placement: props.placement,
    strategy: "fixed",
  })
    .then(({ x, y }) => {
      Object.assign(popover.style, {
        transform: `translate3D(${pxToRemUnit(x)}rem, ${pxToRemUnit(y)}rem, 0)`,
        width: props.size === PopoverSize.FULL_WIDTH ? `${pxToRemUnit(trigger.offsetWidth)}rem` : undefined,
      });
      // satisfies eslint
    })
    .catch(() => {});
}

/**
 * remove the mousedown listenner on destroy.
 */
onUnmounted(() => {
  if (mousedownListener) {
    document.removeEventListener("mousedown", mousedownListener, true);
  }
  if (floatingUICleanup) {
    floatingUICleanup();
  }
});

watch(() => props.triggerToSyncPositionWith, setupFloatingUi);
</script>

<docs>
The popover component is a small content container that provides a contextual overlay.

The first prop that we will talk about is the title.
When hasRegionRole is true, the title is mandatory for the aria-label of the popover.
Indeed, every element with a region role should include a label that describes the purpose of the content in the region.
The region role is used to identify document areas the author deems significant. It is a generic landmark available to aid in navigation when none of the other landmark roles are appropriate.
For the moment, our usages (dropdown, menu opened by chip or autocomplete) do not need this role but it may be interesting to use it in other cases.

The title is also displayed in the header when headerVisible is true.

A popover is hidden by default, if we want to display it, we need to set the displayed prop to true.
On this first example there is no listener on @hide-popover, so the popover is not hidden when the user clicks on close.

```jsx
<div style="position: relative; height: 5rem;">
  <nck-popover title="Hello popover" headerVisible displayed />
</div>
```

A popover has a size prop that controls the width.
For more information check the constant/enum [PopoverSize](#popoversize).
You can also notice that clicking outside the popover will hide it.

```jsx
const exampleData = {
  popoverDisplayed: false
};

<div style="position: relative; height: 7rem;">
  <button @click="exampleData.popoverDisplayed = !exampleData.popoverDisplayed">toggle popover</button>
  <nck-popover
    title="Hello popover"
    headerVisible
    hasRegionRole
    :displayed="exampleData.popoverDisplayed"
    @hide-popover="exampleData.popoverDisplayed=false"
    size="medium"
  />
</div>
```

The PopoverSize.FLUID_WIDTH size offers a way let the popover adapt to the width of its content.

```jsx
const exampleData = {
  popoverDisplayed: false
};

<div style="position: relative; height: 7rem;">
  <button @click="exampleData.popoverDisplayed = !exampleData.popoverDisplayed">toggle popover</button>
  <nck-popover
    :displayed="exampleData.popoverDisplayed"
    size="fluid-width">
    <template v-slot:popover-body>
      Proident exercitation et pariatur anim sit lab.
    </template>
  </nck-popover>
</div>
```

In the next example you can see the usage of the maxHeight property, body slot and footer slot.
We can also see that when headerVisible is not set, the header is not displayed.

```jsx
<div style="position: relative; height: 10rem;">
  <nck-popover
    title="Hello popover"
    displayed
    size="medium"
    :maxHeight="10"
  >
  <template v-slot:popover-body>
    Proident exercitation et pariatur anim sit laborum magna ipsum commodo occaecat reprehenderit. Fugiat qui reprehenderit cupidatat reprehenderit sunt. Est dolore culpa dolor aliquip est eiusmod laboris veniam dolor consectetur exercitation non. Ea dolore laboris adipisicing ipsum occaecat ex labore nulla dolor exercitation.
  </template>
  <template v-slot:popover-footer>
    footer content
  </template>
  </nck-popover>
</div>
```

By default the popover is not focused at opening, it's the responsability of the consumer to focus the popover.
When you create a popover, you can provide a triggerElement, this element will be focused when the popover is dismissed (on press escape inside the popover).

When the focus is in the popover, on press the tab key, you will navigate through the popover focusable elements, if you're not anymore in the popover, the component will emit a hide-popover event.
</docs>
