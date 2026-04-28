<script setup lang="ts">
import {
  ref,
  VNode,
  VNodeNormalizedChildren,
  watch,
  onBeforeMount,
  PropType,
  nextTick,
  onUpdated,
  computed,
  useSlots,
} from "vue";
import { AccessibilityHelper } from "../helpers/accessibilityHelper";
import { TabsType } from "../constants/tabsType";
import { ITabOptions } from "../models/iTabOptions";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import NckTabsContainer from "./internal/tabs/NckTabsContainer.vue";
import VNodeRenderer from "./internal/VNodeRenderer.vue";

/**
 * @component
 * @displayName nck-tabs
 * A component to display tabs along with their content.
 * This component manages the content switching when you click on a tab.
 *
 * Each tab is defined in a "nck-tab" sub-component along with its content.
 *
 * "nck-tab" sub-component can have the following options:
 *
 *    - heading (string): for the tab heading text
 *    - leadingIcon (string, optional): the icon displayed before the text
 *    - trailingCounterValue (number, optional): the value of the counter, after the text, if any is needed
 *    - trailingIcon (string, optional): the icon displayed after the text
 *    - click (as an event, v-on:click): an event emitted when this tab is clicked.
 *
 * Refer to the various examples to see how to define and use a tab with its different options.
 *
 * There are restrictions/warning to respect with some tabs type if you want to have a correct tab display:
 *
 *    - with "UniformFull" type, display should be limited to 4 tabs maximum. Otherwise it will overflow and
 *      won't display correctly on mobile devices or low resolution device or in a restricted container. This is due to
 *      tab having a minimal width.
 *
 * When the type is "Compact" or "CompactSide", and the tab container is not wide enough to display all the tabs,
 * all the overflowing tabs are grouped in the last tab, which expands a menu when clicked, this menu displaying
 * the aforementioned tabs. This specific tab is displayed and updated dynamically when the tab container is resized.
 * It has a configurable heading, which includes the number of the grouped tabs (see 'translations' below).
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *   - tabsMore : this is the heading of the last tab which is displayed when tabs overflow (the "more" menu). This
 *      wording will be passed through the "translateAndFormat" function. The following properties will be passed in the
 *      second argument:
 *        - count: the number of tabs in the menu.
 * - [Icons URL](#icons)
 */
const props = defineProps({
  /**
   * Style of the tabs
   */
  type: {
    required: true,
    type: String as PropType<TabsType>,
    validator: (val: TabsType) => Object.values(TabsType).includes(val),
  },

  /**
   * This options makes the content of any tab scrollable if it needs to overflow its parent container.
   *
   * You will usually use this when you have tabs that takes most of the page and you want your tabs to stick on
   * top while the content below should scroll.
   */
  scrollableContent: Boolean,

  /**
   * Hide the divider border
   */
  hideDivider: Boolean,

  /**
   * Preselect a tab. If the value changes then the selected tab will be updated.
   * Tab index starts at 0.
   *
   * Careful, it is not updated with the currently selected index of the tabs.
   */
  preselectedTabIndex: { type: Number, validator: (val: number) => val >= 0 },
});

const tabsOptions = ref<ITabOptions[]>([]);
// @ts-expect-error "Type instantiation is excessively deep and possibly infinite." is spawning due to recursiveness of type VNodeChildren
// I don't know why it was not failing before, and I am not finding a way yet to tell it it's okay
const contents = ref<VNodeNormalizedChildren[]>([]);
const selectedTabIndex = ref<number>(0);
const tabsContentElement = ref<HTMLElement | null>(null);
const tabContentId = `tabsContent_${AccessibilityHelper.generateId()}`;
const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());
let skipNextUpdate = false; // This variable SHOULD NOT be reactive to avoid infinite loop

function updateSelectedIndexTab() {
  if (props.preselectedTabIndex && Number.isInteger(props.preselectedTabIndex) && props.preselectedTabIndex >= 0) {
    selectedTabIndex.value = props.preselectedTabIndex;
  }
}

function initTabsContent() {
  if (
    defaultSlot.value &&
    defaultSlot.value.filter((node: VNode) => node.type === "nck-tab").length > 4 &&
    props.type === TabsType.UNIFORM_FULL
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: you are using NckTabs in 'UniformFull' style with more than 4 tabs. This will likely cause issue of display when screen width is constrained (mobile, tablet, small laptop screen or reduced browser window).",
    );
  }
  parseTabsContent();
}

