<template>
  <nck-modal modalTitle="Hello medium modal" :size="ModalSize.S" headerActionIconName="trash"
    headerActionIconAltText="Icon alternative text" @header-action-icon-clicked="onActionClick">
    <template #modal-body>
      Hello I am small modal with an action in the header in mobile & tablet resolutions.
    </template>

    <template #modal-footer-action-buttons>
      <nck-button color="positive" label="Bye modal" @click="closeModal" />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import {
  ModalService,
  ModalSize,
  NckButton,
  NckModal
} from "@neotechnologygroup/neo-component-kit";

const emits = defineEmits<{
  (e: "event-inside"): void;
}>();

function closeModal() {
  ModalService.closeModal();
}

function onActionClick() {
  emits("event-inside");
}
</script>
