<template>
  <nck-modal :modalTitle="'Hello ' + name">
    <template v-slot:modal-body>
      <div v-if="age > 12">
        <p v-for="index in 5" :key="index" >
          You can ride the roller coaster.
        </p>
      </div>
      <div v-else>You're too young to ride the roller coaster.</div>
    </template>
    <template v-slot:modal-footer-action-buttons>
      <nck-button label="Bye modal" @click="closeModal" />
      <nck-button
        color="negative"
        label="Confirm (or not)"
        @click="closeModal"
      />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { NckModal, ModalService, NckButton } from "@neotechnologygroup/neo-component-kit";

defineProps<{
  name?: string;
  age?: number;
}>();

function closeModal() {
  ModalService.closeModal();
}

</script>