function getTabConfigFromNodeData(node: VNode): ITabOptions {
  const nodeProps = node.props;
  const heading: string = nodeProps?.heading ?? "";
  let leadingIcon: string | undefined;
  let trailingCounterValue: string | undefined;
  const trailingIcon = typeof nodeProps?.trailingIcon === "string" ? nodeProps?.trailingIcon : undefined;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  let clickCallback: Function | undefined;

  if (nodeProps) {
    if (nodeProps.trailingCounterValue !== null && nodeProps.trailingCounterValue !== undefined) {
      trailingCounterValue = nodeProps.trailingCounterValue;
    }

    if (typeof nodeProps.leadingIcon === "string") {
      leadingIcon = nodeProps.leadingIcon;
    }
  }

  if (typeof nodeProps?.onClick === "function") {
    clickCallback = nodeProps.onClick;
  }

  return { heading, leadingIcon, trailingCounterValue, trailingIcon, clickCallback };
}

function parseTabsContent() {
  contents.value = [];
  tabsOptions.value = [];
  /*
    Unfortunately comment above is not added to the doc.
    I try to follow https://github.com/vue-styleguidist/vue-styleguidist/issues/174 wasn't working.
    I keep it, as maybe it will work in next version.
  */
  /**
   * @slot Put your tab configuration on the default slot
   */
  if (defaultSlot.value) {
    defaultSlot.value.forEach((node: VNode) => {
      if (node.type === "nck-tab") {
        tabsOptions.value.push(getTabConfigFromNodeData(node));
        const children = node.children ?? [];
        contents.value.push(children);
      }
    });
  }
}

function selectTab(index: number) {
  if (tabsContentElement.value) {
    tabsContentElement.value.focus();
  }
  selectedTabIndex.value = index;
}

onBeforeMount(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (typeof globalOptions?.utils?.translateAndFormat !== "function") {
    throw new Error(
      "Error: you must provide the formatting function to the neo-component-kit library to use the tabs component. Requires 'translateAndFormat'",
    );
  }
  initTabsContent();
});

onUpdated(() => {
  if (skipNextUpdate) {
    return;
  }
  skipNextUpdate = true;
  initTabsContent();
  void nextTick(() => {
    skipNextUpdate = false;
  });
});

watch(() => props.preselectedTabIndex, updateSelectedIndexTab, { immediate: true });
watch(defaultSlot, initTabsContent);
</script>

<template>
  <div class="nck-tabs nck-style nck-internal" :class="{ 'scrollable-content': scrollableContent }">
    <NckTabsContainer
      :tabsOptions="tabsOptions"
      :type="type"
      :hideDivider="hideDivider"
      :tabContentId="tabContentId"
      :selectedTabIndex="selectedTabIndex"
      @update:selectedTabIndex="selectTab"
    />
    <div class="nck-tabs-content" tabindex="-1" ref="tabsContentElement" :id="tabContentId">
      <VNodeRenderer :key="selectedTabIndex" :vnode="contents[selectedTabIndex]" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/typography.less";
@import (reference) "../styles/focusMixins.less";

.nck-tabs.nck-style {
  padding-top: ~"calc(0.0625 * 1rem)";

  /* to compensate for the negative top margin of the button*/
  &.scrollable-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .nck-tabs-content {
      flex: 1;
      overflow: auto;
    }
  }

  .nck-tabs-content {
    outline: none;
  }
}
</style>

<docs>
Here are some tabs in their simplest form
```jsx
<nck-tabs :type="TabsType.UNIFORM_FULL">
  <nck-tab heading="tab1">
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab2">
    Tab content 2
  </nck-tab>
</nck-tabs>
```

In case you have to have your tabs content scrolling, while the tabs remain visible, use the
"scrollableContent" props
```jsx
<nck-tabs :type="TabsType.UNIFORM_FULL" scrollableContent style="height: 10rem;">
  <nck-tab heading="tab1">
    <p>Joyeux, ivre, fatigué, le nez qui pique, Clown Hary skie dans l’ombre.</p>
    <p>Dans un wagon bleu, tout en mangeant cinq kiwis frais, vous jouez du xylophone.</p>
    <p>Voyez ce koala fou qui mange des journaux et des photos dans un bungalow.</p>
    <p>Bâchez la queue du wagon-taxi avec les pyjamas du fakir.</p>
    <p>Monsieur Jack, vous dactylographiez bien mieux que Wolf.</p>
    <p>Portez ce vieux whisky au juge blond qui fume sur son île intérieure, à côté de l'alcôve ovoïde,
    où les bûches se consument dans l'âtre, ce qui lui permet de penser à la cænogénèse de l'être
    dont il est question dans la cause ambiguë entendue à Moÿ, dans un capharnaüm qui, pense-t-il,
    diminue çà et là la qualité de son œuvre.</p>
  </nck-tab>
  <nck-tab heading="tab2">
    Tab content 2
  </nck-tab>
</nck-tabs>
```

