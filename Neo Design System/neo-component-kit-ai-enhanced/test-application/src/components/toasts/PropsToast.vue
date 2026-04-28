<template>
  <nck-toast message="A toast with props" :type="type" />
</template>
<script setup lang="ts">
import { NckToast } from "@neotechnologygroup/neo-component-kit";

defineProps({
  type: { type: String }
});
</script>
