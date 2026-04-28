<template>
  <nck-modal modalTitle="Hello modal" noBodyPadding :size="ModalSize.S">
    <template #modal-body>
      Hello this is a small size modal with not much. Just a little button.
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalSize } from "@neotechnologygroup/neo-component-kit";
</script>
