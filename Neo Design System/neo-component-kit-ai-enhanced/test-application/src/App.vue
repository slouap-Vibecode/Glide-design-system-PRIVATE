<template>
  <router-view/>
</template>

<style lang="less">
body {
  font-family: 'Open sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: none!important;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  #app {
    text-align: center;
  }

  &.no-animation {
    *,
    *::after,
    *::before {
      transition-delay: 0s !important;
      transition-duration: 0s !important;
      animation-delay: -0.0001s !important;
      animation-duration: 0s !important;
      animation-play-state: paused !important;
      caret-color: transparent !important;
      color-adjust: exact !important;
    }
    ::-webkit-resizer {
      display: none;
    }
  }
}
</style>

<script setup lang="ts">
if (navigator?.userAgent?.includes("HeadlessChrome")) {
  document.body.classList.add("no-animation");
}
</script>
