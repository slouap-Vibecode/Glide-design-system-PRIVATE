<template>
  <main>

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <section data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>Font colors</div>
      </div>

      <p class="font-color-ink-100">The wizard quickly jinxed the gnomes before they vaporized</p>
      <p class="font-color-ink-70">The wizard quickly jinxed the gnomes before they vaporized</p>
      <p class="font-color-orange-400">The wizard quickly jinxed the gnomes before they vaporized</p>
      <p class="font-color-green-300">The wizard quickly jinxed the gnomes before they vaporized</p>
      <p class="font-color-deep-blue-200">The wizard quickly jinxed the gnomes before they vaporized</p>
    </section>

    <section data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>Background colors</div>
      </div>

      <p class="background-color-bright-blue-100">Hello world</p>
      <p class="background-color-red-200">Hello world</p>
      <p class="background-color-green-300">Hello world</p>
    </section>

    <section data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>Background hover colors</div>
      </div>

      <p class="background-color-hover-bright-blue-100">Hover me!</p>
      <p class="background-color-hover-red-200">Hover me!</p>
      <p class="background-color-hover-green-300">Hover me!</p>
    </section>

    <section data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>Border colors</div>
      </div>

      <div class="border-color-bright-blue-200" style="border-style: solid; border-width: 0.2rem">Look around me</div>
      <div class="border-color-red-200" style="border-style: solid; border-width: 0.2rem">Look around me</div>
      <div class="border-color-green-300" style="border-style: solid; border-width: 0.2rem">Look around me</div>
    </section>

    <section data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>Focus ring</div>
      </div>
      <div><button class="outside-focus">Focus me</button></div>
      <div><button class="inside-focus">Focus me</button></div>
    </section>

    <section data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>Link and button with link aspect</div>
      </div>

      <div>
        <a href="javascript:void(0)" class="nck-style nck-link">I link to something</a>
      </div>
      <div>
        <button class="nck-style nck-button-with-link-aspect">I'm a button and trigger an action but I look like a link</button>
      </div>
    </section>

    <section data-test-case="6">
      <div class="test-case-description">
        <b>Test case 6</b>
        <div>Font styles</div>
      </div>
      <p class="amount-large">amount-large</p>
      <p class="amount-medium">amount-medium</p>
      <p class="amount-small">amount-small</p>
      <p class="amount-xsmall">amount-xsmall</p>
      <p class="badge-font">badge-font</p>
      <p class="header-1">header-1</p>
      <p class="header-2">header-2</p>
      <p class="header-3">header-3</p>
      <p class="header-4">header-4</p>
      <p class="text-l">text-l</p>
      <p class="text-l-semibold">text-l-semibold</p>
      <p class="text-m">text-m</p>
      <p class="text-m-semibold">text-m-semibold</p>
      <p class="text-s">text-s</p>
      <p class="text-s-semibold">text-s-semibold</p>
      <p class="text-xs">text-xs</p>
    </section>

    <section data-test-case="7">
      <div class="test-case-description">
        <b>Test case 7</b>
        <div>Style utilities</div>
        <p class="screenreader-only">Only heard by screen readers</p>
      </div>
    </section>

    <section data-test-case="8">
      <div class="test-case-description">
        <b>Test case 8</b>
        <div>Color palette</div>
      </div>

      <div class="color-grid">
      <div v-for="color in Object.values(Colors)" :key="color">
        <span class="color-name">{{ color }}</span>
          <div
            class="color-swatch"
            :style="{ backgroundColor: `var(--${color})` }"
          ></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Colors } from "@neotechnologygroup/neo-component-kit";

</script>

<style lang="less" scoped>
  section {
    padding: 1rem;
    margin: 0 auto;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 10rem);
    gap: 1.5rem;

    .color-swatch {
      padding: 1rem;
    }
  }
</style>
