<template>
  <div class="loader-page" :class="{ 'animation-disabled': animationDisabled }">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/loader-errors">
        another page right here
      </router-link>
    </div>

    <div
      v-for="size in loaderSizes"
      :key="size"
      :data-test-case="getIndexForLoaders(size)"
    >
      <b>Test case {{ getIndexForLoaders(size) }}</b>
      <p class="test-app-style">
        A loader with {{ size }} size and an alternative text of "Patience, it
        is loading.".
      </p>
      <nck-loader
        :id="`loader_${size}`"
        loadingText="Patience, it is loading."
        :displayContext="
          getDisplayContextBasedForTestCase(getIndexForLoaders(size))
        "
        :size="size"
      />
    </div>

    <div :data-test-case="numberOfSizes">
      <b>Test case {{ numberOfSizes }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[0] }}</p>
      <button class="test-app-style" @click="startLoading1">
        Start loading when content is already here (is this use case stupid?)
      </button>
      <nck-loading-area
        :loading="loadingsStarted[0]"
        :loadingText="`Test case ${numberOfSizes} is loading`"
        :loadingFinishedText="`Test case ${numberOfSizes} has finished loading`"
      >
        I am the loaded content
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 1">
      <b>Test case {{ numberOfSizes + 1 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[1] }}</p>
      <button class="test-app-style" @click="startLoading2">
        Start loading content will be put after some time (content will be
        displayed after the loading stops)
      </button>
      <nck-loading-area
        :loading="loadingsStarted[1]"
        :loadingText="`Test case ${numberOfSizes + 1} is loading`"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 1
        } has finished loading`"
        :loaderDisplayContext="DisplayContext.LIGHT_GREY_BACKGROUND"
      >
        {{ content1 }}
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 2">
      <b>Test case {{ numberOfSizes + 2 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[2] }}</p>
      <button class="test-app-style" @click="startLoading3">
        Start loading content will be put after some time (content is set first,
        then loading stops)
      </button>
      <nck-loading-area
        :loading="loadingsStarted[2]"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 2
        } has finished loading`"
        :loaderDisplayContext="DisplayContext.DARK_BACKGROUND"
      >
        {{ content2 }}
        <template #loading-placeholder>
          <b>LOADING!!!</b>
          <i>I am some content replacing loader</i>
        </template>
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 3">
      <b>Test case {{ numberOfSizes + 3 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[3] }}</p>
      <nck-loading-area
        :loading="loadingsStarted[3]"
        :loadingText="`Test case ${
          numberOfSizes + 3
        }, which is started at page init, is loading`"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 3
        } has finished loading`"
      >
        {{ content3 }}
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 4">
      <b>Test case {{ numberOfSizes + 4 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[4] }}</p>
      <nck-loading-area
        :loading="loadingsStarted[4]"
        :loadingText="`Test case ${
          numberOfSizes + 4
        }, which ends as soon as page is finished`"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 4
        } has finished loading`"
        contentClasses="red-background"
      >
        {{ content4 }}
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 5">
      <b>Test case {{ numberOfSizes + 5 }}</b>
      <p class="test-app-style">
        A {{ DisplayContext.LIGHT_GREY_BACKGROUND }} linear loader with an alternative text of "Loading".
      </p>
      <nck-loader
        loadingText="Loading"
        :displayContext="DisplayContext.LIGHT_GREY_BACKGROUND"
        :type="LoaderType.LINEAR"
      />
    </div>

    <div :data-test-case="numberOfSizes + 6">
      <b>Test case {{ numberOfSizes + 6 }}</b>
      <p class="test-app-style">
        A {{ DisplayContext.DARK_BACKGROUND }} linear loader with an alternative text of "Loading".
      </p>
      <nck-loader
        loadingText="Loading"
        :displayContext="DisplayContext.DARK_BACKGROUND"
        :type="LoaderType.LINEAR"
      />
    </div>

    <div :data-test-case="numberOfSizes + 7">
      <b>Test case {{ numberOfSizes + 7 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[5] }}</p>
      <button class="test-app-style" @click="startLoading4">
        Start a linear loader. After 10s, put the content then stop loading.
      </button>
      <nck-loading-area
        :loading="loadingsStarted[5]"
        :loadingText="`Test case ${numberOfSizes + 7} is loading`"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 7
        } has finished loading`"
        :type="LoaderType.LINEAR"
      >
        <span v-text="content5" />
      </nck-loading-area>
    </div>

    <div :data-test-case="numberOfSizes + 8">
      <b>Test case {{ numberOfSizes + 8 }}</b>
      <p class="test-app-style">Is loading: {{ loadingsStarted[6] }}</p>
      <nck-button
        label="Start a circular loader. After 2s, put the content then stop loading and do not focus the content of the loaded content."
        @click="startLoading5"
      >
      </nck-button>
      <nck-loading-area
        :loading="loadingsStarted[6]"
        :loadingText="`Test case ${numberOfSizes + 8} is loading`"
        :loadingFinishedText="`Test case ${
          numberOfSizes + 8
        } has finished loading`"
        :moveFocusToContentAfterLoading="false"
      >
        <span v-text="content6" />
      </nck-loading-area>
    </div>

    <!-- Loaders with percentage -->
    <div :data-test-case="numberOfSizes + 9">
      <b>Test case {{ numberOfSizes + 9 }}</b>
      <p class="test-app-style">
        A {{ DisplayContext.WHITE_BACKGROUND }} linear loader at 25% with an
        alternative text of "Loading".
      </p>
      <nck-loader
        loadingText="Loading"
        :displayContext="DisplayContext.WHITE_BACKGROUND"
        :type="LoaderType.LINEAR"
        :modelValue="25"
      />
    </div>

    <div :data-test-case="numberOfSizes + 10">
      <b>Test case {{ numberOfSizes + 10 }}</b>
      <p class="test-app-style">
        A {{ DisplayContext.LIGHT_GREY_BACKGROUND }} linear loader at 75% with
        an alternative text of "Loading".
      </p>
      <nck-loader
        loadingText="Loading"
        :displayContext="DisplayContext.LIGHT_GREY_BACKGROUND"
        :type="LoaderType.LINEAR"
        :modelValue="75"
      />
    </div>

    <div :data-test-case="numberOfSizes + 11" class="red-background">
      <b>Test case {{ numberOfSizes + 11 }}</b>
      <p class="test-app-style">
        A {{ DisplayContext.DARK_BACKGROUND }} linear loader at 50% with an
        alternative text of "Loading".
      </p>
      <nck-loader
        loadingText="Loading"
        :displayContext="DisplayContext.DARK_BACKGROUND"
        :type="LoaderType.LINEAR"
        :modelValue="50"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  NckLoader,
  NckLoadingArea,
  DisplayContext,
  LoaderSize,
  LoaderType,
  NckButton
} from "@neotechnologygroup/neo-component-kit";
import { useRoute } from "vue-router";

const route = useRoute();

const content1 = ref<string>("");
const content2 = ref<string>("");
const content3 = ref<string>("");
const content4 = ref<string>("My loading is finished as soon the page finish being mounted");
const content5 = ref<string>("");
const content6 = ref<string>("");
const loaderSizes = ref<string[]>(Object.values(LoaderSize));
const loadingsStarted = ref<boolean[]>([ false, false, false, true, true, false, false ]);
const numberOfSizes = Object.values(LoaderSize).length;

const animationDisabled = computed(() => {
  return route.query.disableAnimation === "1";
});

function getDisplayContextBasedForTestCase(testCaseIndex: number): DisplayContext {
  switch (testCaseIndex) {
    case 1:
      return DisplayContext.LIGHT_GREY_BACKGROUND;
    case 2:
      return DisplayContext.DARK_BACKGROUND;
    default:
      return DisplayContext.WHITE_BACKGROUND;
  }
}

function getIndexForLoaders(size: LoaderSize) {
  return Object.values(LoaderSize).indexOf(size);
}

function startLoading1() {
  loadingsStarted.value[0] = true;
  setTimeout(() => {
    loadingsStarted.value[0] = false;
  }, 10000);
}

function startLoading2() {
  loadingsStarted.value[1] = true;
  setTimeout(() => {
    content1.value = "Hello dynamic content!";
    loadingsStarted.value[1] = false;
  }, 10000);
}

function startLoading3() {
  loadingsStarted.value[2] = true;
  setTimeout(() => {
    loadingsStarted.value[2] = false;
    content2.value = "Hello dynamic content set after loading is set";
  }, 10000);
}

function startLoading4() {
  loadingsStarted.value[5] = true;
  setTimeout(() => {
    content5.value = "Hello dynamic content!";
    loadingsStarted.value[5] = false;
  }, 10000);
}

function startLoading5() {
  loadingsStarted.value[6] = true;
  setTimeout(() => {
    content5.value = "Hello dynamic content!";
    loadingsStarted.value[6] = false;
  }, 2000);
}

onMounted(() => {
  loadingsStarted.value[4] = false;

  setTimeout(() => {
    loadingsStarted.value[3] = false;
    content3.value = "Hello i'm the content that is set to load at page launch.";
  }, 10000);
});
</script>

<style lang="less">
.loader-page {
  padding-bottom: 3rem;
  &.animation-disabled {
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
  }

  [data-test-case="1"],
  [data-test-case="7"],
  [data-test-case="11"] {
    background: lightgray;
  }

  [data-test-case="2"],
  [data-test-case="8"],
  [data-test-case="12"] {
    background: darkblue;
    color: white;
  }

  [data-test-case="8"] {
    button {
      color: black;
    }
  }

  [data-test-case="14"] {
    padding: 1rem;
  }

  .red-background {
    background: red;
  }
}
</style>
