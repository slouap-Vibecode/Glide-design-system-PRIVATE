<template>
  <nck-drawer :drawerTitle="testTitle" :noBodyPadding="noBodyPadding">
    <template #drawer-body>{{ testText }}</template>
  </nck-drawer>
</template>

<script setup lang="ts">
import {
  NckDrawer
} from "@neotechnologygroup/neo-component-kit";

defineProps<{
  testTitle?: string;
  testText?: string;
  noBodyPadding?: boolean;
}>();
</script>
