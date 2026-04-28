<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        Error case : link label without link aria-role
      </div>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to display error</button>
      <nck-banner v-if="displayedTestCases[0]" type="critical" heading="The aria role is missing" linkLabel="error case #1 for heading link" @link-clicked="onLinkClicked"></nck-banner>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        Error case : link label without a click handler
      </div>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to display error</button>
      <nck-banner v-if="displayedTestCases[1]" type="critical" heading="The handler is missing" linkLabel="error case #2 for heading link" linkAriaRole="link"></nck-banner>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        Error case : item link label without link aria-role
      </div>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to display error</button>
      <nck-banner v-if="displayedTestCases[2]" type="critical" heading="This should fail">
        <nck-banner-item-group>
          <nck-banner-item text="The aria role is missing" linkLabel="error case #1 for item links" @link-clicked="onLinkClicked" />
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        Error case : item link label without click handler
      </div>
      <button class="test-app-style" @click="displayedTestCases[3] = !displayedTestCases[3]">Toggle test case 3 to display error</button>
      <nck-banner v-if="displayedTestCases[3]" type="critical" heading="This should fail">
        <nck-banner-item-group>
          <nck-banner-item text="The click handler role is missing" linkLabel="error case #2 for item links" linkAriaRole="link" />
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        Error case : nck-banner contains unwanted markup
      </div>
      <button class="test-app-style" @click="displayedTestCases[4] = !displayedTestCases[4]">Toggle test case 4 to display error</button>
      <nck-banner v-if="displayedTestCases[4]" type="critical" heading="This should fail">
        <nck-banner-item-group>
          <nck-banner-item text="There should be a unique nck-banner-item-group" />
        </nck-banner-item-group>
        (This text should be deleted but...)
        <p class="test-app-style">This &lt;p&gt; tag here will cause an error</p>
      </nck-banner>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        Error case : nck-banner-item-group contains unwanted markup
      </div>
      <button class="test-app-style" @click="displayedTestCases[5] = !displayedTestCases[5]">Toggle test case 5 to display error</button>
      <nck-banner v-if="displayedTestCases[5]" type="critical" heading="This should fail">
        <nck-banner-item-group>
          <nck-banner-item text="There should be only nck-banner-item elements inside the nck-banner-item-group" />
          (This text should be deleted but...)
          <p class="test-app-style">This &lt;p&gt; tag here will cause an error</p>
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        Error case : nck-banner with leadingIconAltText but no leadingIcon
      </div>
      <button class="test-app-style" @click="displayedTestCases[6] = !displayedTestCases[6]">Toggle test case 6 to display error</button>
      <nck-banner v-if="displayedTestCases[6]" type="success" heading="This should fail" leading-icon-alt-text="I forgot the icon"></nck-banner>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckBanner, NckBannerItemGroup, NckBannerItem } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);

function onLinkClicked(_event: Event) {
  return null;
}
</script>

<style scoped lang="less">
[data-test-case] {
  margin-bottom: 55px;
  & button {
    margin-bottom: 5px;
  }
}

.separator {
  border: 1px solid black;
}
</style>
