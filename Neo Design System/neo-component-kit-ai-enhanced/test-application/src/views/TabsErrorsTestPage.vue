<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <b>Test case 0</b>
      1 tab without type, it should throw an error in the console
      <nck-tabs>
        <nck-tab heading="I throw an eror in the console!">
          Tab content
        </nck-tab>
      </nck-tabs>
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      5 tabs, it should throw a warning in the console
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="for now I'm ok">
          Tab content 1
        </nck-tab>
        <nck-tab heading="mee too">
          Tab content 2
        </nck-tab>
        <nck-tab heading="but display on mobile">
          Tab content 3
        </nck-tab>
        <nck-tab heading="will fail">
          Tab content 4
        </nck-tab>
        <nck-tab heading="because of me">
          Tab content 5
        </nck-tab>
      </nck-tabs>
    </div>
  </div>
</template>

<style scoped>
  [data-test-case] {
    margin-bottom: 55px;
  }
</style>

<script setup lang="ts">
import { NckTabs, TabsType } from "@neotechnologygroup/neo-component-kit";
</script>
