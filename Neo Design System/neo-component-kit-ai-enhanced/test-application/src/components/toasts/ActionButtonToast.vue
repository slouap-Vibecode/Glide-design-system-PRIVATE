<template>
  <nck-toast message="A toast with a button" :type="type" actionLabel="Action text" actionType="button" @action-clicked="handleEvent" />
</template>
<script setup lang="ts">
import { NckToast } from "@neotechnologygroup/neo-component-kit";

defineProps({
  type: { type: String }
});

const emits = defineEmits<{
  (e: "bubble-toast-action-event"): void;
}>();

function handleEvent(_event: Event) {
  emits("bubble-toast-action-event");
}
</script>
