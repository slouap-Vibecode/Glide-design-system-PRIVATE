<template>
  <NckInputContainer
    :parentComponent="facadeComponentName"
    class="nck-style nck-datepicker-trigger"
    :label="label"
    :isMiniLabel="isMiniLabel"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :helpMessage="helpMessage"
    :helpMessageId="helpMessageId"
    :errorMessageId="errorMessageId"
    :errorMessage="errorMessage"
    :inputId="inputId"
  >
    <div
      v-if="readonly"
      ref="readonlyEl"
      tabindex="0"
      :id="inputId"
      class="nck-style nck-input-field outside-focus readonly"
      :class="{ 'with-leading-content': hasLeadingIcon }"
      :aria-label="buttonAriaLabel"
      :aria-invalid="!!errorMessage"
      @focus="onInputFocused"
      @blur="onInputBlurred"
    >
      <template v-if="modelValue">
        <span class="higher-resolution-only" :class="{ 'with-leading-content': hasLeadingIcon }">{{
          formattedValue
        }}</span>
        <span class="lower-resolution-only" :class="{ 'with-leading-content': hasLeadingIcon }">{{
          formattedDateOnly
        }}</span>
      </template>
      <template v-else>&nbsp;</template>
    </div>

    <button
      v-else
      type="button"
      ref="buttonEl"
      :id="inputId"
      class="nck-style nck-input-field outside-focus"
      :class="{ 'font-color-ink-40': disabled }"
      :disabled="disabled"
      :aria-label="buttonAriaLabel"
      :aria-controls="popoverId"
      :aria-expanded="popoverId ? (popoverExpanded ? 'true' : 'false') : undefined"
      :aria-invalid="!!errorMessage"
      @focus="onInputFocused"
      @blur="onInputBlurred"
      @click="emitClick"
    >
      <template v-if="modelValue">
        <span class="higher-resolution-only" :class="{ 'with-leading-content': hasLeadingIcon }">{{
          formattedValue
        }}</span>
        <span class="lower-resolution-only" :class="{ 'with-leading-content': hasLeadingIcon }">{{
          formattedDateOnly
        }}</span>
      </template>
      <template v-else>&nbsp;</template>
    </button>
    <template v-if="leadingIcon" #leading-icon>
      <NckIcon :iconName="leadingIcon" :iconSize="IconSize.S" iconAltText="" :primaryColor="leadingIconColor" />
    </template>
  </NckInputContainer>
</template>

<style lang="less" scoped>
@import (reference) "../../../styles/colorsVariables.less";
@import (reference) "../../../styles/breakpointsVariables.less";

.nck-style.nck-datepicker-trigger {
  text-align: left;

  .nck-input-field {
    background-color: var(--nck-surface-secondary);
    color: var(--nck-text-default);
    &.readonly {
      background-color: transparent;
      border: 0;
      &:not(.with-leading-content) {
        padding-left: 0;
      }
    }
    .higher-resolution-only {
      pointer-events: none;
      @media @tablet, @phone {
        display: none;
      }
    }
    .lower-resolution-only {
      pointer-events: none;
      @media @desktop {
        display: none;
      }
    }
    .with-leading-content {
      margin-left: 2rem;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import NckInputContainer from "@/components/internal/nckInputContainer.vue";
import { DatepickerFormatHelper } from "@/controllers/datepickerFormatHelper";
import { INckDatepickerTriggerClickEvent } from "@/models/iNckDatepickerTriggerClickEvent";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { IDateWithRange } from "@/models/iDateWithRange";
import { getFormattedTime } from "@/controllers/timepickerHelper";
import NckIcon from "../../nckIcon.vue";
import { IconSize } from "../../../constants/iconSize";
import { IconColors } from "../../../constants/iconColors";
import { IFocusableExposed } from "@/components/interfaces/iFocusable";

const props = defineProps<{
  facadeComponentName: string;
  label: string;
  modelValue: IDateWithRange | Date | null | undefined;
  fieldShouldContainTime?: boolean;
  disabled?: boolean;
  helpMessage?: string;
  popoverId?: string;
  popoverExpanded?: boolean;
  readonly?: boolean;
  required?: boolean;
  errorMessage?: string;
  withTime?: boolean;
  leadingIcon?: string;
}>();

const emit = defineEmits<{
  /**
   * Emitted when the component is clicked.
   * @param $event the DOM click event
   */
  (event: "click", payload: INckDatepickerTriggerClickEvent): void;
  /**
   * Emitted when input is focused
   */
  (event: "input-focused", payload: Event): void;
  /**
   * Emitted when input is blurred
   */
  (event: "input-blurred", payload: Event): void;
}>();

const errorMessageId = AccessibilityHelper.generateId();
const helpMessageId = AccessibilityHelper.generateId();
const inputId = AccessibilityHelper.generateId();
const inputFocused = ref(false);
const readonlyEl = ref<HTMLElement>();
const buttonEl = ref<HTMLButtonElement>();

function focus() {
  const elementToFocus = props.readonly ? readonlyEl.value : buttonEl.value;
  if (elementToFocus && elementToFocus instanceof HTMLElement) {
    elementToFocus.focus();
  }
  inputFocused.value = true;
}

defineExpose<IFocusableExposed>({
  focus,
});

const formattedValue = computed(() => {
  if (props.withTime) {
    const dateTime = (props.modelValue as IDateWithRange).date;
    if (props.modelValue) {
      const timeString = getFormattedTime(props.modelValue as IDateWithRange);
      return `${DatepickerFormatHelper.getInstance().formatExternal(dateTime)} - ${timeString}`;
    } else {
      return "";
    }
  } else if (props.modelValue instanceof Date) {
    return DatepickerFormatHelper.getInstance().formatExternal(props.modelValue);
  }

  return undefined;
});

const formattedDateOnly = computed(() => {
  if (props.withTime && props.modelValue) {
    const dateTime = (props.modelValue as IDateWithRange).date;
    return DatepickerFormatHelper.getInstance().formatExternal(dateTime);
  } else if (props.modelValue instanceof Date) {
    return DatepickerFormatHelper.getInstance().formatExternal(props.modelValue);
  }
  return "";
});

const buttonAriaLabel = computed(() => {
  return props.modelValue
    ? `${props.label} ${props.fieldShouldContainTime ? formattedValue.value : formattedDateOnly.value}`
    : props.label;
});

const isMiniLabel = computed(() => {
  return !!props.modelValue;
});

const hasLeadingIcon = computed(() => {
  return !!props.leadingIcon;
});

const leadingIconColor = computed(() => {
  if (props.disabled) {
    return IconColors.BLUE_GREY_400;
  } else if (props.errorMessage && props.errorMessage.length > 0) {
    return IconColors.RED_300;
  } else if (inputFocused.value) {
    return IconColors.BRIGHT_BLUE_300;
  } else {
    return IconColors.BLUE_GREY_500;
  }
});

const instance = getCurrentInstance()?.proxy;
function emitClick($event: Event) {
  if (!instance) {
    return;
  }

  const clickEventWithTriggerContext: INckDatepickerTriggerClickEvent = { clickEvent: $event, triggeredBy: { focus } };
  if (!props.readonly && !props.disabled) {
    emit("click", clickEventWithTriggerContext);
  }
}

function onInputFocused($event: Event) {
  inputFocused.value = true;

  emit("input-focused", $event);
}

function onInputBlurred($event: Event) {
  inputFocused.value = false;

  emit("input-blurred", $event);
}
</script>
