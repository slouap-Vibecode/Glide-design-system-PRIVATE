<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <h1>Chip popover test page</h1>

    <p>
      Error test cases have been put on
      <router-link class="test-app-style" to="/chip-popover-errors">
        another page right here
      </router-link>
    </p>

    <div data-test-case="0">
      <div>
        <b>Test case 0</b>
        <p class="test-app-style">
          Popover size: default, counter: 2, header, footer, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[0]"
        label="Popover size: default, counter: 2, header, footer, popover title"
        :trailingCounterValue="2"
        headerVisible
        popoverTitle="Title"
      >
        <template #popover-body>
          Popover size: default, counter: 2, header, footer, popover title
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1</b>
        <p class="test-app-style">
          Popover size: L, active, disabled, counter: 100, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[1]"
        label="Popover size: L, active, disabled, counter: 100, footer"
        active
        disabled
        :trailingCounterValue="100"
        :popoverSize="PopoverSize.L"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active, disabled, counter: 100, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2</b>
        <p class="test-app-style">
          Popover size: M, active, left icon, header, popover title
        </p>
      </div>

      <NckChipPopover
        ref="focusableChip"
        v-model="values[2]"
        label="Popover size: M, active, left icon, header, popover title"
        :active="testCase2Active"
        leftIconName="dollar"
        :popoverSize="PopoverSize.M"
        headerVisible
        popoverTitle="Title"
        clearIconAltText="Clear state"
        @chip-cleared="clearThirdChip"
      >
        <template #popover-body>
          Popover size: M, active, left icon, header, popover title
        </template>
      </NckChipPopover>
      <p>
        <button data-test-enable-chip-popover @click="testCase2Active = true">Enable this chip popover</button>
      </p>
      <p>
        <button data-test-focus-chip-popover @click="focusThirdChip">Focus this chip popover</button>
      </p>
      <div v-if="chipClearedDisplay">Chip popover has been cleared.</div>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3</b>
        <p class="test-app-style">
          Popover size: L, active, disabled, counter: 10, header, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[3]"
        label="Popover size: L, active, disabled, counter: 10, header, footer"
        active
        disabled
        :trailingCounterValue="10"
        :popoverSize="PopoverSize.L"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active, disabled, counter: 10, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        <p class="test-app-style">
          Popover size: FULL_WIDTH, active, left icon, header, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[4]"
        label="Popover size: FULL_WIDTH, active, left icon, header, footer"
        active
        leftIconName="dollar"
        :popoverSize="PopoverSize.FULL_WIDTH"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: FULL_WIDTH, active, left icon, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5</b>
        <p class="test-app-style">
          Popover size: FLUID_WIDTH, counter: 1e2, header, footer, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[5]"
        label="Popover size: FLUID_WIDTH, counter: 1e2, header, footer, popover title"
        :trailingCounterValue="1e2"
        :popoverSize="PopoverSize.FLUID_WIDTH"
        headerVisible
        popoverTitle="Title"
      >
        <template #popover-body>
          Popover size: FLUID_WIDTH, counter: 1e2, header, footer, popover title
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        <p class="test-app-style">
          Popover size: M, disabled, left icon, counter: 99, header
        </p>
      </div>

      <NckChipPopover
        v-model="values[6]"
        label="Popover size: M, disabled, left icon, counter: 99, header"
        disabled
        leftIconName="dollar"
        :trailingCounterValue="99"
        :popoverSize="PopoverSize.M"
        headerVisible
      >
        <template #popover-body>
          Popover size: M, disabled, left icon, counter: 99, header
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="7">
      <div>
        <b>Test case 7</b>
        <p class="test-app-style">Popover size: XL, disabled, header, footer</p>
      </div>

      <NckChipPopover
        v-model="values[7]"
        label="Popover size: XL, disabled, header, footer"
        disabled
        :popoverSize="PopoverSize.XL"
        headerVisible
      >
        <template #popover-body>
          Popover size: XL, disabled, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="8">
      <div>
        <b>Test case 8</b>
        <p class="test-app-style">
          Popover size: FLUID_WIDTH, active, disabled, header, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[8]"
        label="Popover size: FLUID_WIDTH, active, disabled, header, footer"
        active
        disabled
        :popoverSize="PopoverSize.FLUID_WIDTH"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: FLUID_WIDTH, active, disabled, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="9">
      <div>
        <b>Test case 9</b>
        <p class="test-app-style">
          Popover size: L, active, disabled, left icon, counter:
          Number.MAX_SAFE_INTEGER, header
        </p>
      </div>

      <NckChipPopover
        v-model="values[9]"
        label="Popover size: L, active, disabled, left icon, counter: Number.MAX_SAFE_INTEGER, header"
        active
        disabled
        leftIconName="dollar"
        :trailingCounterValue="Number.MAX_SAFE_INTEGER"
        :popoverSize="PopoverSize.L"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active, disabled, left icon, counter:
          Number.MAX_SAFE_INTEGER, header
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="10">
      <div>
        <b>Test case 10</b>
        <p class="test-app-style">
          Popover size: L, active, disabled, left icon, header
        </p>
      </div>

      <NckChipPopover
        v-model="values[10]"
        label="Popover size: L, active, disabled, left icon, header"
        active
        disabled
        leftIconName="dollar"
        :popoverSize="PopoverSize.L"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active, disabled, left icon, header
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="11">
      <div>
        <b>Test case 11</b>
        <p class="test-app-style">
          Popover size: XL, active, counter: 0xa, header, footer, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[11]"
        label="Popover size: XL, active, counter: 0xa, header, footer, popover title"
        active
        :trailingCounterValue="0xa"
        :popoverSize="PopoverSize.XL"
        headerVisible
        popoverTitle="Title"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: XL, active, counter: 0xa, header, footer, popover title
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="12">
      <div>
        <b>Test case 12</b>
        <p class="test-app-style">
          Popover size: default, left icon, header, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[12]"
        label="Popover size: default, left icon, header, footer"
        leftIconName="dollar"
        headerVisible
      >
        <template #popover-body>
          Popover size: default, left icon, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="13">
      <div>
        <b>Test case 13</b>
        <p class="test-app-style">
          Popover size: M, disabled, counter: 10 ** 2, header, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[13]"
        label="Popover size: M, disabled, counter: 10 ** 2, header, footer"
        disabled
        :trailingCounterValue="10 ** 2"
        :popoverSize="PopoverSize.M"
        headerVisible
      >
        <template #popover-body>
          Popover size: M, disabled, counter: 10 ** 2, header, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="14">
      <div>
        <b>Test case 14</b>
        <p class="test-app-style">
          Popover size: L, left icon, header, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[14]"
        label="Popover size: L, left icon, header, popover title"
        leftIconName="dollar"
        :popoverSize="PopoverSize.L"
        headerVisible
        popoverTitle="Title"
      >
        <template #popover-body>
          Popover size: L, left icon, header, popover title
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="15">
      <div>
        <b>Test case 15</b>
        <p class="test-app-style">
          Popover size: M, disabled, counter: 0x10, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[15]"
        label="Popover size: M, disabled, counter: 0x10, footer"
        disabled
        :trailingCounterValue="0x10"
        :popoverSize="PopoverSize.M"
      >
        <template #popover-body>
          Popover size: M, disabled, counter: 0x10, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="16">
      <div>
        <b>Test case 16</b>
        <p class="test-app-style">
          Popover size: L, left icon, counter: Number.MAX_SAFE_INTEGER + 1,
          header, footer, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[16]"
        label="Popover size: L, left icon, counter: Number.MAX_SAFE_INTEGER + 1, header, footer, popover title"
        leftIconName="dollar"
        :trailingCounterValue="Number.MAX_SAFE_INTEGER + 1"
        :popoverSize="PopoverSize.L"
        headerVisible
        popoverTitle="Title"
      >
        <template #popover-body>
          Popover size: L, left icon, counter: Number.MAX_SAFE_INTEGER + 1,
          header, footer, popover title
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="17">
      <div>
        <b>Test case 17</b>
        <p class="test-app-style">
          Popover size: XL, active, left icon, counter: 0o10, header
        </p>
      </div>

      <NckChipPopover
        v-model="values[17]"
        label="Popover size: XL, active, left icon, counter: 0o10,
          header"
        active
        leftIconName="dollar"
        :trailingCounterValue="0o10"
        :popoverSize="PopoverSize.XL"
        headerVisible
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: XL, active, left icon, counter: 0o10, header
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="18">
      <div>
        <b>Test case 18</b>
        <p class="test-app-style">
          Popover size: FULL_WIDTH, active, disabled, counter: Number.MAX_VALUE,
          header, footer, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[18]"
        label="Popover size: FULL_WIDTH, active, disabled, counter: Number.MAX_VALUE, header, footer, popover title"
        active
        disabled
        :trailingCounterValue="Number.MAX_VALUE"
        :popoverSize="PopoverSize.FULL_WIDTH"
        headerVisible
        popoverTitle="Title"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: FULL_WIDTH, active, disabled, counter: Number.MAX_VALUE,
          header, footer, popover title
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="19">
      <div>
        <b>Test case 19</b>
        <p class="test-app-style">
          Popover size: FLUID_WIDTH, active, left icon, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[19]"
        label="Popover size: FLUID_WIDTH, active, left icon, footer"
        active
        leftIconName="dollar"
        :popoverSize="PopoverSize.FLUID_WIDTH"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: FLUID_WIDTH, active, left icon, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="20">
      <div>
        <b>Test case 20</b>
        <p class="test-app-style">
          Popover size: M, active, disabled, header, popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[20]"
        label="Popover size: M, active, disabled, header, popover title"
        active
        disabled
        :popoverSize="PopoverSize.M"
        headerVisible
        popoverTitle="Title"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: M, active, disabled, header, popover title
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="21">
      <div>
        <b>Test case 21</b>
        <p class="test-app-style">
          Popover size: L, active, disabled, left icon, counter: 0b10, footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[21]"
        label="Popover size: L, active, disabled, left icon, counter: 0b10, footer"
        active
        disabled
        leftIconName="dollar"
        :trailingCounterValue="0b10"
        :popoverSize="PopoverSize.L"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active, disabled, left icon, counter: 0b10, footer
        </template>
        <template #popover-footer> Footer </template>
      </NckChipPopover>
    </div>

    <div data-test-case="22">
      <div>
        <b>Test case 22</b>
        <p class="test-app-style">
          Popover size: M, active, counter: Number.MAX_VALUE + 1, header,
          popover title
        </p>
      </div>

      <NckChipPopover
        v-model="values[22]"
        label="Popover size: M, active, counter: Number.MAX_VALUE + 1, header, popover title"
        active
        :trailingCounterValue="Number.MAX_VALUE + 1"
        :popoverSize="PopoverSize.M"
        headerVisible
        popoverTitle="Title"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: M, active, counter: Number.MAX_VALUE + 1, header,
          popover title
        </template>
      </NckChipPopover>
    </div>

    <ShadowDom>
      <div data-test-case="23">
        <div>
          <b>Test case 23</b>
          <p class="test-app-style">
            We should be able to click on the popover without closing it when used with shadow DOM
          </p>
        </div>
        <NckChipPopover
          v-model="values[23]"
          label="open me"
          active
          :trailingCounterValue="Number.MAX_VALUE + 1"
          :popoverSize="PopoverSize.M"
          headerVisible
          popoverTitle="Title"
          clearIconAltText="Clear state"
          @chip-cleared="() => {}"
        >
          <template #popover-body>You can click on me ! :)</template>
          <template #popover-footer>
            <nck-button label="Button"></nck-button>
          </template>
        </NckChipPopover>
      </div>
    </ShadowDom>

    <div data-test-case="24">
      <div>
        <b>Test case 24</b>
        <p class="test-app-style">
          Popover size: M, active, menuPosition: BOTTOM_RIGHT
        </p>
      </div>

      <NckChipPopover
        v-model="values[24]"
        label="Popover size: M, active, menuPosition: BOTTOM_RIGHT"
        active
        :popoverSize="PopoverSize.M"
        :menuPosition="MenuPosition.BOTTOM_RIGHT"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: M, active
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="25">
      <div>
        <b>Test case 25</b>
        <p class="test-app-style">
          Popover size: L, active, menuPosition: TOP_LEFT
        </p>
      </div>

      <NckChipPopover
        v-model="values[25]"
        label="Popover size: L, active, menuPosition: TOP_LEFT"
        active
        :popoverSize="PopoverSize.L"
        :menuPosition="MenuPosition.TOP_LEFT"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: L, active
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="26">
      <div>
        <b>Test case 26</b>
        <p class="test-app-style">
          Popover size: FLUID_WIDTH, active, menuPosition: TOP_RIGHT
        </p>
      </div>

      <NckChipPopover
        v-model="values[26]"
        label="Popover size: FLUID_WIDTH, active, menuPosition: TOP_RIGHT"
        active
        :popoverSize="PopoverSize.FLUID_WIDTH"
        :menuPosition="MenuPosition.TOP_RIGHT"
        clearIconAltText="Clear state"
        @chip-cleared="() => {}"
      >
        <template #popover-body>
          Popover size: FLUID_WIDTH, active
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="27">
      <div>
        <b>Test case 27</b>
        <p class="test-app-style">
          Small chip with M popover and footer
        </p>
      </div>

      <NckChipPopover
        v-model="values[27]"
        label="Small chip"
        :popoverSize="PopoverSize.M"
      >
        <template #popover-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </template>
        <template #popover-footer>
          Footer
        </template>
      </NckChipPopover>
    </div>

    <div data-test-case="28">
      <div>
        <b>Test case 28</b>
        <p class="test-app-style">
          Small chip with fluid popover containing wide content and header
        </p>
      </div>

      <NckChipPopover
        v-model="values[28]"
        label="Small chip"
        :popoverSize="PopoverSize.FLUID_WIDTH"
        headerVisible
        popoverTitle="Lorem ipsum dolor sit amet,"
      >
        <template #popover-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </template>
      </NckChipPopover>
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  padding: 0.1875rem;
  padding-bottom: 12rem;
}
</style>

<script setup lang="ts">
import { MenuPosition, NckChipPopover, INckChipPopover, PopoverSize, NckButton } from "@neotechnologygroup/neo-component-kit";
import ShadowDom from "@/components/ShadowDomComponent.vue";
import { ref } from "vue";

const nbTestCases = 29;
const values = ref<boolean[]>(new Array(nbTestCases).fill(false));
const focusableChip = ref<INckChipPopover>();
const chipClearedDisplay = ref<boolean>(false);
const testCase2Active = ref<boolean>(true);

function clearThirdChip() {
  chipClearedDisplay.value = true;
  testCase2Active.value = false;
}

function focusThirdChip() {
  focusableChip.value?.focus();
}
</script>
