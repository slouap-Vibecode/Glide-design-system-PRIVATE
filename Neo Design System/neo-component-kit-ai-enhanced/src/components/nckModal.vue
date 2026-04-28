<template>
  <div
    class="nck-modal nck-style nck-internal"
    :class="`nck-modal-${size}`"
    ref="modalContainer"
    @mousedown.prevent="dismissModalIfPossible"
  >
    <div
      class="modal-container"
      :role="role"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="role === ModalRole.ALERT_DIALOG ? modalContentId : undefined"
      @mousedown="$event.stopPropagation()"
    >
      <div class="screenreader-only" tabindex="0" @focus="setFocusAtTheEnd"></div>
      <div class="screenreader-only" tabindex="-1" ref="topFocusTrap"></div>

      <div class="nck-modal-header">
        <NckButton
          v-if="dismissable"
          class="left-button"
          leftIcon="close"
          :iconAltText="closeWording"
          :type="ButtonType.GHOST"
          :color="ButtonColor.LIGHT"
          :size="ButtonSize.L"
          @click="dismissModal"
        />
        <NckButton
          v-if="dismissable"
          class="header-space-balancing-right-button"
          leftIcon="close"
          iconAltText="n/a_ariaHidden"
          :type="ButtonType.GHOST"
          :color="ButtonColor.LIGHT"
          :size="ButtonSize.L"
          aria-hidden="true"
          disabled
          @click="dismissModal"
        />
        <h1 class="nck-modal-title header-2" :id="titleId">{{ modalTitle }}</h1>
        <NckButton
          v-if="dismissable"
          class="right-button"
          leftIcon="close"
          :iconAltText="closeWording"
          :type="ButtonType.GHOST"
          :color="ButtonColor.LIGHT"
          :size="ButtonSize.L"
          @click="dismissModal"
        />
        <NckButton
          v-if="headerActionIconName && headerActionIconAltText"
          class="left-button"
          :leftIcon="headerActionIconName"
          :iconAltText="headerActionIconAltText"
          :type="ButtonType.GHOST"
          :color="ButtonColor.LIGHT"
          :size="ButtonSize.L"
          @click="emitHeaderActionIconClicked"
        />
      </div>
      <div
        class="nck-modal-body"
        :style="{ 'margin-bottom': modalBodyCompensationForVirtualKeyboard }"
        :id="modalContentId"
        :class="{ 'no-padding': noBodyPadding }"
      >
        <!-- @slot Content to set in the body of the modal. -->
        <slot name="modal-body"></slot>
      </div>
      <div class="nck-modal-footer" ref="footer" v-if="footerDisplayed">
        <div class="other-content" v-if="slots['modal-footer-additional-content']">
          <!-- @slot Container for arbitrary content on the left side of the footer. -->
          <slot name="modal-footer-additional-content"></slot>
        </div>
        <div class="action-buttons" v-if="slots['modal-footer-action-buttons']">
          <!-- @slot Container for the actions buttons of the modal. It can only contains NckButton. It should have at least one, two maximum. If one it can be of any design. If two buttons the first one needs to be a secondary button and the second one a primary button. -->
          <slot name="modal-footer-action-buttons"></slot>
        </div>
      </div>

      <div class="screenreader-only" tabindex="-1" ref="bottomFocusTrap"></div>
      <div class="screenreader-only" tabindex="0" @focus="setFocusAtTheBeginning"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/colorsVariables.less";

