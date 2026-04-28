<template>
  <div>
    <PreloadFontComponent />

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div v-for="(testCase, idx) in testCases" :key="'tc-' + idx" :data-test-case="idx">
      <div>
        <b>Test case {{ idx }}</b>
        {{testCase.testDescription}}
      </div>
      <div class="menu-container">
        <p v-if="idx === 2" class="test-app-style"><a href="javascript:void(0)" class="test-app-style before-menu">I am here as an anchor for auto test. My selector is ".before-menu".</a></p>
        <nck-menu
          :multiselect="testCase.multiselect"
          :items="testCase.items"
          :autoSelect="testCase.autoselect"
          :selectedValue="selectedValue[idx]"
          :maxHeight="testCase.size"
          @disabled-element-selected="updateEvents(idx, 'disabled-element-selected')"
          @menu-blurred="updateEvents(idx, 'menu-blurred')"
          @menu-dismissed="updateEvents(idx, 'menu-dismissed')"
          ref="menus"
          @element-selected="selected => updateSelectedValue(idx, selected)"
          :focusableByUser="testCase.focusableByUser"
          :navigateToFirstElementIfNoSelection="testCase.navigateToFirstElementIfNoSelection"
        />
      </div>
      <div>
        Emitted events:
        <p v-for="(event, index) in testCase.events" :key="'tc-' + idx + '-emit-' + index">
          {{event}}
        </p>
      </div>
      <div>
        <button @click="focusMenu(idx)" data-focus-menu-action>
          Focus menu
        </button>
      </div>
      <div>Selected value: {{selectedValue[idx]}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckMenu, INckMenu, IMenuItem, DividerToken, DIVIDER_TOKEN } from "@neotechnologygroup/neo-component-kit";
import PreloadFontComponent from "@/components/PreloadFontComponent.vue";

interface MenuTestDescription {
  items: Array<IMenuItem | DividerToken>;
  size: number | null;
  autoselect: boolean;
  testDescription: string;
  events: string[];
  multiselect: boolean;
  focusableByUser: boolean;
  navigateToFirstElementIfNoSelection?: boolean;
}

const menus = ref<InstanceType<typeof NckMenu> | null>(null);
const selectedValue = ref<Array<string | string[]>>([ "", "counter", "aloah", "", "", "", "", "", [ "short", "counter", "aloah", "newtest" ], "" ]);
const veryLongLabel = ref<string>("this will be very very very very very very very very very very " +
              "veeeeeeeeeeeery very very very very very very very very very very very very very very " +
              "very very very very very very very very very very very very very long");
