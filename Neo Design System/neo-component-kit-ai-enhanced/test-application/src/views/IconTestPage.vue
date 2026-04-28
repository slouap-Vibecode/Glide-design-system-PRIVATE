<template>
  <div class="icon-test">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/icon-errors">another page right here</router-link>
    </div>
    <div class="icon-test-container">
      <div v-for="size in IconSize" v-bind:key="size" class="test">
        <div :data-test-case="getSizeIndex(size)">
          <b>Test case {{ getSizeIndex(size) }}</b>
          <p class="test-app-style">
            iconName: "caret-down", iconSize: {{ size }}, iconAltText: "{{
              alternativeText
            }}"
          </p>
          <div>
            <NckIcon
              :iconSize="size"
              iconName="caret-down"
              :iconAltText="alternativeText"
            ></NckIcon>
          </div>
        </div>
      </div>

      <div v-for="size in IconSize" v-bind:key="size + '_2'" class="test">
        <div :data-test-case="numberOfSizes + getSizeIndex(size)">
          <b>Test case {{ getSizeIndex(size) + numberOfSizes }}</b>
          <p class="test-app-style">
            iconName: "add-plus", iconSize: {{ size }}, iconAltText: "{{
              alternativeText
            }}"
          </p>
          <div>
            <NckIcon
              :iconSize="size"
              iconName="add-plus"
              :iconAltText="alternativeText"
            ></NckIcon>
            <span>Texqtb</span>
          </div>
        </div>
      </div>

      <b>Colorization</b>
      <div
        v-for="(colors, index) in colorsArray"
        :key="index"
        :data-test-case="numberOfSizes * 2 + index"
      >
        <b>Test case {{ numberOfSizes * 2 + index }}</b>
        <template v-if="colors.primaryColor && !colors.secondaryColor">
          <p class="test-app-style">only primary color ({{ colors.primaryColor }}: {{colorsMatchingCode[colors.primaryColor]}})</p>
          <NckIcon
            iconName="add-plus"
            :iconSize="IconSize.M"
            :primaryColor="colors.primaryColor"
            iconAltText=""
          />
        </template>
        <template v-else-if="!colors.primaryColor && colors.secondaryColor">
          <p class="test-app-style">
            only secondary color ({{ colors.secondaryColor }}: {{colorsMatchingCode[colors.secondaryColor]}}) with default
            color for the rest
          </p>
          <NckIcon
            iconName="airport-rail"
            :iconSize="IconSize.M"
            :secondaryColor="colors.secondaryColor"
            iconAltText=""
          />
        </template>
        <template v-else-if="colors.primaryColor && colors.secondaryColor">
          <p class="test-app-style">
            primary ({{ colors.primaryColor }}: {{colorsMatchingCode[colors.primaryColor]}}) &
            secondary color ({{ colors.secondaryColor }}: {{colorsMatchingCode[colors.secondaryColor]}})
          </p>
          <NckIcon
            iconName="amenity-entertainment-dark"
            :iconSize="IconSize.M"
            :primaryColor="colors.primaryColor"
            :secondaryColor="colors.secondaryColor"
            iconAltText=""
          />
        </template>
      </div>

      <b>All occurrences of a given icon display at the same time, not progressively</b>
      <div :data-test-case="34">
        <b>Test case 34</b>
        <div>
          <NckIcon
            v-for="i in 150"
            :key="i"
            iconName="add-plus"
            :iconSize="IconSize.M"
            iconAltText=""
          />
        </div>
      </div>

      <div :data-test-case="35">
        <b>Test case 35</b>
        <p class="test-app-style">
          When icon is loaded & displayed, an iconContentLoaded event is raised.
        </p>
        <div>
          <NckIcon
            iconName="direction-filled"
            :iconSize="IconSize.M"
            iconAltText=""
            @iconContentLoaded="iconLoaded = true"
          />
          <div>{{ iconLoaded ? "Icon loaded" : "Icon not loaded yet" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-test {
  .icon-test-container {
    background: lightgrey;

    .test {
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
}
</style>

<script setup lang="ts">
import { NckIcon, IconSize, IconColors } from "@neotechnologygroup/neo-component-kit";
import { computed, ref } from "vue";

const ICON_SIZE_VALUES = Object.values(IconSize);
// we temporarily delete yellow_50 from the list of colors for test page to
// work after the add of a new color, to be improved
const ICON_COLORS_VALUES = Object.values(IconColors).filter(color => color !== IconColors.YELLOW_50);

const iconLoaded = ref<boolean>(false);

const alternativeText = "alternative text";
const colorsArray: Array<{
  primaryColor?: IconColors;
  secondaryColor?: IconColors;
}> = [];

while (ICON_COLORS_VALUES.length > 0) {
  const firstCasePrimaryColor = ICON_COLORS_VALUES.shift();
  if (firstCasePrimaryColor) {
    colorsArray.push({ primaryColor: firstCasePrimaryColor });
  }

  const secondCaseSecondaryColor = ICON_COLORS_VALUES.shift();
  if (secondCaseSecondaryColor) {
    colorsArray.push({ secondaryColor: secondCaseSecondaryColor });
  }

  const thirdCasePrimaryColor = ICON_COLORS_VALUES.shift();
  const thirdCaseSecondaryColors = ICON_COLORS_VALUES.pop();
  if (thirdCasePrimaryColor ?? thirdCaseSecondaryColors) {
    colorsArray.push({
      primaryColor: thirdCasePrimaryColor,
      secondaryColor: thirdCaseSecondaryColors
    });
  }
}

const colorsMatchingCode = {
  "deep-blue-400": "#001245",
  "deep-blue-300": "#00175A",
  "deep-blue-200": "#99ACE3",
  "deep-blue-100": "#EAEFFF",

  "bright-blue-400": "#0056A0",
  "bright-blue-300": "#006FCF",
  "bright-blue-200": "#7DC3FF",
  "bright-blue-100": "#ECF6FF",

  "blue-grey-700": "#1A233E",
  "blue-grey-600": "#444B61",
  "blue-grey-500": "#848996",
  "blue-grey-400": "#C6C8D2",
  "blue-grey-300": "#E7E8EE",
  "blue-grey-200": "#F0F1F4",
  "blue-grey-100": "#F8F9FB",
  white: "#FFFFFF",

  "green-400": "#005F45",
  "green-300": "#00825F",
  "green-200": "#94D8C5",
  "green-100": "#ECFBF4",

  "orange-400": "#C43D0A",
  "orange-300": "#F85D22",
  "orange-200": "#FFB69A",
  "orange-100": "#FFEFE9",

  "red-400": "#9E0000",
  "red-300": "#CF0000",
  "red-200": "#FE9D9D",
  "red-100": "#FAE5E7",

  "yellow-400": "#916400",
  "yellow-300": "#FFBA00",
  "yellow-200": "#FFE399",
  "yellow-100": "#FFF6DE",
  "yellow-50": "#FFFCF3",

  "ink-100": "#282D3A",
  "ink-70": "#282D3AB2",
  "ink-40": "#282D3A66"
};

function getSizeIndex(size: IconSize) {
  return ICON_SIZE_VALUES.indexOf(size);
}

const numberOfSizes = computed(() => {
  return Object.values(IconSize).length;
});
</script>
