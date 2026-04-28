<script lang="ts" setup>
import { ref, computed } from "vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { getFormattedTime } from "@/controllers/timepickerHelper";
import NckInputContainer from "../nckInputContainer.vue";
import { ITime } from "@/models/iTime";

const props = defineProps<{
  facadeComponentName: string;
  label?: string;
  modelValue: ITime | null;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}>();

const emits = defineEmits<{
  (e: "click", $event: MouseEvent): void;
}>();

const inputId = ref<string>(AccessibilityHelper.generateId());
const buttonEl = ref<HTMLButtonElement | null>(null);
const errorMessageId = AccessibilityHelper.generateId();
const helpMessageId = AccessibilityHelper.generateId();

const formattedTime = computed(() => {
  return getFormattedTime(props.modelValue);
});

const isMiniLabel = computed(() => {
  return !!props?.modelValue?.time;
});

const buttonAriaLabel = computed(() => {
  return props.modelValue ? `${props.label} ${formattedTime.value}` : props.label;
});

function emitClick($event: MouseEvent) {
  if (!props.readonly && !props.disabled) {
    emits("click", $event);
  }
}

const focusableElement = computed(() => {
  if (buttonEl.value) {
    return buttonEl.value;
  }
  return undefined;
});

defineExpose({
  focusableElement,
});
</script>

<template>
  <NckInputContainer
    :parentComponent="facadeComponentName"
    class="nck-timepicker-trigger"
    :label="label"
    :isMiniLabel="isMiniLabel"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :inputId="inputId"
    :errorMessageId="errorMessageId"
    :errorMessage="errorMessage"
    :helpMessageId="helpMessageId"
  >
    <div
      v-if="readonly"
      ref="readonlyEl"
      tabindex="0"
      :id="inputId"
      class="nck-style nck-input-field outside-focus readonly"
      :aria-label="buttonAriaLabel"
    >
      <template v-if="formattedTime">{{ formattedTime }}</template>
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
      :aria-invalid="!!errorMessage"
      @click="emitClick"
    >
      <template v-if="formattedTime">{{ formattedTime }}</template>
      <template v-else>&nbsp;</template>
    </button>
  </NckInputContainer>
</template>

<style lang="less" scoped>
@import (reference) "../../../styles/colorsVariables.less";
@import (reference) "../../../styles/animationsVariables.less";

.nck-timepicker-trigger {
  text-align: left;

  .nck-input-field {
    background-color: var(--nck-surface-secondary);
    color: var(--nck-text-default);
    &.readonly {
      background-color: transparent;
      border: 0;
      padding-left: 0;
    }
  }
}
</style>
