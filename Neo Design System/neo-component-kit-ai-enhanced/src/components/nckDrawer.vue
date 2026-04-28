<template>
  <div
    class="nck-drawer nck-style nck-internal"
    :class="[{ visible: drawerVisible }, positionClass]"
    ref="drawerContainer"
    @mousedown.prevent="dismissDrawer"
  >
    <div
      class="drawer-container"
      :class="[{ 'no-body-padding': props.noBodyPadding }, positionClass]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @mousedown="$event.stopPropagation()"
    >
      <div class="screenreader-only" tabindex="0" @focus="setFocusAtTheEnd"></div>
      <div class="screenreader-only" tabindex="-1" ref="topFocusTrap"></div>

      <div class="nck-drawer-header">
        <button class="close-icon header-space-balancing-right-button" aria-hidden="true" disabled>
          <nck-icon iconName="close-dark" :iconSize="IconSize.M" iconAltText="" />
        </button>
        <h1 class="nck-drawer-title header-2" :id="titleId">{{ props.drawerTitle }}</h1>
        <button class="close-icon outside-focus" @click="dismissDrawer">
          <nck-icon iconName="close-dark" :iconSize="IconSize.M" :iconAltText="closeWording" />
        </button>
      </div>

      <div class="nck-drawer-body" :class="[positionClass]">
        <!-- @slot Content to set in the body of the drawer. -->
        <slot name="drawer-body"></slot>
      </div>

      <div class="screenreader-only" tabindex="-1" ref="bottomFocusTrap"></div>
      <div class="screenreader-only" tabindex="0" @focus="setFocusAtTheBeginning"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/boxShadowsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/radiusVariables.less";

.nck-drawer.nck-style {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050; /* we take the same as bootstrap to be safe */
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 0;

  &.bottom {
    align-items: flex-end;
  }
  &.top {
    align-items: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }

  animation-name: backdropClosing;
  animation-duration: var(--nck-duration-400);
  animation-timing-function: var(--nck-easing-in);
  &.visible {
    animation-name: backdropOpening;
    animation-duration: var(--nck-duration-400);
    animation-timing-function: var(--nck-easing-out);

    background: var(--nck-surface-modal);
    .drawer-container {
      &.bottom {
        animation-name: drawerOpeningBottom;
        animation-duration: var(--nck-duration-400);
        animation-timing-function: var(--nck-easing-out);
      }
      &.top {
        animation-name: drawerOpeningTop;
        animation-duration: var(--nck-duration-400);
        animation-timing-function: var(--nck-easing-out);
      }
      &.right {
        animation-name: drawerOpeningRight;
        animation-duration: var(--nck-duration-400);
        animation-timing-function: var(--nck-easing-out);
      }
      &.left {
        animation-name: drawerOpeningLeft;
        animation-duration: var(--nck-duration-400);
        animation-timing-function: var(--nck-easing-out);
      }
    }
  }

  /* display */
  .drawer-container {
    position: fixed; // this is important to avoid weird behavior on transition
    background-color: var(--nck-surface-primary);
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;

    &.bottom {
      width: 100%;
      border-radius: var(--nck-radius-m) var(--nck-radius-m) 0 0;
      box-shadow: var(--box-shadow-level-7-top);

      animation-name: drawerClosingBottom;
      animation-duration: var(--nck-duration-400);
      animation-timing-function: var(--nck-easing-in);
      animation-fill-mode: forwards; // keep animation end position to avoid blink
    }
    &.top {
      width: 100%;
      border-radius: 0 0 var(--nck-radius-m) var(--nck-radius-m);
      box-shadow: var(--box-shadow-level-7);

      animation-name: drawerClosingTop;
      animation-duration: var(--nck-duration-400);
      animation-timing-function: var(--nck-easing-in);
      animation-fill-mode: forwards; // keep animation end position to avoid blink
    }
    &.right {
      height: 100%;
      border-radius: var(--nck-radius-m) 0 0 var(--nck-radius-m);
      box-shadow: var(--box-shadow-level-7-left);

      animation-name: drawerClosingRight;
      animation-duration: var(--nck-duration-400);
      animation-timing-function: var(--nck-easing-in);
      animation-fill-mode: forwards; // keep animation end position to avoid blink
    }
    &.left {
      height: 100%;
      border-radius: 0 var(--nck-radius-m) var(--nck-radius-m) 0;
      box-shadow: var(--box-shadow-level-7-right);

      animation-name: drawerClosingLeft;
      animation-duration: var(--nck-duration-400);
      animation-timing-function: var(--nck-easing-in);
      animation-fill-mode: forwards; // keep animation end position to avoid blink
    }

    // hacky way to integrate position fixed children into the "layout flow"
    /**
      * As per MDN (position fixed):
      * The element is removed from the normal document flow, and no space is created for the element in the page layout.
      * It is positioned relative to the initial containing block established by the viewport, except when one of its ancestors has a transform, perspective, or filter property set to something other than none (see the CSS Transforms Spec),
      * or the will-change property is set to transform, in which case that ancestor behaves as the containing block.
    */
    will-change: transform;

    @media @desktop {
      padding: var(--nck-spacing-xl);
    }

    @media @tablet, @phone {
      min-height: auto;
      max-height: 100%;
      padding: var(--nck-spacing-l);

      &.bottom,
      &.top {
        width: 100%;
      }
    }

    &.no-body-padding {
      padding-left: 0;
      padding-right: 0;

      &.top .nck-drawer-header,
      &.bottom .nck-drawer-header {
        @media @desktop and (max-width: 72rem) {
          padding-left: var(--nck-spacing-xl);
          padding-right: var(--nck-spacing-xl);
        }
      }

      &.right .nck-drawer-header,
      &.left .nck-drawer-header {
        @media @desktop {
          padding-left: var(--nck-spacing-xl);
          padding-right: var(--nck-spacing-xl);
        }
      }

      .nck-drawer-header {
        @media @tablet, @phone {
          padding-left: var(--nck-spacing-l);
          padding-right: var(--nck-spacing-l);
        }
      }
    }

    .nck-drawer-header {
      display: flex;
      flex: 0 0 auto;
      align-self: center;
      width: 100%;
      max-width: 72rem;
      color: var(--nck-text-default);
      padding-bottom: var(--nck-spacing-l);

      @media @desktop {
        padding-bottom: var(--nck-spacing-xl);
      }

      .close-icon {
        flex: 0 0 auto;
        border: none;
        background: none;
        color: var(--nck-icon-neutral);

        &.header-space-balancing-right-button {
          display: none;
        }
      }

      .nck-drawer-title {
        flex: 1;
        margin: 0;
        text-align: left;
      }
    }

    .nck-drawer-body {
      flex: 1 1 auto;
      align-self: center;
      overflow: auto;

      &.bottom,
      &.top {
        width: 100%;
        max-width: 72rem;

        @media @desktop {
          min-height: 9rem;
          max-height: 30rem;
        }
      }

      &.right,
      &.left {
        height: 100%;
        width: 100%;

        @media @desktop, @tablet {
          max-width: 28rem;
        }
      }
    }
  }
}

