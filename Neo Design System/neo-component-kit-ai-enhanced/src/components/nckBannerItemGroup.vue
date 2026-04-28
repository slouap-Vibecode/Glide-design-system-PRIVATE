<template>
  <ul class="nck-banner-list">
    <!-- @slot A collection of NckBannerItem components must go there. -->
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
/**
 * @component
 * @displayName nck-banner-item-group
 * This component is a container for a collection of NckBannerItem components.
 * It is meant to be used as a sub-component of <a href="#nckbanner">NckBanner</a>.
 */
</script>

<style lang="less" scoped>
.nck-banner-list {
  display: block;
  width: 100%;
  margin: 0.25rem 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