const testCases = ref<MenuTestDescription[]>([
  // TC0
  {
    testDescription: "Default size, no sublabel, icons on the right, nothing disabled, no autoselection",
    size: null,
    items: [
      { label: "short", value: "short", trailingIcon: "add-plus" },
      { label: "counter", value: "counter", trailingCounterValue: 12 },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus"
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus"
      },
      { label: "aloah", value: "aloah", trailingIcon: "hotel" }
    ],
    autoselect: false,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC1
  {
    testDescription: "Default size, with sublabel, with icons on both side, some elements disabled, with autoselection",
    size: null,
    items: [
      {
        label: "short",
        value: "short",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil",
        subLabel: "sublabel",
        disabled: true
      },
      {
        label: "counter",
        value: "counter",
        trailingCounterValue: 12,
        leadingIcon: "edit-pencil",
        subLabel: "lalalala",
        disabled: true
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil",
        subLabel: "I am a sublabel"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil",
        subLabel: "This is sub label should be very long, like its label counter part." +
          "So we can check how it is behaving when it is overflowing. Because any text should be " +
          "able to overflow. This is good user experience, being able to read the content",
        disabled: true
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil",
        subLabel: "another sublabel",
        disabled: true
      },
      {
        label: "aloah",
        value: "aloah",
        trailingIcon: "hotel",
        leadingIcon: "edit-pencil",
        subLabel: "again a sublabel",
        disabled: true
      }
    ],
    autoselect: true,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC 2
  {
    testDescription: "Default size, no sublabel, icons on the left, no element disabled, no autoselection, can be focused by user (can be accessed with tab)",
    size: null,
    items: [
      {
        label: "short",
        value: "short",
        leadingIcon: "edit-pencil"
      },
      {
        label: "counter",
        value: "counter",
        leadingIcon: "edit-pencil"
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        leadingIcon: "edit-pencil"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        leadingIcon: "edit-pencil"
      },
      {
        label: "some other stuff",
        value: "boom",
        leadingIcon: "edit-pencil"
      },
      {
        label: "aloah",
        value: "aloah",
        leadingIcon: "edit-pencil"
      }
    ],
    autoselect: false,
    events: [],
    multiselect: false,
    focusableByUser: true
  },
  // TC 3
  {
    testDescription: "With custom size (5rem), no sublabel, icon on both side, no element disabled, with autoselection",
    size: 5,
    items: [
      {
        label: "short",
        value: "short",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil"
      },
      {
        label: "counter",
        value: "counter",
        trailingCounterValue: 12,
        leadingIcon: "edit-pencil"
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil"
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus",
        leadingIcon: "edit-pencil"
      },
      {
        label: "aloah",
        value: "aloah",
        trailingIcon: "hotel",
        leadingIcon: "edit-pencil"
      }
    ],
    autoselect: true,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC 4
  {
    testDescription: "Custom menu size (20rem), with sublabels, with icons on the left, some elements disabled, without autoselection",
    size: 20,
    items: [
      {
        label: "short",
        value: "short",
        leadingIcon: "edit-pencil",
        subLabel: "sublabel",
        disabled: true
      },
      {
        label: "counter",
        value: "counter",
        leadingIcon: "edit-pencil",
        subLabel: "lalalala",
        disabled: true
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        leadingIcon: "edit-pencil",
        subLabel: "I am a sublabel"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        leadingIcon: "edit-pencil",
        subLabel: "This is sub label should be very long, like its label counter part." +
          "So we can check how it is behaving when it is overflowing. Because any text should be " +
          "able to overflow. This is good user experience, being able to read the content",
        disabled: true
      },
      {
        label: "some other stuff",
        value: "boom",
        leadingIcon: "edit-pencil",
        subLabel: "another sublabel",
        disabled: true
      },
      {
        label: "aloah",
        value: "aloah",
        leadingIcon: "edit-pencil",
        subLabel: "again a sublabel",
        disabled: true
      }
    ],
    autoselect: false,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC 5
  {
    testDescription: "Custom size (20rem), no sublabel, with icons on the left, no element disabled, with autoselection, with two dividers",
    size: 20,
    items: [
      {
        label: "short",
        value: "short",
        leadingIcon: "edit-pencil"
      },
      {
        label: "counter",
        value: "counter",
        leadingIcon: "edit-pencil"
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        leadingIcon: "edit-pencil"
      },
      DIVIDER_TOKEN,
      {
        label: veryLongLabel.value,
        value: "long",
        leadingIcon: "edit-pencil"
      },
      {
        label: "some other stuff",
        value: "boom",
        leadingIcon: "edit-pencil"
      },
      DIVIDER_TOKEN,
      {
        label: "aloah",
        value: "aloah",
        leadingIcon: "edit-pencil"
      }
    ],
    autoselect: true,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC 6
  {
    testDescription: "With custom menu size (5rem), with sublabels, with icons on the right, some elements disabled, without autoselection",
    size: 5,
    items: [
      {
        label: "short",
        value: "short",
        trailingIcon: "add-plus",
        subLabel: "sublabel",
        disabled: true
      },
      {
        label: "counter",
        value: "counter",
        trailingCounterValue: 12,
        subLabel: "lalalala",
        disabled: true
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus",
        subLabel: "I am a sublabel"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus",
        subLabel: "This is sub label should be very long, like its label counter part." +
          "So we can check how it is behaving when it is overflowing. Because any text should be " +
          "able to overflow. This is good user experience, being able to read the content",
        disabled: true
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus",
        subLabel: "another sublabel",
        disabled: true
      },
      {
        label: "aloah",
        value: "aloah",
        trailingIcon: "hotel",
        subLabel: "again a sublabel",
        disabled: true
      }
    ],
    autoselect: false,
    events: [],
    multiselect: false,
    focusableByUser: false
  },
  // TC 7
  {
    testDescription: "Multiselect menu, with custom menu size (10rem), with sublabels, with icons on the right, some elements disabled, without autoselection",
    size: 10,
    items: [
      {
        label: "short",
        value: "short",
        trailingIcon: "add-plus",
        subLabel: "sublabel"
      },
      {
        label: "counter",
        value: "counter",
        trailingCounterValue: 12,
        subLabel: "lalalala"
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus",
        subLabel: "I am a sublabel"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus",
        subLabel: "This is sub label should be very long, like its label counter part." +
          "So we can check how it is behaving when it is overflowing. Because any text should be " +
          "able to overflow. This is good user experience, being able to read the content"
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus",
        subLabel: "another sublabel"
      },
      {
        label: "aloah",
        value: "aloah",
        trailingIcon: "hotel",
        subLabel: "again a sublabel",
        disabled: true
      }
    ],
    autoselect: false,
    events: [],
    multiselect: true,
    focusableByUser: false
  },
  // TC 8
  {
    testDescription: "Multiselect menu, with preselected values, some with sublabels, with icons on the right, some elements disabled, without autoselection",
    size: null,
    items: [
      {
        label: "short",
        value: "short",
        trailingIcon: "add-plus"
      },
      {
        label: "counter",
        value: "counter",
        trailingCounterValue: 12
      },
      {
        label: "ah! press A and you will jump to me",
        value: "a",
        trailingIcon: "add-plus"
      },
      {
        label: veryLongLabel.value,
        value: "long",
        trailingIcon: "add-plus",
        subLabel: "This is sub label should be very long, like its label counter part." +
          "So we can check how it is behaving when it is overflowing. Because any text should be " +
          "able to overflow. This is good user experience, being able to read the content"
      },
      {
        label: "some other stuff",
        value: "boom",
        trailingIcon: "add-plus",
        subLabel: "another sublabel"
      },
      {
        label: "aloah",
        value: "aloah",
        trailingIcon: "hotel",
        subLabel: "again a sublabel",
        disabled: true
      },
      {
        label: "newtest",
        value: "newtest",
        trailingIcon: "hotel",
        subLabel: "again a new test"
      }
    ],
    autoselect: false,
    events: [],
    multiselect: true,
    focusableByUser: false
  },
  // TC 9
  {
    testDescription: "Default size, no sublabel, no icons, no item disabled, no autoselection, will not navigate to the first non disabled item on its own",
    size: null,
    items: [
      { label: "short", value: "short" },
      { label: "aloah", value: "aloah" },
      { label: "counter", value: "counter" },
      { label: veryLongLabel.value, value: "long" },
      { label: "some other stuff", value: "boom" },
      { label: "ah! press A and you will jump to me", value: "a" }
    ],
    autoselect: false,
    events: [],
    multiselect: false,
    focusableByUser: false,
    navigateToFirstElementIfNoSelection: false
  }
]);

function focusMenu(idx: number) {
  if (Array.isArray(menus.value)) {
    const menu = menus.value[idx];
    if (menu) {
      (menu as INckMenu).focusMenu();
    }
  }
}

function updateSelectedValue(idx: number, newValue: unknown | unknown[]) {
  selectedValue.value[idx] = newValue;
}

function updateEvents(idx: number, event: string) {
  testCases.value[idx].events.push(event);
}
</script>

<style lang="less">
.button-page {
  [data-test-case] {
    padding: 0 0.5rem 2rem;
    overflow: hidden; /* this will make sure we display the same thing that backstopjs sees */
  }
}
</style>