@keyframes drawerOpeningBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes drawerOpeningTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes drawerOpeningRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes drawerOpeningLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerClosingBottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
@keyframes drawerClosingTop {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}
@keyframes drawerClosingRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes drawerClosingLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes backdropOpening {
  from {
    background: transparent;
  }
  to {
    background: var(--nck-surface-modal);
  }
}
@keyframes backdropClosing {
  from {
    background: var(--nck-surface-modal);
  }
  to {
    background: transparent;
  }
}
</style>

<script setup lang="ts">
// Controllers
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ModalService } from "@/controllers/modalService";

// Helpers
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { DomHelper } from "@/helpers/domHelper";

// NCK components
import NckIcon from "./nckIcon.vue";
import { IconSize } from "@/constants/iconSize";
import { DrawerPosition } from "@/constants/drawerPosition";

import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref } from "vue";

/**
 * @component
 * @displayName nck-drawer
 *
 * The skeleton for the drawer component
 * It should be used in conjunction with the ModalService
 * Please refer to the detail guidelines on how to manage modals.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - close
 * - [Icons URL](#icons)
 */

const props = withDefaults(
  defineProps<{
    /**
     * The title of the drawer (also used for accessibility to label the drawer)
     */
    drawerTitle: string;

    /**
     * To remove the padding in the drawer body
     */
    noBodyPadding?: boolean;

    /**
     * From which side of the screen the drawer opens.
     *
     * Accepts one of the [DrawerPosition](#drawerposition) value.
     */
    position?: DrawerPosition;
  }>(),
  {
    position: DrawerPosition.BOTTOM,
  },
);

const drawerContainer = ref<HTMLElement | null>(null);
const topFocusTrap = ref<HTMLElement | null>(null);
const bottomFocusTrap = ref<HTMLElement | null>(null);
const drawerVisible = ref<boolean>(true);
const titleId = `title_${AccessibilityHelper.generateId()}`;
const slideEffectDuration = 250;

const currentInstance = getCurrentInstance()?.proxy;

