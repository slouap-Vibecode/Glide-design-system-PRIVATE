<script setup lang="ts">
import { computed } from "vue";
import NckButton from "@/components/nckButton.vue";
import NckModal from "@/components/nckModal.vue";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonType } from "@/constants/buttonType";
import { ModalSize } from "@/constants/modalSize";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ModalService } from "@/controllers/modalService";

const translations = computed(() => {
  return GlobalOptionsProvider.getInstance().getOptions()?.translations;
});

const modalTitle = computed(() => {
  if (!translations.value?.modalConfirmDismissalTitle) {
    throw new Error(
      `Error in NckModal: you must provide translations options to the neo-component-kit library. Requires 'modalConfirmDismissalTitle'`,
    );
  }
  return translations.value.modalConfirmDismissalTitle;
});

const modalMessage = computed(() => {
  if (!translations.value?.modalConfirmDismissalMessage) {
    throw new Error(
      `Error in NckModal: you must provide translations options to the neo-component-kit library. Requires 'modalConfirmDismissalMessage'`,
    );
  }
  return translations.value.modalConfirmDismissalMessage;
});

const cancelButtonLabel = computed(() => {
  if (!translations.value?.modalConfirmDismissalCancel) {
    throw new Error(
      `Error in NckModal: you must provide translations options to the neo-component-kit library. Requires 'modalConfirmDismissalCancel'`,
    );
  }
  return translations.value.modalConfirmDismissalCancel;
});

const confirmButtonLabel = computed(() => {
  if (!translations.value?.modalConfirmDismissalConfirm) {
    throw new Error(
      `Error in NckModal: you must provide translations options to the neo-component-kit library. Requires 'modalConfirmDismissalConfirm'`,
    );
  }
  return translations.value.modalConfirmDismissalConfirm;
});

function cancel() {
  ModalService.dismissLastOpenedModal();
}

function confirm() {
  ModalService.closeLastOpenedModal();
}
</script>

<template>
  <NckModal :modalTitle="modalTitle" :size="ModalSize.XS" notDismissable>
    <template #modal-body>
      <span class="text-m font-color-ink-100">{{ modalMessage }}</span>
    </template>
    <template #modal-footer-action-buttons>
      <NckButton :type="ButtonType.OUTLINE" :label="cancelButtonLabel" @click="cancel" />
      <NckButton :color="ButtonColor.PRIMARY" :label="confirmButtonLabel" @click="confirm" />
    </template>
  </NckModal>
</template>
