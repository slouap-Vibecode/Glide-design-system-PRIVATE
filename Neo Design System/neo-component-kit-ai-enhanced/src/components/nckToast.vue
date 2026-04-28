<template>
  <div class="nck-toast-wrapper" :class="{ 'nck-toast-with-action': actionType && actionLabel }">
    <div :role="actionType && actionLabel ? 'alertdialog' : 'alert'" class="nck-toast nck-style nck-internal">
      <div v-if="actionType && actionLabel" class="screenreader-only" tabindex="-1" ref="focusTrap"></div>
      <div>
        <nck-icon
          :iconSize="IconSize.S"
          class="nck-toast-left-icon"
          :iconName="iconInfo.name"
          :iconAltText="iconInfo.altText"
          :primaryColor="iconInfo.primaryColor"
        />
      </div>
      <div class="nck-toast-message-wrapper">
        <p class="nck-toast-message text-m">{{ message }}</p>
        <div v-if="actionLabel && actionType" class="nck-toast-action-wrapper text-m-semibold">
          <component
            :is="actionType === 'link' ? 'a' : 'button'"
            :href="actionType === 'link' ? 'javascript:void(0)' : null"
            :type="actionType === 'button' ? 'button' : null"
            class="nck-toast-action-target"
            @click="clickAction"
          >
            {{ actionLabel }}
          </component>
        </div>
      </div>
      <div>
        <button type="button" class="nck-toast-close" @click="dismissToast">
          <nck-icon
            :iconSize="IconSize.S"
            class="nck-toast-close-icon"
            iconName="clear"
            :iconAltText="closeIconAlternativeText"
            :primaryColor="IconColors.WHITE"
            :secondaryColor="IconColors.WHITE"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";
import NckIcon from "./nckIcon.vue";
import { ToastService } from "@/controllers/toastService";
import { ToastType } from "@/constants/toastType";
import { INckTranslations } from "@/models/iNckTranslations";

/**
 * @component
 * @displayName nck-toast
 * A component to display an information to the user.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - close
 *  - error
 *  - warning
 *  - information
 *  - success
 * - [Icons URL](#icons)
 *
 */

const props = defineProps({
  /**
   * The message to show in the toast.
   */
  message: { type: String, required: true },

  /**
   * Type of the toast. It will determine the icon and its color.
   *
   * Takes values from [ToastType](#toastType) enum.
   */
  type: {
    type: String,
    default: ToastType.ERROR,
    validator: (value: ToastType) => Object.values(ToastType).includes(value),
  },

  /**
   * The text to show in the action button/link.
   *
   * It depends on an actionType to be provided
   */
  actionLabel: { type: String },

  /**
   * The type of action to be displayed which can be a button or a link.
   * Accepted values "link" or "button"
   * It depends on an actionLabel to be provided
   */
  actionType: {
    type: String,
    validator: (value) => value === "link" || value === "button",
  },
});

const emits = defineEmits<{
  /**
   * Emitted when the action is clicked.
   * The toast will also be dismissed when the action is clicked.
   * It will only be here if actionLabel & actionType are filled
   * @param {Event} $event the DOM click event
   */
  (e: "action-clicked", event: Event): void;
}>();

const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
const closeIconAlternativeText = globalOptions?.translations?.close ?? "";
const requiredTranslations = ref<Array<keyof INckTranslations>>([
  "close",
  "warning",
  "success",
  "error",
  "information",
]);
const focusTrap = ref<HTMLElement | null>(null);

// eslint-disable-next-line complexity
const iconInfo = computed(() => {
  switch (props.type) {
    case ToastType.INFO:
      return {
        name: "info-support-filled",
        primaryColor: IconColors.BRIGHT_BLUE_200,
        altText: globalOptions?.translations?.information ?? "",
      };
    case ToastType.SUCCESS:
      return {
        name: "success-filled",
        primaryColor: IconColors.GREEN_200,
        altText: globalOptions?.translations?.success ?? "",
      };
    case ToastType.WARNING:
      return {
        name: "warning-filled",
        primaryColor: IconColors.ORANGE_200,
        altText: globalOptions?.translations?.warning ?? "",
      };
    case ToastType.ERROR:
      return {
        name: "cancel-circle-filled",
        primaryColor: IconColors.RED_200,
        altText: globalOptions?.translations?.error ?? "",
      };
    case ToastType.DEFAULT:
    default:
      return { name: "flag-circle-filled", primaryColor: IconColors.BLUE_GREY_400, altText: "" };
  }
});

/**
 * On the interaction with the toast action,
 * an "action-clicked" event will be triggered
 * and the toast will be dismissed
 * @param {Event} $event the DOM click event
 */
function clickAction($event: Event) {
  emits("action-clicked", $event);
  dismissToast();
}

function dismissToast() {
  /**
   * Emitted when the cross icon is clicked.
   */
  ToastService.dismissToast();
}

