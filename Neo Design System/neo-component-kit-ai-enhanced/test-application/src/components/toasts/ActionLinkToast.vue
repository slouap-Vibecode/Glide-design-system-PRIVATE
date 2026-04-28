<template>
  <nck-toast message="A toast with a link" :type="ToastType.DEFAULT" actionLabel="Action text" actionType="link" @action-clicked="handleEvent" />
</template>
<script setup lang="ts">
import { NckToast, ToastType } from "@neotechnologygroup/neo-component-kit";
import { useRouter } from "vue-router";

const router = useRouter();

function handleEvent(event: Event) {
  if (event?.target) {
    void router.push({ name: "404" });
  }
}
</script>
