<script setup lang="ts">
import NckModal from "../nckModal.vue";
import NckTimePicker from "./NckTimePicker.vue";
import NckButton from "../nckButton.vue";
import { ButtonColor } from "@/constants/buttonColor";
import { checkPrerequisitesForTimePicker } from "./NckTimePickerBase";
import { onMounted, ref, computed, nextTick } from "vue";
import { TimeInterval } from "@/constants/timeInterval";
import { ITime } from "@/models/iTime";
import { ModalSize } from "@/constants/modalSize";
import { ModalService } from "@/controllers/modalService";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";

const props = defineProps<{
  title: string;
  modelValue: ITime;
  timeInterval: TimeInterval;
  required?: boolean;
  withTimeRange?: boolean;
  withFlexibleTime?: boolean;
  name: string;
  clearButtonAltText: string;
}>();

const transientTimeValue = ref<ITime | null>(
  props.modelValue?.time ? { time: new Date(props.modelValue.time.getTime()), range: props.modelValue.range } : null,
);
const timePicker = ref<InstanceType<typeof NckTimePicker>>();

function selectTime() {
  timePicker.value
    ?.validate()
    .then(() => {
      if (timePicker.value?.isValid()) {
        ModalService.closeLastOpenedModal(transientTimeValue.value);
      } else {
        focusInput();
      }
    })
    .catch(() => focusInput());
}

function focusInput() {
  void nextTick().then(() => {
    timePicker.value?.focus();
  });
}

function selectTransientTime(newTime: ITime | null) {
  transientTimeValue.value = newTime;
}

onMounted(() => {
  checkPrerequisitesForTimePicker(props.withFlexibleTime, props.withTimeRange);
  focusInput();
});

const doneButtonLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.translations?.datepickerDone;
});
</script>

<template>
  <NckModal :modalTitle="title" noBodyPadding :size="ModalSize.FULL">
    <template #modal-body>
      <NckTimePicker
        ref="timePicker"
        :modelValue="transientTimeValue"
        :name="name"
        :label="title"
        :required="required"
        :timeInterval="timeInterval"
        :withTimeRange="withTimeRange"
        :withFlexibleTime="withFlexibleTime"
        :flat="true"
        :clearButtonAltText="clearButtonAltText"
        @update:model-value="selectTransientTime"
        :stickyInput="true"
        :isWithinModal="true"
      />
    </template>
    <template #modal-footer-action-buttons>
      <NckButton :color="ButtonColor.PRIMARY" :label="doneButtonLabel" @click="selectTime()" />
    </template>
  </NckModal>
</template>
