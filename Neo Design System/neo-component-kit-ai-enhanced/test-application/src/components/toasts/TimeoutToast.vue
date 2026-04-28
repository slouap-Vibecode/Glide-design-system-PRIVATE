<template>
  <nck-toast :type="ToastType.DEFAULT" message="This toast appeared after 5 seconds of waiting time" />
</template>
<script setup lang="ts">
import { NckToast, ToastType } from "@neotechnologygroup/neo-component-kit";
</script>
