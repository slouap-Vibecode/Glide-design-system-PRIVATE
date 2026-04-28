<script setup lang="ts">
import NckToast from "@/components/nckToast.vue";
import { ToastService } from "@/controllers/toastService";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance()?.proxy;
</script>

<template>
  <div>
    <button @click="ToastService.addToast(
      NckToast,
      instance,
      {
        message: 'coucou from nck',
        onDismissToast() {
          alert('dismissed')
        }
      })">trigger toast</button>
    <button @click="ToastService.dismissToast">dismiss toast</button>
  </div>
</template>
