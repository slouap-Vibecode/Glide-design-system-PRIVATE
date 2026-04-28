<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/badge-errors">another page right here</router-link>
    </div>

    <div class="preload">
      Trying to trick chrome into loading font weight in advance.
    </div>
    <i>Also for italics</i>
    <h1 class="test-app-style">Overflowing badge</h1>
    <div data-test-group="overflow" data-test-case="0">
      <div>
        <b>Test case 0</b>
        <br />
        In a very restricted area, so that it overflows. displaying
        {{ "this is test case " }}
        With default background color, default font color, and no border
        (default)
      </div>
      <div class="restricted-container">
        <NckBadge
          label="this is a very very long text in a very narrow space so it should overflow"
        />
      </div>
    </div>

    <!-- Deprecated - TO BE REPLACED -->
    <h1 class="test-app-style">
      Main use cases requested by the
      <a href="https://zeroheight.com/7438b0a5c/p/182bbe-badge/t/25182a"
        >Design System</a
      >. Should be restricted to these use case in the near future.
    </h1>
    <div data-test-group="main">
      <div data-test-case="1">
        <div>
          <b>Test case 1</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.BRIGHT_BLUE_300] }} ({{
            Colors.BRIGHT_BLUE_300
          }}), font color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}),
          <span>No border</span>
        </div>
        <NckBadge
          :label="'this is test case 1'"
          :fontColor="Colors.WHITE"
          :backgroundColor="Colors.BRIGHT_BLUE_300"
        />
      </div>

      <div data-test-case="2">
        <div>
          <b>Test case 2</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.GREEN_300] }} ({{
            Colors.GREEN_300
          }}), font color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}),
          <span>No border</span>
        </div>
        <NckBadge
          :label="'this is test case 2'"
          :fontColor="Colors.WHITE"
          :backgroundColor="Colors.GREEN_300"
        />
      </div>

      <div data-test-case="3">
        <div>
          <b>Test case 3</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.ORANGE_300] }} ({{
            Colors.ORANGE_300
          }}), font color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}),
          <span>No border</span>
        </div>
        <NckBadge
          :label="'this is test case 3'"
          :fontColor="Colors.WHITE"
          :backgroundColor="Colors.ORANGE_300"
        />
      </div>

      <div data-test-case="4">
        <div>
          <b>Test case 4</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.RED_300] }} ({{
            Colors.RED_300
          }}), font color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}),
          <span>No border</span>
        </div>
        <NckBadge
          :label="'this is test case 4'"
          :fontColor="Colors.WHITE"
          :backgroundColor="Colors.RED_300"
        />
      </div>

      <div data-test-case="5">
        <div>
          <b>Test case 5</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.BLUE_GREY_500] }} ({{
            Colors.BLUE_GREY_500
          }}), font color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}),
          <span>No border</span>
        </div>
        <NckBadge
          :label="'this is test case 5'"
          :fontColor="Colors.WHITE"
          :backgroundColor="Colors.BLUE_GREY_500"
        />
      </div>

      <div data-test-case="6">
        <div>
          <b>Test case 6</b>
          <br />
          Background color: {{ colorsMatchingCode[Colors.WHITE] }} ({{
            Colors.WHITE
          }}), font color: {{ colorsMatchingCode[Colors.INK_100] }} ({{
            Colors.INK_100
          }}),
          <span
            >Border color: {{ colorsMatchingCode[Colors.BLUE_GREY_600] }} ({{
              Colors.BLUE_GREY_600
            }})</span
          >
        </div>
        <NckBadge
          :label="'this is test case 6'"
          :fontColor="Colors.INK_100"
          :backgroundColor="Colors.WHITE"
          :borderColor="Colors.BLUE_GREY_600"
        />
      </div>
    </div>

    <div data-test-group="tooltips">
      <h1 class="test-app-style">
        Badge using the tooltip directive and the interactive option
      </h1>
      <div :data-test-case="7">
        <div>
          <b>Test case 7</b>
          <br />
          Badge with info tooltip as the directive and interactive
        </div>
        <NckBadge
          label="badge with info tooltip as directive"
          interactive
          v-nck-info-tooltip="'hello tooltip directive'"
        />
      </div>
      <div data-test-case="8">
        <div>
          <b>Test case 8</b>
          <br />
          Badge which is set focusable and interactive
        </div>
        <NckBadge
          label="badge with info tooltip as directive"
          interactive
          tabindex="0"
        />
      </div>
    </div>

    <div data-test-group="colors">
      <h1 class="test-app-style">Color badges</h1>

      <div
        v-for="(colorBadge, index) in colorBadges"
        :key="index"
        :data-test-case="index + 9"
      >
        <div>
          <b>Test case {{ index + 9 }}</b>
          <br />
          color: <i v-text="colorBadge.color" />, type:
          <i v-text="colorBadge.type" />, interactive:
          <i v-text="colorBadge.interactive" />
        </div>
        <nck-badge
          :label="`Test case ${index + 9}`"
          :color="colorBadge.color"
          :type="colorBadge.type"
          :interactive="colorBadge.interactive"
        />
      </div>
    </div>

    <div data-test-group="leading-icon">
      <h1 class="test-app-style">Badges with leading icon</h1>

      <div
        v-for="(badge, index) in badgesWithLeadingIcon"
        :key="index"
        :data-test-case="index + 17"
      >
        <div>
          <b>Test case {{ index + 17 }}</b>
          <br />
          color: <i v-text="badge.color" />, type: <i v-text="badge.type" />,
          interactive:
          <i v-text="badge.interactive" />
        </div>
        <nck-badge
          :label="badge.label ? `Test case ${index + 17}` : undefined"
          leadingIcon="dollar"
          leadingIconAltText="Dollar sign"
          :color="badge.color"
          :type="badge.type"
          :interactive="badge.interactive"
        />
      </div>
    </div>

    <div data-test-group="trailing-icon">
      <h1 class="test-app-style">Badges with trailing icon</h1>

      <div
        v-for="(badge, index) in badgesWithTrailingIcon"
        :key="index"
        :data-test-case="index + 25"
      >
        <div>
          <b>Test case {{ index + 25 }}</b>
          <br />
          color: <i v-text="badge.color" />, type: <i v-text="badge.type" />
        </div>
        <nck-badge
          :label="`Test case ${index + 25}${badge.clickEvent ? ' - this one is clickable' : ''}`"
          ariaRole="button"
          trailingIcon="info-support"
          trailingIconAltText="More information"
          :color="badge.color"
          :type="badge.type"
          @[badge.clickEvent]="badgeClicked"
        />
      </div>
    </div>

    <div data-test-group="both-icons">
      <h1 class="test-app-style">Badges with both icons</h1>

      <div
        v-for="(badge, index) in badgesWithBothIcons"
        :key="index"
        :data-test-case="index + 28"
      >
        <div>
          <b>Test case {{ index + 28 }}</b>
          <br />
          color: <i v-text="badge.color" />, type: <i v-text="badge.type" />
        </div>
        <nck-badge
          :label="`Test case ${index + 28}${badge.clickEvent ? ' - this one is clickable' : ''}`"
          ariaRole="button"
          leadingIcon="dollar"
          leadingIconAltText="Dollar sign"
          trailingIcon="info-support"
          trailingIconAltText="More information"
          :color="badge.color"
          :type="badge.type"
          @[badge.clickEvent]="badgeClicked"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.preload {
  font-weight: 600;
}

