<template>
  <nck-modal modalTitle="Hello modal" headerActionIconName="trash">
    <template #modal-body>
      Hello this modal will throw an error because we are missing some
      action props.
    </template>
    <template #modal-footer-action-buttons>
      <nck-button color="positive" label="Bye modal" @click="closeModal" />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalService, NckButton } from "@neotechnologygroup/neo-component-kit";

function closeModal() {
  ModalService.closeModal();
}
</script>
