<template>
  <nck-modal modalTitle="Hello modal" :size="ModalSize.XS" :role="modalRole">
    <template #modal-body>
      Hello this is an extra small size modal with two buttons in the footer with a role {{ modalRole }}
    </template>
    <template #modal-footer-action-buttons>
      <nck-button label="Bye" @click="closeModal" />
      <nck-button
        color="primary"
        label="Ok"
        @click="closeModal"
      />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalService, NckButton, ModalSize, ModalRole } from "@neotechnologygroup/neo-component-kit";

withDefaults(
  defineProps<{
    modalRole?: ModalRole;
  }>(),
  {
    modalRole: ModalRole.ALERT_DIALOG
  }
);

function closeModal() {
  ModalService.closeModal();
}
</script>
