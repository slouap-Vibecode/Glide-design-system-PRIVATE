<template>
  <NckModal :modalTitle="modalTitle" :size="ModalSize.FULL">
    <template v-slot:modal-body>
      <div class="datepicker-modal-body">
        <NckDatepickerInternal
          ref="datepickerInternalRef"
          class="nck-datepicker-modal"
          v-model="internalDates"
          :timeValues="timeValues"
          :isRange="genericProps.isRange"
          :withTime="genericProps.withTime"
          :required="genericProps.required"
          :context="DatepickerContext.MODAL"
          :startRangeName="genericProps.startRangeName"
          :endRangeName="genericProps.endRangeName"
          :startRangeLabel="genericProps.startRangeLabel"
          :endRangeLabel="genericProps.endRangeLabel"
          :todayDate="genericProps.todayDate"
          :startRangeRules="genericProps.startRangeRules"
          :endRangeRules="genericProps.endRangeRules"
          :minDateAllowed="genericProps.minDateAllowed"
          :maxDateAllowed="genericProps.maxDateAllowed"
          :beforeMinDateErrorMessage="genericProps.beforeMinDateErrorMessage"
          :afterMaxDateErrorMessage="genericProps.afterMaxDateErrorMessage"
        />
      </div>
    </template>
    <template v-slot:modal-footer-action-buttons>
      <NckButton
        :label="modalButtonLabel"
        :color="ButtonColor.PRIMARY"
        :size="ButtonSize.M"
        :fullwidth="true"
        @click="closeModal"
      ></NckButton>
    </template>
  </NckModal>
</template>

<style scoped lang="less">
.datepicker-modal-body {
  max-width: 33rem;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import NckButton from "@/components/nckButton.vue";
import NckModal from "@/components/nckModal.vue";
import NckDatepickerInternal from "./nckDatepickerInternal.vue";
import { DatepickerContext } from "@/models/datepickerContext";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonSize } from "@/constants/buttonSize";
import { ModalSize } from "@/constants/modalSize";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ModalService } from "@/controllers/modalService";
import { useDatepickerContext } from "@/composables/useDatepickerContext";
import { ITime } from "@/models/iTime";
import { IDateWithRange } from "@/models/iDateWithRange";

const props = defineProps<{
  timeValues: [ITime | null, ITime | null];
  modelValue: [IDateWithRange | Date | null, IDateWithRange | Date | null];
}>();

const { injectDatepickerContext } = useDatepickerContext();
const genericProps = injectDatepickerContext();

const internalDates = ref<[Date | null | undefined, Date | null | undefined]>([null, null]);

const datepickerInternalRef = ref<InstanceType<typeof NckDatepickerInternal> | null>(null);

const modalButtonLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.translations?.datepickerDone;
});

const modalTitle = computed<string>(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  const title = genericProps.isRange
    ? globalOptions?.translations?.datepickerRangeTitle
    : globalOptions?.translations?.datepickerSingleTitle;
  // Backward compatibility for datepickerTitle, symbol is deprecated
  return title ?? globalOptions?.translations?.datepickerTitle ?? "";
});

onBeforeMount(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.datepickerDone) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the datepicker component. Requires 'done'",
    );
  }
  // in the case of modal we only pass the dates as the modal is used in low resolution where there is no time
  internalDates.value = [props.modelValue[0] as Date | null, props.modelValue[1] as Date | null];
});

function closeModal() {
  if (datepickerInternalRef.value) {
    datepickerInternalRef.value.validateWithFocusOnErrorField((newDates) => {
      ModalService.closeModal(newDates);
    });
  }
}
</script>