defineExpose({
  /**
   * @public
   * Close the drawer
   * @param args the parameters to pass back to the drawer promise
   */
  closeDrawer,

  /**
   * @public
   * Dismiss the drawer
   * @param args the parameters to pass back to the drawer promise
   */
  dismissDrawer,

  /**
   * @public
   * Set the focus on the first focusable element of the drawer if any.
   */
  setFocusAtTheBeginning,
});

function closeDrawer(...args: unknown[]) {
  if (currentInstance?.$parent) {
    ModalService.closeSpecificModal(currentInstance?.$parent, ...args);
  }
}

function dismissDrawer(...args: unknown[]) {
  drawerVisible.value = false;
  setTimeout(() => {
    dismissDrawerAfterAnimation(...args);
  }, slideEffectDuration);
}

/* for the focusing of element we don't want to cache
because template can change dynamically.
If you want to cache, please be aware you need to know if it has expired
before focusing the element */
function setFocusAtTheBeginning() {
  focusHiddenElementAtTheBeginning();
  if (drawerContainer.value instanceof HTMLElement) {
    DomHelper.focusNextElement(drawerContainer.value);
  }
}

const closeWording = computed(() => {
  const optionsProvider = GlobalOptionsProvider.getInstance();
  return optionsProvider.getOptions()?.translations?.close ?? "";
});

onBeforeMount(() => {
  const optionsProvider = GlobalOptionsProvider.getInstance();
  if (!optionsProvider.getOptions()?.translations?.close) {
    throw new Error(
      "Error in NckDrawer: you must provide translations options to the neo-component-kit library." +
        " Requires 'close'",
    );
  }
});

onMounted(() => {
  focusHiddenElementAtTheBeginning();
});

const positionClass = computed(() => {
  switch (props.position) {
    case DrawerPosition.TOP:
      return "top";
    case DrawerPosition.RIGHT:
      return "right";
    case DrawerPosition.LEFT:
      return "left";
    case DrawerPosition.BOTTOM:
    default:
      return "bottom";
  }
});

function dismissDrawerAfterAnimation(...args: unknown[]) {
  if (currentInstance?.$parent) {
    ModalService.dismissSpecificModal(currentInstance.$parent, ...args);
  }
}

function focusHiddenElementAtTheBeginning() {
  if (topFocusTrap.value instanceof HTMLElement) {
    void nextTick().then(() => {
      topFocusTrap.value?.focus();
    });
  }
}

function focusEndOfDrawer() {
  if (bottomFocusTrap.value instanceof HTMLElement) {
    bottomFocusTrap.value.focus();
  }
}

function setFocusAtTheEnd() {
  focusEndOfDrawer();
  if (drawerContainer.value instanceof HTMLElement) {
    DomHelper.focusPreviousElement(drawerContainer.value);
  }
}
</script>

<docs>
To launch your own drawer, first create your own drawer by using the NckDrawer as base

```jsx static
<template>
  <nck-drawer :drawerTitle="'My drawer title'">
    <template #drawer-body>
      Here you can set whatever you like.
    </template>
  </nck-drawer>
</template>

<script setup lang="ts">
import { NckDrawer, ModalService } from "@neotechnologygroup/neo-component-kit";

function dismissTheDrawer() {
  ModalService.dismissModal("here", "I", "can", "pass", "arguments", "received as an array in promise rejection");
}

function validateChoice() {
  ModalService.closeModal(123, "userChoice", "same thing, I can pass as many arguments I like", "they will passed an array in resolve")
}
</script>
```
And then to display the drawer you just created
```jsx static
import { ModalService } from "@neotechnologygroup/neo-component-kit";
import MyDrawer from "./myDrawer.vue";
import { getCurrentInstance } from "vue";

const currentComponent = getCurrentInstance()?.proxy ?? undefined;

function launchDrawer() {
  const trigger = document.getElementById("trigger"); // when the drawer close it should be put back on trigger or next element in the user flow
  ModalService.showModal(MyDrawer, currentComponent, trigger)
    .then((args: any[]) => {
      /* args will be
      [123, "userChoice", "same thing, I can pass as many arguments I like", "they will passed an array in resolve"]
      if user has clicked on "Validate" button defined in the example above.
      */
    }).catch((args: any[]) => {
      /* args will be
      ["here", "I", "can", "pass", "arguments", "received as an array in promise rejection"]
      if user has clicked on "Cancel" button defined in the example above.
      If user clicks on close button, press escape or click on background, it
      will dismiss drawer with no arguments*/
    })
}

<button @click="launchDrawer" id="trigger">Show the drawer</button>
```
</docs>
