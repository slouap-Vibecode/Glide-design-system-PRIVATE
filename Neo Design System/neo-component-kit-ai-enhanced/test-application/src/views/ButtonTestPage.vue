<template>
  <div class="button-page" :class="{ 'animation-disabled': animationDisabled }">
    <PreloadFontComponent />

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/button-errors">another page right here</router-link>
    </div>

    <div class="overview">
      <b>Quick overview of different sizes</b>
      <h1>S</h1>
      <div data-test-case="S">
        <nck-button :size="ButtonSize.S" :disabled="true" :color="ButtonColor.LIGHT"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.S" :color="ButtonColor.POSITIVE"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.S" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.GHOST" label="Hello world" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.S" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.S" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.OUTLINE" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.S" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus" floating
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
      </div>
      <h1>M</h1>
      <div data-test-case="M">
        <nck-button :size="ButtonSize.M" :disabled="true" :color="ButtonColor.LIGHT"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.M" :color="ButtonColor.POSITIVE"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.M" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.GHOST" label="Hello world" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.M" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.M" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.OUTLINE" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.M" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus" floating
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
      </div>
      <h1>L</h1>
      <div data-test-case="L">
        <nck-button :size="ButtonSize.L" :disabled="true" :color="ButtonColor.LIGHT"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.L" :color="ButtonColor.POSITIVE"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.L" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.GHOST" label="Hello world" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.L" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.L" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.OUTLINE" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.L" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus" floating
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
      </div>
      <h1>XL</h1>
      <div data-test-case="XL">
        <nck-button :size="ButtonSize.XL" :disabled="true" :color="ButtonColor.LIGHT"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.XL" :color="ButtonColor.POSITIVE"
                    :type="ButtonType.OUTLINE" label="Hello world"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.XL" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.GHOST" label="Hello world" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.XL" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.XL" :color="ButtonColor.PRIMARY"
                    :type="ButtonType.OUTLINE" leftIcon="add-plus"
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
        <nck-button :size="ButtonSize.XL" :color="ButtonColor.LIGHT"
                    :type="ButtonType.GHOST" leftIcon="add-plus" floating
                    iconAltText="This is the alternative text"
                    loadingText="loading!!!" />
      </div>
    </div>

    <div v-for="(testCase, idx) in testCases" :key="idx" :data-test-case="idx">
      <div>
        <b>Test case {{ idx }}</b>
        Color: {{ testCase.color }},
        Size: {{ testCase.size }},
        Type: {{ testCase.type }},
        Disabled: {{ testCase.disabled }},
        FullWidth: {{ testCase.fullWidth }}
        AriaRole: {{ testCase.ariaRole }}
        <template v-if="testCase.label && testCase.leftIcon">
          Icon + Text
        </template>
        <template v-else-if="testCase.label && !testCase.leftIcon">
          Text only
        </template>
        <template v-else> Icon only </template>
      </div>
      <nck-button :label="testCase.label" :color="testCase.color" :size="testCase.size" :disabled="testCase.disabled"
        :type="testCase.type" :fullwidth="testCase.fullWidth" :leftIcon="testCase.leftIcon"
        iconAltText="This is the alternative text" :ariaRole="testCase.ariaRole" @click="toggleTestValue(idx, testCase)"
        :loading="testCase.loading" loadingText="loading!!!" />
      <div v-if="idx === 5">
        <button data-toggle-disable @click="testCase.disabled = !testCase.disabled">
          toggle disable
        </button>
      </div>
      <div v-if="idx === 26">
        <button data-toggle-loading @click="testCase.loading = !testCase.loading">
          toggle loading
        </button>
      </div>
      <div v-if="testValueDisplayed[idx]">Hello test!</div>
    </div>

    <!-- Floating action button -->
    <div>
      <h1>Floating action button</h1>
      <div v-for="(fabTestCase, idx) in fabTestCases" :key="idx" :data-test-case="testCases.length + idx">
        <div>
          <b>Test case {{ testCases.length + idx }}</b>
          Floating, Color: {{ fabTestCase.color }}, Size:
          {{ fabTestCase.size }}, Type: {{ fabTestCase.type }}, Disabled:
          {{ fabTestCase.disabled }}, FullWidth: {{ fabTestCase.fullWidth }},
          AriaRole: {{ fabTestCase.ariaRole }},
          <template v-if="fabTestCase.label && fabTestCase.leftIcon">
            Icon + Text
          </template>
          <template v-else-if="fabTestCase.label && !fabTestCase.leftIcon">
            Text only
          </template>
          <template v-else> Icon only </template>
        </div>
        <nck-button :aria-role="fabTestCase.ariaRole" :color="fabTestCase.color" :disabled="fabTestCase.disabled" floating
          :label="fabTestCase.label" :size="fabTestCase.size" :type="fabTestCase.type" :fullwidth="fabTestCase.fullWidth"
          :leftIcon="fabTestCase.leftIcon" iconAltText="This is the alternative text" :loading="fabTestCase.loading"
          loadingText="loading!!!" @click="toggleTestValue(testCases.length + idx, fabTestCase)" />
        <div v-if="testValueDisplayed[testCases.length + idx]">Hello test!</div>
      </div>
    </div>

    <!-- Right icon buttons -->
    <div>
      <h1>Tests For right btn</h1>
      <div v-for="(testRight, idx) in rightIconTestCases" :key="idx"
        :data-test-case="testCases.length + fabTestCases.length + idx">

        <b>Test case {{ testCases.length + fabTestCases.length + idx }}</b>
        <div>

          <div class="tag">
            <span class="category">Color:</span>
            <span class="value">{{ testRight.color }}</span>
          </div>
          <div class="tag">
            <span class="category">Size:</span>
            <span class="value">{{ testRight.size }}</span>
          </div>
          <div class="tag">
            <span class="category">Type:</span>
            <span class="value">{{ testRight.type }}</span>
          </div>
          <div class="tag">
            <span class="category">Disabled:</span>
            <span class="value">{{ testRight.disabled }}</span>
          </div>
          <div class="tag">
            <span class="category">FullWidth:</span>
            <span class="value">{{ testRight.fullWidth }}</span>
          </div>
          <div class="tag">
            <span class="category">AriaRole:</span>
            <span class="value">{{ testRight.ariaRole }}</span>
          </div>
          <div class="tag">
            <span class="category">
              Label:</span>
            <span class="value">{{ testRight.label }}</span>
          </div>
          <div class="tag">
            <span class="category">
              LeftIcon:</span>
            <span class="value">{{ testRight.leftIcon }}</span>
          </div>
          <div class="tag">
            <span class="category">
              RightIcon:</span>
            <span class="value">{{ testRight.rightIcon }}</span>
          </div>
          <div class="tag">
            <span class="category">
              Icon situation:</span>
            <span v-if="testRight.label && (testRight.leftIcon || testRight.rightIcon)" class="value">
              Icon + Text
            </span>
            <span v-else-if="testRight.label && !testRight.leftIcon && !testRight.rightIcon" class="value">
              Text only
            </span>
            <span v-else-if="!testRight.label && testRight.leftIcon && testRight.rightIcon" class="value"> Icon only
            </span>
          </div>
        </div>
        <nck-button :aria-role="testRight.ariaRole" :color="testRight.color" :disabled="testRight.disabled"
          v-bind:floating="idx % 2 === 0 ? true : null" :label="testRight.label" :size="testRight.size"
          :type="testRight.type" :fullwidth="testRight.fullWidth" :leftIcon="testRight.leftIcon"
          :rightIcon="testRight.rightIcon" iconAltText="This is the alternative left text" rightIconAltText="please next time open your console and watch for errors" :loading="testRight.loading"
          loadingText="loading!!!" @click="toggleTestValue(testCases.length + fabTestCases.length + idx, testRight)" />
        <div v-if="testValueDisplayed[testCases.length + fabTestCases.length + idx]">Hello test!</div>
      </div>
    </div>

    <!-- counter badge buttons -->
    <div>
      <h1>Tests For counter badge</h1>
      <div v-for="(testCase, idx) in counterBadgeTestCases" :key="idx"
        :data-test-case="testCases.length + fabTestCases.length + rightIconTestCases.length + idx">

        <b>Test case {{ testCases.length + fabTestCases.length + rightIconTestCases.length + idx }}</b>
        <div>

          <div class="tag">
            <span class="category">Color:</span>
            <span class="value">{{ testCase.color }}</span>
          </div>
          <div class="tag">
            <span class="category">Size:</span>
            <span class="value">{{ testCase.size }}</span>
          </div>
          <div class="tag">
            <span class="category">Type:</span>
            <span class="value">{{ testCase.type }}</span>
          </div>
          <div class="tag">
            <span class="category">Disabled:</span>
            <span class="value">{{ testCase.disabled }}</span>
          </div>
          <div class="tag">
            <span class="category">FullWidth:</span>
            <span class="value">{{ testCase.fullWidth }}</span>
          </div>
          <div class="tag">
            <span class="category">AriaRole:</span>
            <span class="value">{{ testCase.ariaRole }}</span>
          </div>
          <div class="tag">
            <span class="category">
              Label:</span>
            <span class="value">{{ testCase.label }}</span>
          </div>
          <div class="tag">
            <span class="category">
              LeftIcon:</span>
            <span class="value">{{ testCase.leftIcon }}</span>
          </div>
          <div class="tag">
            <span class="category">
              RightIcon:</span>
            <span class="value">{{ testCase.rightIcon }}</span>
          </div>
          <div class="tag">
            <span class="category">
              Icon situation:</span>
            <span v-if="testCase.label && (testCase.leftIcon || testCase.rightIcon)" class="value">
              Icon + Text
            </span>
            <span v-else-if="testCase.label && !testCase.leftIcon && !testCase.rightIcon" class="value">
              Text only
            </span>
            <span v-else-if="!testCase.label && testCase.leftIcon && testCase.rightIcon" class="value"> Icon only
            </span>
          </div>
          <div class="tag">
            <span class="category">
              Counter badge entry:</span>
            <span class="value">{{ testCase.counterBadgeEntry }}</span>
          </div>
          <div class="tag">
            <span class="category">
              Counter badge plus prefix:</span>
            <span class="value">{{ testCase.counterBadgePlusPrefix ? "yes" : "no" }}</span>
          </div>
        </div>
        <nck-button :aria-role="testCase.ariaRole" :color="testCase.color" :disabled="testCase.disabled"
          v-bind:floating="idx % 2 === 0 ? true : null" :label="testCase.label" :size="testCase.size"
          :type="testCase.type" :fullwidth="testCase.fullWidth" :leftIcon="testCase.leftIcon"
          :counterBadgePlusPrefix="testCase.counterBadgePlusPrefix" :counterBadgeEntry="testCase.counterBadgeEntry"
          :rightIcon="testCase.rightIcon" iconAltText="This is the alternative left text" rightIconAltText="right alt text" :loading="testCase.loading"
          loadingText="loading!!!" @click="toggleTestValue(testCases.length + fabTestCases.length + rightIconTestCases.length + idx, testCase)" />
        <div v-if="testValueDisplayed[testCases.length + fabTestCases.length + rightIconTestCases.length + idx]">Hello test!</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.button-page {
  .overview {
    padding-block: 2rem;
  }

  [data-test-case] {
    padding: 0 0.5rem 2rem;
    overflow: hidden;
    /* this will make sure we display the same thing that backstopjs sees */
  }

  .separator {
    border: 1px solid black;
  }

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

  .tag {
    display: inline-block;
    padding: 0.125rem;
    margin: 0.125rem;
    font-size: 0.8rem;
    font-style: italic;

    .category {
      font-weight: bold;
    }

    .value {
      margin-left: 0.312rem;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  NckButton,
  ButtonType,
  ButtonSize,
  ButtonColor
} from "@neotechnologygroup/neo-component-kit";
import { useRoute } from "vue-router";
import PreloadFontComponent from "../components/PreloadFontComponent.vue";

interface ButtonTestDescription {
  size: ButtonSize;
  color: ButtonColor;
  disabled: boolean;
  type: ButtonType;
  label: string | null;
  leftIcon?: string | null;
  fullWidth: boolean;
  ariaRole: string;
  loading?: boolean;
  rightIcon?: string;
  counterBadgeEntry?: number;
  counterBadgePlusPrefix?: boolean;
}

const route = useRoute();

const testValueDisplayed = ref<boolean[]>([]);
const testCases = ref<ButtonTestDescription[]>([
  {
    size: ButtonSize.S,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Hello test",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.POSITIVE,
    disabled: true,
    type: ButtonType.FILLED,
    label: "OK",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.FILLED,
    label: "Hello test",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.LIGHT,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: "Hello button",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: true,
    type: ButtonType.FILLED,
    label:
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button " +
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button " +
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button ",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: "OK",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.POSITIVE,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.NEGATIVE,
    disabled: true,
    type: ButtonType.FILLED,
    label: "Hello test",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.FILLED,
    label:
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test ",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.FILLED,
    label: "OK",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "OK",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.LIGHT,
    disabled: true,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: "Hello button",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Hello button",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: "OK",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.LIGHT,
    disabled: true,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Hello button",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label:
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button " +
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button " +
      "Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button Hello button ",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.FILLED,
    label:
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test " +
      "Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test Hello test ",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Hello",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Hello",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Hello",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link",
    loading: false
  }
]);
const fabTestCases = ref<ButtonTestDescription[]>([
  {
    size: ButtonSize.S,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Floating action button",
    leftIcon: "amenity-entertainment-dark",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Floating action button",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Floating action button",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Floating action button",
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "link"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: null,
    leftIcon: "add-plus",
    fullWidth: true,
    ariaRole: "button"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: true,
    type: ButtonType.FILLED,
    label: "Floating action button",
    leftIcon: null,
    fullWidth: true,
    ariaRole: "button"
  }
]);
const rightIconTestCases = ref<ButtonTestDescription[]>([
  {
    size: ButtonSize.XL,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Hello left logo",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "link"
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Hello right logo",
    leftIcon: null,
    fullWidth: false,
    ariaRole: "button",
    rightIcon: "star"
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Hello left and right logo",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    rightIcon: "star"
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: null,
    leftIcon: "info-support",
    fullWidth: false,
    ariaRole: "link",
    rightIcon: "info-support"
  }
]);
const counterBadgeTestCases = ref<ButtonTestDescription[]>([
  // label only - outlined
  {
    size: ButtonSize.XL,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.OUTLINE,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  // label only - Ghost
  {
    size: ButtonSize.L,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  // label only - Filled
  {
    size: ButtonSize.M,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.LIGHT,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.M,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  // label only - various types - disabled
  {
    size: ButtonSize.S,
    color: ButtonColor.PRIMARY,
    disabled: true,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.LIGHT,
    disabled: true,
    type: ButtonType.OUTLINE,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 125
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.POSITIVE,
    disabled: true,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9,
    counterBadgePlusPrefix: true
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.NEGATIVE,
    disabled: true,
    type: ButtonType.FILLED,
    label: "Label",
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 125,
    counterBadgePlusPrefix: true
  },
  // icon tests
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    rightIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9,
    counterBadgePlusPrefix: true
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: "Label",
    leftIcon: "add-plus",
    rightIcon: "filter",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 8
  },
  {
    size: ButtonSize.XL,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: null,
    leftIcon: "add-plus",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 9
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.PRIMARY,
    disabled: false,
    type: ButtonType.GHOST,
    label: null,
    leftIcon: "trip",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 123
  },
  {
    size: ButtonSize.L,
    color: ButtonColor.POSITIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: null,
    rightIcon: "trash",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 1
  },
  {
    size: ButtonSize.S,
    color: ButtonColor.NEGATIVE,
    disabled: false,
    type: ButtonType.GHOST,
    label: null,
    rightIcon: "trash",
    fullWidth: false,
    ariaRole: "button",
    counterBadgeEntry: 123
  }
]);

const animationDisabled = computed(() => {
  return route.query.disableAnimation === "1";
});

function toggleTestValue(idx: number, config: ButtonTestDescription) {
  testValueDisplayed.value[idx] = !testValueDisplayed.value[idx];
  config.loading = !config.loading;
}
</script>