Tabs can have badges
```jsx
<nck-tabs :type="TabsType.UNIFORM_FULL">
  <nck-tab heading="tab with badge" :trailingCounterValue=42>
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab without badge">
    Tab content 2
  </nck-tab>
</nck-tabs>
```

You can also execute an action when a tab is clicked
```jsx
function doSomething() {
  alert('tab1 has been clicked');
}

<nck-tabs :type="TabsType.UNIFORM_FULL">
  <nck-tab heading="tab1 (click me!)" @click="doSomething">
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab2">
    Tab content 2
  </nck-tab>
</nck-tabs>
```

You can add icons before and after the text, and combined an icon and a counter
```jsx
<nck-tabs :type="TabsType.UNIFORM_FULL">
  <nck-tab heading="tab1" leadingIcon="cheapest">
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab2" trailingIcon="earliest">
    Tab content 2
  </nck-tab>
  <nck-tab heading="tab3" leadingIcon="earliest" trailingIcon="close">
    Tab content 3
  </nck-tab>
  <nck-tab heading="tab4" leadingIcon="cheapest" :trailingCounterValue=42>
    Tab content 4
  </nck-tab>
</nck-tabs>
```

Tabs can have different displays. A compact display.
```jsx
<nck-tabs :type="TabsType.COMPACT">
  <nck-tab heading="tab1">
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab2" trailingIcon="earliest">
    Tab content 2
  </nck-tab>
  <nck-tab heading="tab3">
    Tab content 3
  </nck-tab>
  <nck-tab heading="tab4" leadingIcon="cheapest" :trailingCounterValue=42>
    Tab content 4
  </nck-tab>
</nck-tabs>
```

There is also a "compact side" display which is similar to compact,
except that the first left margin is not here.
```jsx
<nck-tabs :type="TabsType.COMPACT_SIDE">
  <nck-tab heading="tab1" leadingIcon="cheapest">
    Tab content 1
  </nck-tab>
  <nck-tab heading="tab2">
    Tab content 2
  </nck-tab>
  <nck-tab heading="tab3">
    Tab content 3
  </nck-tab>
  <nck-tab heading="tab4" leadingIcon="cheapest" :trailingCounterValue=42>
    Tab content 4
  </nck-tab>
</nck-tabs>
```

In "compact" and "compact side" modes, if there are too many tabs to be displayed on the horizontal space,
a menu appears on the right, displaying when expanded the hidden tabs.
```jsx
<div style="max-width: 20rem;">
  <nck-tabs :type="TabsType.COMPACT_SIDE">
    <nck-tab heading="tab1" leadingIcon="cheapest">
      Tab content 1
    </nck-tab>
    <nck-tab heading="tab2">
      Tab content 2
    </nck-tab>
    <nck-tab heading="tab3">
      Tab content 3
    </nck-tab>
    <nck-tab heading="tab4" leadingIcon="cheapest" :trailingCounterValue=42>
      Tab content 4
    </nck-tab>
  </nck-tabs>
</div>
```

Careful, in case you are creating tabs containing the same component, Vue will recycle them.
In most cases, it is not an issue, however if your component does some logic which is contextual to its "props" in
the "created" or the "mounted" hook, it will fail as those hooks will be called only once.
Watching the "prop" to do your action is an appropriate alternative.

In the case below, the "created" & "mounted" of "TestComp" will be called only once. So if you need to call
the backend based on the "props" for instance, do a "watch" on it and trigger a backend call when the value changes.

```jsx static
<nck-tabs :type="tabsType.UNIFORM_FULL">
  <nck-tab heading="test1">
    <test-comp val="test1" />
  </nck-tab>
  <nck-tab heading="val2">
    <test-comp val="val2" />
  </nck-tab>
</nck-tabs>
```

</docs>