[data-test-case] {
  margin-bottom: 22px;
}

.restricted-container {
  width: 100px;
  margin: auto;
}

.separator {
  border: 1px solid black;
}

[data-test-group="tooltips"] [data-test-case] {
  padding: 2rem 0 4.5rem 0;
  border: 1px solid rgba(0, 0, 0, 0.33);
}
</style>

<script setup lang="ts">
import {
  NckBadge,
  Colors,
  NckInfoTooltip as vNckInfoTooltip,
  BadgeColor,
  BadgeType
} from "@neotechnologygroup/neo-component-kit";

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

const colorBadges = [
  { color: BadgeColor.GREEN, type: BadgeType.SUBTLE, interactive: false },
  { color: BadgeColor.ORANGE, type: BadgeType.SOLID, interactive: true },
  { color: BadgeColor.RED, type: BadgeType.OUTLINE, interactive: false },
  { color: BadgeColor.DEEP_BLUE, type: BadgeType.SUBTLE, interactive: true },
  { color: BadgeColor.WHITE, type: BadgeType.SOLID, interactive: false },
  { color: BadgeColor.YELLOW, type: BadgeType.SUBTLE, interactive: false },
  { color: BadgeColor.BLUE_GREY, type: BadgeType.SOLID, interactive: true },
  {
    color: BadgeColor.BRIGHT_BLUE,
    type: BadgeType.OUTLINE,
    interactive: false
  }
];

const badgesWithLeadingIcon = [
  {
    color: BadgeColor.BLUE_GREY,
    type: BadgeType.SOLID,
    interactive: false,
    label: true
  },
  {
    color: BadgeColor.BRIGHT_BLUE,
    type: BadgeType.OUTLINE,
    interactive: false,
    label: false
  },
  {
    color: BadgeColor.DEEP_BLUE,
    type: BadgeType.SOLID,
    interactive: true,
    label: false
  },
  {
    color: BadgeColor.GREEN,
    type: BadgeType.SUBTLE,
    interactive: false,
    label: false
  },
  {
    color: BadgeColor.ORANGE,
    type: BadgeType.OUTLINE,
    interactive: false,
    label: true
  },
  {
    color: BadgeColor.RED,
    type: BadgeType.OUTLINE,
    interactive: true,
    label: true
  },
  {
    color: BadgeColor.WHITE,
    type: BadgeType.SUBTLE,
    interactive: true,
    label: true
  },
  {
    color: BadgeColor.YELLOW,
    type: BadgeType.SUBTLE,
    interactive: false,
    label: true
  }
];

const badgesWithTrailingIcon = [
  { color: BadgeColor.GREEN, type: BadgeType.SOLID },
  { color: BadgeColor.ORANGE, type: BadgeType.SUBTLE, clickEvent: "click" },
  { color: BadgeColor.DEEP_BLUE, type: BadgeType.OUTLINE, clickEvent: "click" }
];

const badgesWithBothIcons = [
  { color: BadgeColor.WHITE, type: BadgeType.OUTLINE },
  { color: BadgeColor.YELLOW, type: BadgeType.SOLID, clickEvent: "click" },
  { color: BadgeColor.BRIGHT_BLUE, type: BadgeType.SUBTLE }
];

function badgeClicked() { alert('Thanks for clicking!'); };
</script>
