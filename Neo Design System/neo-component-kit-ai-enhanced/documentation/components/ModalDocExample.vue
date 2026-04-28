<script setup lang="ts">
import NckModal from "@/components/nckModal.vue";
import { ModalService } from "@/controllers/modalService";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance()?.proxy;
</script>

<template>
  <div>
    <button @click="$event => ModalService.showModal(
      NckModal,
      instance,
      $event.target,
      {
        modalTitle: 'Demo',
        confirmDismissal: false
      }
      )">trigger modal</button>
    <button @click="ModalService.closeModal">close modal</button>
  </div>
</template>