function setFocusAtTheBeginning() {
  if (focusTrap.value && props.actionLabel && props.actionType) {
    focusTrap.value.focus();
  }
}

onMounted(() => {
  for (const translation of requiredTranslations.value) {
    if (!globalOptions?.translations?.[translation]) {
      throw new Error(
        `Error: you must provide translations options to the neo-component-kit library to use the toast component. Requires ${translation} `,
      );
    }
  }

  if (props.actionLabel && !props.actionType) {
    throw new Error(`Error: if actionLabel is used, you must provide a value for actionType also`);
  }

  if (!props.actionLabel && props.actionType) {
    throw new Error(`Error: if actionType is used, you must provide a value for actionLabel also`);
  }

  setFocusAtTheBeginning();
});
</script>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/focusMixins.less";

.nck-toast-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1080;

  &:focus-visible,
  &:focus {
    outline: none;
  }

  @media @desktop, @tablet {
    max-width: 32rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  @media @desktop {
    top: 1rem;
    animation: toastAnimationDesktop var(--nck-duration-400) var(--nck-easing-out);
  }

  @media @tablet {
    bottom: 1rem;
    animation: toastAnimationTablet var(--nck-duration-400) var(--nck-easing-out);
  }

  @media @phone {
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    animation: toastAnimationMobile var(--nck-duration-400) var(--nck-easing-out);
  }

  .nck-toast {
    display: flex;
    background: var(--blue-grey-700);
    border-radius: var(--nck-radius-s);
    box-shadow: var(--box-shadow-level-5);

    @media @phone {
      width: 100%;
    }
  }

  .nck-toast-left-icon {
    margin: 1rem 0.5rem 0 1rem;
  }

  .nck-toast-message-wrapper {
    display: flex;
    padding-right: 1rem;
    flex-grow: 1;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: var(--blue-grey-600);
      height: calc(100% - 1rem);
      width: var(--nck-border-width-s);
    }

    @media @phone {
      flex-direction: column;
    }
  }

  .nck-toast-action-wrapper {
    display: flex;
    align-items: center;
    @media @desktop, @tablet {
      padding-left: 0.5rem;
    }

    .nck-toast-action-target {
      text-decoration: none;
      color: var(--nck-text-link-reverse);
      border-radius: var(--nck-radius-s);
      margin: 0.5rem 0;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;

      @media @phone {
        margin: 0;
      }

      &:focus {
        .outline-focus-ring-for-high-contrast-display();
        box-shadow: 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-primary);
      }
    }
  }

  .nck-toast-message {
    color: var(--white);
    text-align: left;
    margin: 1rem 0;
  }

  &.nck-toast-with-action {
    .nck-toast-message-wrapper {
      @media @desktop, @tablet {
        padding-right: 0.5rem;
      }

      @media @phone {
        padding-bottom: 0.5rem;
      }
    }

    .nck-toast-message {
      @media @phone {
        margin: 1rem 0 0.5rem 0;
      }
    }
  }

  .nck-toast-close {
    border-radius: var(--nck-radius-s);
    background: transparent;
    border: 0;
    margin: 0.5rem 0.5rem 0;
    padding: 0;
    &:focus {
      .outline-focus-ring-for-high-contrast-display();
      box-shadow: 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-primary);
    }
  }

  .nck-toast-close-icon {
    margin: 0.5rem;
  }
}

@animation-opacity-start: 0;
@animation-opacity-end: 1;
@animation-position-start: 0;
@animation-position-end: 1rem;
@animation-position-end-mobile: 0.5rem;

@keyframes toastAnimationDesktop {
  from {
    opacity: @animation-opacity-start;
    top: @animation-position-start;
  }
  to {
    opacity: @animation-opacity-end;
    top: @animation-position-end;
  }
}

@keyframes toastAnimationTablet {
  from {
    opacity: @animation-opacity-start;
    bottom: @animation-position-start;
  }
  to {
    opacity: @animation-opacity-end;
    bottom: @animation-position-end;
  }
}

@keyframes toastAnimationMobile {
  from {
    opacity: @animation-opacity-start;
    bottom: @animation-position-start;
  }
  to {
    opacity: @animation-opacity-end;
    bottom: @animation-position-end-mobile;
  }
}
</style>

<docs>
To launch your own toast, first create your own toast by using the NckToast as base
```jsx static
/* toast component */
<template>
  <nck-toast message="Message to show to the user" type="success" />
</template>

<script setup  lang="ts">
import { NckToast } from "@neotechnologygroup/neo-component-kit";
</script>
```
And then to display the toast you just created
```jsx static
/* callee component */
import { getCurrentInstance } from "vue";
import { ToastService } from "@neotechnologygroup/neo-component-kit";
import MyToast from "./myToast.vue";

const currentComponent = getCurrentInstance()?.proxy ?? undefined;

function launchToast() {
  ToastService.addToast(MyToast, currentComponent)
}

<button @click="launchToast">Show the toast</button>
```

```jsx
  <toast-doc-example />
```
</docs>
