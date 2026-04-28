<template>
  <div class="screenreader-only" aria-hidden="true">
    <nck-icon v-for="icon in iconsToPreload" :key="icon"
      :iconName="icon" :iconSize="IconSize.L" iconAltText="" />
  </div>
</template>

<script setup lang="ts">
/* we could listen on icon being ready to
be ready to print something in the console for
backstopjs to read but it requires more work
let's see if this first iteration mitigate the issue.
If icons still disappear we will need to do what is said above
*/
import { NckIcon, IconSize } from "@neotechnologygroup/neo-component-kit";

defineProps<{
  iconsToPreload: string[];
}>();
</script>
