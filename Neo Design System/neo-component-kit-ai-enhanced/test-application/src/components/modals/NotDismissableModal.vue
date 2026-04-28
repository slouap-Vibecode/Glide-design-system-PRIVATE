<template>
  <nck-modal modalTitle="Hello modal" notDismissable>
    <template #modal-body>
      Hello this is a modal with no footer and not closable manually.
      This modal will close after 3 seconds.
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalService } from "@neotechnologygroup/neo-component-kit";

setTimeout(() => {
  ModalService.closeModal();
}, 3000);

</script>
