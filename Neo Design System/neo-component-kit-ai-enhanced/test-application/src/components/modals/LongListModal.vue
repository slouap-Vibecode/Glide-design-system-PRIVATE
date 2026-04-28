<template>
  <nck-modal modalTitle="Long list modal">
    <template #modal-body>
      <ul class="list">
        <li v-for="index in 200" :key="index">
          <NckCheckbox :modelValue="false" label="Test" />
        </li>
      </ul>
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
import { NckModal, ModalService, NckButton, NckCheckbox } from "@neotechnologygroup/neo-component-kit";

function closeModal() {
  ModalService.closeModal();
}
</script>

<style lang="less" scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
