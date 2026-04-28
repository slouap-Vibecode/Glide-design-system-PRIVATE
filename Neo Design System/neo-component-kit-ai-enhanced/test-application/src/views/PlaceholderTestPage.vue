<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link> |
      <router-link class="test-app-style" to="/placeholder-errors">Placeholder error cases</router-link>
    </nav>

    <div data-test-case="0">
      <b>Test case 0</b>
      <p>A placeholder with a subtitle and one button in actions</p>
      <nck-placeholder title="Just a simple title" subtitle="Hello I am the subtitle for this time I am short
      but be careful I may be longer in some cases">
        <template v-slot:first-button-container>
          <nck-button label="some action" />
        </template>
      </nck-placeholder>
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p>A placeholder with two buttons in actions</p>
      <nck-placeholder title="Just a simple title">
        <template v-slot:first-button-container>
          <nck-button label="some action" color="primary" />
        </template>
        <template v-slot:second-button-container>
          <nck-button label="some action" />
        </template>
      </nck-placeholder>
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      <p>A placeholder with a graphical element</p>
      <nck-placeholder title="Just a simple title">
        <template v-slot:image-placeholder>
          <img src="Neo_Core_System.svg" alt="app logo" />
        </template>
      </nck-placeholder>
    </div>

    <div data-test-case="3">
      <b>Test case 3</b>
      <p>A placeholder with a graphical element and one action</p>
      <nck-placeholder title="Just a simple title">
        <template v-slot:image-placeholder>
          <img src="Neo_Core_System.svg" alt="app logo" />
        </template>
        <template v-slot:first-button-container>
          <nck-button label="some action" color="primary" />
        </template>
      </nck-placeholder>
    </div>

    <div data-test-case="4">
      <b>Test case 4</b>
      <p>A placeholder with a graphical element, a subtitle and two actions</p>
      <nck-placeholder title="Just a simple title" subtitle="And Here I am a very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      long subtitles.">
        <template v-slot:image-placeholder>
          <img src="Neo_Core_System.svg" alt="app logo" />
        </template>
        <template v-slot:first-button-container>
          <nck-button label="some action very very very very long so we can see the buttons going the next line" color="primary" />
        </template>
        <template v-slot:second-button-container>
          <nck-button label="some action very very very very long so we can see the buttons going the next line" />
        </template>
      </nck-placeholder>
    </div>

    <div data-test-case="5">
      <b>Test case 5</b>
      <p>A placeholder with a subtitle</p>
      <nck-placeholder title="Just a simple title" subtitle="And Here I am a very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      very very very very very very very very very very very very very very very very very very
      long subtitles." />
    </div>

    <div data-test-case="6">
      <b>Test case 6</b>
      <p>A placeholder with one action</p>
      <nck-placeholder title="Just a simple title">
        <template v-slot:first-button-container>
          <nck-button label="some action" color="primary" />
        </template>
      </nck-placeholder>
    </div>
  </div>
</template>

<style scoped lang="less">
[data-test-case] {
  padding-bottom: 1rem;
}
</style>

<script setup lang="ts">
import { NckPlaceholder, NckButton } from "@neotechnologygroup/neo-component-kit";
</script>
