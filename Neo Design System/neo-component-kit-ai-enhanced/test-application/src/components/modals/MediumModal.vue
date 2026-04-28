<template>
  <nck-modal modalTitle="Hello medium modal" :size="ModalSize.M">
    <template #modal-body>
      Hello I am medium modal with a bit of content.
    </template>

    <template #modal-footer-action-buttons>
      <nck-button color="positive" label="Bye modal" @click="closeModal" />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance } from "vue";
import {
  ModalService,
  ModalSize,
  NckButton,
  NckModal
} from "@neotechnologygroup/neo-component-kit";

const currentInstance = getCurrentInstance()?.proxy;

function closeModal() {
  ModalService.closeSpecificModal(currentInstance as ComponentPublicInstance);
}
</script>