.nck-modal.nck-style {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  /* we take the same as bootstrap to be safe */

  background-color: var(--nck-surface-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  padding: 0;

  @media @tablet {
    padding: 1rem;
  }

  @media @desktop {
    padding: 1.5rem 0;
  }

  /* display */
  .modal-container {
    background-color: var(--nck-surface-primary);
    display: flex;
    flex-direction: column;
    max-height: 100%;
    border-radius: 0;
    // hacky way to integrate position fixed children into the "layout flow"
    /**
      * As per MDN (position fixed):
      * The element is removed from the normal document flow, and no space is created for the element in the page layout.
      * It is positioned relative to the initial containing block established by the viewport, except when one of its ancestors has a transform, perspective, or filter property set to something other than none (see the CSS Transforms Spec),
      * or the will-change property is set to transform, in which case that ancestor behaves as the containing block.
    */
    will-change: transform;

    @media @phone {
      width: 100%;
      height: 100%;
    }

    @media @tablet, @desktop {
      border-radius: var(--nck-radius-m);
      box-shadow: var(--box-shadow-level-7);
    }

    .nck-modal-header {
      display: flex;
      flex: 0 0 auto;
      border-bottom: var(--nck-border-width-s) solid var(--nck-border-neutral);
      padding: var(--nck-spacing-2xs) var(--nck-spacing-l);
      align-items: center;

      @media @desktop {
        padding: var(--nck-spacing-s) var(--nck-spacing-xl);
      }

      .left-button {
        flex: 0 0 auto;
        @media @desktop {
          display: none;
        }
      }

      .right-button {
        flex: 0 0 auto;
        @media @phone, @tablet {
          visibility: hidden;
        }
      }

      .header-space-balancing-right-button {
        display: none;
      }

      .nck-modal-title {
        flex: 1;
        margin: 0;
        text-align: center;
        color: var(--nck-text-default);

        @media @desktop {
          text-align: left;
        }
      }
    }

    .nck-modal-body {
      text-align: left;
      flex: 1 1 auto;
      overflow: auto;
      padding: var(--nck-spacing-l);

      @media @desktop {
        padding: var(--nck-spacing-xl);
      }

      &.no-padding {
        padding: 0;
      }
    }

    .nck-modal-footer {
      flex: 0 0 auto;
      padding: var(--nck-spacing-l) var(--nck-spacing-xl);
      border-top: var(--nck-border-width-s) solid var(--nck-border-neutral);
      display: flex;
      align-items: center;
      justify-content: flex-end;

      @media @tablet, @phone {
        padding: var(--nck-spacing-l);
        flex-direction: column;
        gap: var(--nck-spacing-l);
        align-items: stretch;
      }

      .other-content {
        flex: 1;
        text-align: left;
      }

      .action-buttons {
        margin-left: var(--nck-spacing-l);
        text-align: right;
        display: flex;
        gap: var(--nck-spacing-s);

        @media @tablet, @phone {
          flex-direction: column;
          margin: 0;
        }
      }
    }
  }

  /* sizing */
  &.nck-modal {
    &-xs {
      .modal-container {
        width: 25rem;
        max-width: calc(100% - (1rem * 2));

        @media @phone {
          border-radius: var(--nck-radius-m);
          height: auto;
        }

        @media @desktop {
          max-width: calc(100% - (1.5rem * 2));
        }
      }
    }

    &-s {
      .modal-container {
        @media @tablet, @desktop {
          width: 37.5rem;
        }
      }
    }

    &-m {
      .modal-container {
        @media @tablet {
          width: 100%;
        }

        @media @desktop {
          width: 48.625rem;
        }
      }
    }

    &-l {
      .modal-container {
        @media @tablet {
          width: 100%;
        }

        @media @desktop {
          width: 61.25rem;
        }
      }
    }

    &-full {
      padding: 0;

      .modal-container {
        height: 100%;
        width: 100%;
        border-radius: 0;

        @media @desktop {
          .nck-modal-header {
            .header-space-balancing-right-button {
              display: block;
              visibility: hidden;
            }

            .nck-modal-title {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, onUnmounted, ref, useSlots } from "vue";

// Controllers
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ModalService } from "@/controllers/modalService";

// Helpers
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { DomHelper } from "@/helpers/domHelper";

// Constants
import { ModalSize } from "../constants/modalSize";
import { ModalRole } from "../constants/modalRole";
import { ButtonType } from "../constants/buttonType";
import { ButtonColor } from "../constants/buttonColor";
import { ButtonSize } from "../constants/buttonSize";

// NCK components
import NckButton from "./nckButton.vue";

import { INckModalExposed } from "./interfaces/iNckModal";

const ERROR_PREFIX = "Error in NckModal:";

/**
 * @component
 * @displayName nck-modal
 * The skeleton for the modal component
 * It should be used in conjunction with the ModalService
 * Please refer to the detail guidelines on how to manage modals.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - close
 *  - modalConfirmDismissalTitle: when using confirmDismissal, label for the title in the confirmation modal.
 *  - modalConfirmDismissalMessage: when using confirmDismissal, label for the message in the confirmation modal.
 *  - modalConfirmDismissalCancel: when using confirmDismissal, label for the cancel button in the confirmation modal.
 *  - modalConfirmDismissalConfirm: when using confirmDismissal, label for the confirm button in the confirmation modal.
 * - [Icons URL](#icons)
 */

const props = defineProps({
  /**
   * The title of the modal (also used for accessibility to label the modal)
   */
  modalTitle: { required: true, type: String },

  /**
   * To remove the padding in the modal body
   * @default false
   */
  noBodyPadding: { type: Boolean },

  /**
   * To not render the close icon and disable backdrop click.
   * @default false
   */
  notDismissable: { type: Boolean },

  /**
   * Show a confirmation dialog to the user before dismissing.
   * @default false
   */
  confirmDismissal: { type: Boolean },

  /**
   * Role of the modal, can be dialog or alertdialog.
   * When the user puts alertdialog, the modal is automatically notDismissable.
   *
   * The alertdialog role should only be used for alert messages that have associated interactive controls.
   * The dialog role is used to mark up an HTML based application dialog or window that separates content
   * or UI from the rest of the web application or page.
   *
   * See https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ and https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/.
   *
   * Takes values from [ModalRole](#modalrole) enum.
   */
  role: {
    type: String,
    default: ModalRole.DIALOG,
    validator: (value: ModalRole) => Object.values(ModalRole).includes(value),
  },

  /**
   * Size of the modal.
   *
   * Accepts one of the [ModalSize](#modalsize) values.
   */
  size: {
    type: String,
    validator: (sizeValue: ModalSize) => Object.values(ModalSize).includes(sizeValue),
    default: ModalSize.L,
  },

  /**
   * When set, will display an icon button in the header on tablet & mobile resolutions. the icon is opposite to close button.
   *
   * Accepts NckIcon name
   */
  headerActionIconName: { type: String },

  /**
   * Used for accessibility to label the action icon
   */
  headerActionIconAltText: { type: String },

  /**
   * @ignore internal use only
   * Internal use only, pads the end of the modal body with a white space when
   * a virtual keyboard is opened to prevent it from overlapping the content of the body.
   * Useful in situations where the modal body contains an autocomplete control with a text
   * input control remaining focused (triggering the virtual keyboard) while the user scrolls the autocomplete results list.
   * The autocomplete list will be displayed above the virtual keyboard and the content of the modal body will be pushed up.
   * This will prevent the content of the modal body from being overlapped by the virtual keyboard preventing from selecting the last autocomplete results.
   * @default false
   */
  preventVirtualKeyboardFromOverlappingModalBodyContent: {
    type: Boolean,
    default: false,
  },
});

const dismissable = computed(() => {
  if (props.notDismissable || props.role === ModalRole.ALERT_DIALOG) {
    return false;
  }
  return true;
});

const confirmDismissal = computed(() => props.confirmDismissal);

defineExpose<INckModalExposed>({
  /**
   * @public
   * Close the modal
   * @param args the parameters to pass back to the modal promise
   */
  closeModal,

  /**
   * @public
   * Dismiss the modal
   * @param args the parameters to pass back to the modal promise
   */
  dismissModal,

  /**
   * @public
   * Set the focus on the first focusable element of the modal if any.
   */
  setFocusAtTheBeginning,

  /**
   * @ignore internal use only
   * Internal use only, set the focus on hidden element at the beginning of the modal, for screen readers
   */
  focusHiddenElementAtTheBeginning,

  /**
   * @ignore internal use only
   * Internal use only, allow to get the dismissable information from the modalService to add or not the escape listener
   */
  dismissable,

  /**
   * @ignore internal use only
   * Internal use only, allow to get the confirmDismissal information from the modalService to add or not the confirmation dialog.
   */
  confirmDismissal,
});

const titleId = ref<string>(`title_${AccessibilityHelper.generateId()}`);
const modalContentId = ref<string>(AccessibilityHelper.generateId());
const modalContainer = ref<HTMLElement | null>(null);
const topFocusTrap = ref<HTMLElement | null>(null);
const bottomFocusTrap = ref<HTMLElement | null>(null);
const currentInstance = getCurrentInstance()?.proxy;
const slots = useSlots();
const virtualKeyboardHeight = ref<number>(0);
const footer = ref<HTMLElement>();

const closeWording = computed(() => {
  const optionsProvider = GlobalOptionsProvider.getInstance();
  return optionsProvider.getOptions()?.translations?.close ?? "";
});

const footerDisplayed = computed(() => {
  return slots && !!(slots["modal-footer-action-buttons"] ?? slots["modal-footer-additional-content"]);
});

const modalBodyCompensationForVirtualKeyboard = computed(() => {
  if (props.preventVirtualKeyboardFromOverlappingModalBodyContent && virtualKeyboardHeight.value > 0 && window.top) {
    const footerBodyRect = footer.value?.getBoundingClientRect();

    const footerTop = footerDisplayed.value && footerBodyRect?.top ? footerBodyRect.top : undefined;
    return footerTop
      ? `${virtualKeyboardHeight.value - (window.innerHeight - footerTop)}px`
      : `${virtualKeyboardHeight.value}px`;
  }
  return undefined;
});

function closeModal(...args: unknown[]) {
  if (currentInstance) {
    ModalService.closeSpecificModal(currentInstance, ...args);
  }
}

function dismissModal(...args: unknown[]) {
  if (currentInstance && dismissable.value) {
    ModalService.dismissSpecificModal(currentInstance, ...args);
  }
}

/* for the focusing of element we don't want to cache
because template can change dynamically.
If you want to cache, please be aware you need to know if it has expired
before focusing the element */
function setFocusAtTheBeginning() {
  focusHiddenElementAtTheBeginning();
  if (modalContainer.value instanceof HTMLElement) {
    DomHelper.focusNextElement(modalContainer.value);
  }
}

function focusHiddenElementAtTheBeginning() {
  if (topFocusTrap.value instanceof HTMLElement) {
    void nextTick().then(() => {
      topFocusTrap.value?.focus();
    });
  }
}

const emits = defineEmits<{
  /**
   * Emitted when the extra action icon from the header is clicked.
   */
  (e: "header-action-icon-clicked"): void;
}>();

function emitHeaderActionIconClicked() {
  emits("header-action-icon-clicked");
}

function checkHeaderActionIconIntegrity(): void {
  if (props.headerActionIconName && !props.headerActionIconAltText) {
    throw new Error(
      `${ERROR_PREFIX} 'headerActionIconAltText' prop is required when you specify 'headerActionIconName'`,
    );
  }
  if (props.headerActionIconAltText && !props.headerActionIconName) {
    throw new Error(
      `${ERROR_PREFIX} 'headerActionIconName' prop is required when you specify 'headerActionIconAltText'`,
    );
  }
}

function checkRoleIntegrity() {
  if (props.role === ModalRole.ALERT_DIALOG && !slots["modal-footer-action-buttons"]) {
    throw new Error(
      `${ERROR_PREFIX} 'modal-footer-action-buttons' slot is required when you specify 'role' prop to 'alertdialog' because
         an alertdialog cannot be dismissed and the only way to close it is upon user input on a button expressing their choice.`,
    );
  }
}

function dismissModalIfPossible() {
  if (!props.notDismissable) {
    dismissModal();
  }
}

function focusEndOfModal() {
  if (bottomFocusTrap.value instanceof HTMLElement) {
    bottomFocusTrap.value.focus();
  }
}

function setFocusAtTheEnd() {
  focusEndOfModal();
  if (modalContainer.value instanceof HTMLElement) {
    DomHelper.focusPreviousElement(modalContainer.value);
  }
}

function updateVirtualKeyboardHeight() {
  if (window.top) {
    virtualKeyboardHeight.value =
      window.top.innerHeight - (window.top.visualViewport ? window.top.visualViewport.height : window.top.innerHeight);
  }
}

onBeforeMount(() => {
  const optionsProvider = GlobalOptionsProvider.getInstance();
  if (!optionsProvider.getOptions()?.translations?.close) {
    throw new Error(
      "Error in NckModal: you must provide translations options to the neo-component-kit library." +
        " Requires 'close'",
    );
  }

  checkHeaderActionIconIntegrity();
  checkRoleIntegrity();
});

onMounted(() => {
  focusHiddenElementAtTheBeginning();
  if (window.top?.visualViewport) {
    window.top?.visualViewport.addEventListener("resize", updateVirtualKeyboardHeight);
  }
});

onUnmounted(() => {
  if (window.top?.visualViewport) {
    window.top?.visualViewport.removeEventListener("resize", updateVirtualKeyboardHeight);
  }
});
</script>

<docs>
To launch your own modal, first create your own modal by using the NckModal as base

```jsx static
<template>
  <nck-modal :modalTitle="'My modal title'">
    <template v-slot:modal-body>
      Here you can set whatever you like.
    </template>

    <template v-slot:modal-footer-additional-content>
      this content will be displayed on the left of actions buttons
    </template>

    <template v-slot:modal-footer-action-buttons>
      <nck-button label="Cancel" @click="dismissTheModal"></nck-button>
      <nck-button label="Validate" color="primary" @click="validateChoice"></nck-button>
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalService } from "@neotechnologygroup/neo-component-kit";

function dismissTheModal() {
  ModalService.dismissLastOpenedModal("here", "I", "can", "pass", "arguments", "received as an array in promise rejection");
}

function validateChoice() {
  ModalService.closeLastOpenedModal(123, "userChoice", "same thing, I can pass as many arguments I like", "they will passed an array in resolve")
}
</script>
```
And then to display the modal you just created
```jsx static
import { ModalService } from "@neotechnologygroup/neo-component-kit";
import MyModal from "./myModal.vue";

function launchModal() {
  const trigger = document.getElementById("trigger"); // when the modal close it should be put back on trigger or next element in the user flow
  ModalService.showModal(MyModal, componentCallingModal /* usually it can be "this" */, trigger)
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
      will dismiss modal with no arguments*/
    })
}

<button @click="launchModal" id="trigger">Show the modal</button>
```

```jsx
  <modal-doc-example />
```
</docs>
