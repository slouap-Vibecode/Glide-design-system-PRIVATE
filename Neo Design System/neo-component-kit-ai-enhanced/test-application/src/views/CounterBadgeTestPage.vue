<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div v-for="(testCase, index) in testCases" :key="index" :test-case="index" :style="testCase.style">
      <div>
        <b>Test case {{ index }}</b>
        {{ description(testCase) }}
      </div>
      <NckCounterBadge
        :entry=testCase.entry
        :fontColor="testCase.fontColor"
        :backgroundColor="testCase.backgroundColor"
        :plusPrefix="testCase.plusPrefix"
        :size="testCase.size"
      ></NckCounterBadge>
    </div>
  </div>
</template>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
}

.separator {
  border: 1px solid black;
}
</style>

<script setup lang="ts">
import { Colors, CounterBadgeSize, NckCounterBadge } from "@neotechnologygroup/neo-component-kit";

interface CounterBadgeTestDescription {
  entry: number;
  plusPrefix?: boolean;
  fontColor?: Colors;
  backgroundColor?: Colors;
  style?: string;
  size?: CounterBadgeSize;
}

const colorsMatchingCode: Record<Colors, string> = {
  "deep-blue-400": "#001245",
  "deep-blue-300": "#00175A",
  "deep-blue-200": "#99ACE3",
  "deep-blue-150": "#D0DBFF",
  "deep-blue-100": "#EAEFFF",

  "bright-blue-400": "#0056A0",
  "bright-blue-300": "#006FCF",
  "bright-blue-200": "#7DC3FF",
  "bright-blue-150": "#DCF0FF",
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
  "green-150": "#CAEEE4",
  "green-100": "#ECFBF4",

  "orange-400": "#C43D0A",
  "orange-300": "#F85D22",
  "orange-200": "#FFB69A",
  "orange-150": "#FFD2C0",
  "orange-100": "#FFEFE9",

  "red-400": "#9E0000",
  "red-300": "#CF0000",
  "red-200": "#FE9D9D",
  "red-150": "#FFC3C3",
  "red-100": "#FAE5E7",
  
  "yellow-400": "#916400",
  "yellow-300": "#FFBA00",
  "yellow-200": "#FFE399",
  "yellow-150": "#FFF1CC",
  "yellow-100": "#FFF6DE",
  "yellow-50": "#FFFCF3",

  "ink-100": "#282D3A",
  "ink-70": "#282D3AB2",
  "ink-40": "#282D3A66"
};

const testCases: CounterBadgeTestDescription[] = [
  {
    entry: 42
  },
  {
    entry: 125
  },
  {
    entry: 2
  },
  {
    entry: 0
  },
  {
    entry: -22
  },
  {
    entry: 1.25
  },
  {
    entry: 9,
    fontColor: Colors.WHITE,
    backgroundColor: Colors.BRIGHT_BLUE_300,
    plusPrefix: false
  },
  {
    entry: 9,
    backgroundColor: Colors.GREEN_300,
    fontColor: Colors.WHITE,
    plusPrefix: false
  },
  {
    entry: 9,
    fontColor: Colors.WHITE,
    backgroundColor: Colors.ORANGE_300,
    plusPrefix: false
  },
  {
    entry: 9,
    fontColor: Colors.WHITE,
    backgroundColor: Colors.RED_300,
    plusPrefix: false
  },
  {
    entry: 9,
    fontColor: Colors.WHITE,
    backgroundColor: Colors.BLUE_GREY_500,
    plusPrefix: false
  },
  {
    entry: 9,
    fontColor: Colors.INK_100,
    backgroundColor: Colors.WHITE,
    plusPrefix: false,
    style: "background-color: lightgrey"
  },
  {
    entry: 0,
    plusPrefix: true
  },
  {
    entry: 5,
    plusPrefix: true
  },
  {
    entry: 125,
    plusPrefix: true
  },
  {
    entry: 9,
    size: CounterBadgeSize.XS
  },
  {
    entry: 125,
    size: CounterBadgeSize.XS
  },
  {
    entry: 9,
    size: CounterBadgeSize.S
  },
  {
    entry: 12,
    size: CounterBadgeSize.S,
    plusPrefix: true
  },
  {
    entry: 9,
    size: CounterBadgeSize.M
  },
  {
    entry: 125,
    size: CounterBadgeSize.M,
    plusPrefix: true
  },
  {
    entry: 9,
    size: CounterBadgeSize.L
  },
  {
    entry: 87,
    size: CounterBadgeSize.L,
    plusPrefix: true
  }
];

function description(testCase: CounterBadgeTestDescription) {
  let text = "";

  if (!testCase.backgroundColor && !testCase.fontColor) {
    text += "Default colors, ";
  }
  if (testCase.backgroundColor) {
    text += `Background color: ${colorsMatchingCode[testCase.backgroundColor]} (${testCase.backgroundColor}), `;
  }
  if (testCase.fontColor) {
    text += `font color: ${colorsMatchingCode[testCase.fontColor]} (${testCase.fontColor}), `;
  }

  text += `entry: ${testCase.entry}, `;

  text += `plusPrefix: ${testCase.plusPrefix ? "yes" : "no"}, `;

  text += `size: ${testCase.size ? testCase.size.toUpperCase() : "Default"}`;

  return text;
}

</script>
