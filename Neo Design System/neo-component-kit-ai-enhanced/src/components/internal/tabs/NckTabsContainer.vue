<script setup lang="ts">
import { TabsType } from "@/constants/tabsType";
import { ITabOptions } from "@/models/iTabOptions";
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import NckTab from "./NckTab.vue";
import NckMoreTab from "./NckMoreTab.vue";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { IMenuItem } from "@/models/iMenuItem";

const props = defineProps<{
  tabsOptions: ITabOptions[];
  type: TabsType;
  hideDivider?: boolean;
  tabContentId: string;
  selectedTabIndex: number;
}>();

const emits = defineEmits<{
  (e: "update:selectedTabIndex", newValue: number): void;
}>();

const tabsOverflowIndex = ref<number>(-1);
const initialRendering = ref(true);
const tabsWidths = ref<number[]>([]);
const tabsContainer = ref<HTMLUListElement | null>(null);

// only used for $forceUpdate, is not super nice, don't use it for something else
const currentInstance = getCurrentInstance()?.proxy;

const canHaveMoreMenu = computed(() => {
  return props.type === TabsType.COMPACT || props.type === TabsType.COMPACT_SIDE;
});

const tabsDisplayedInContainer = computed(() => {
  return props.tabsOptions.filter((tabOption, index) => {
    return !canHaveMoreMenu.value || tabsOverflowIndex.value === -1 || index < tabsOverflowIndex.value;
  });
});

const tabsDisplayedUnderMenu = computed((): IMenuItem[] => {
  if (tabsOverflowIndex.value === -1) {
    return []; // no overflow
  }
  return props.tabsOptions
    .map((tabOption, index) => {
      // we map first and then filter out because we need original index
      if (canHaveMoreMenu.value && index >= tabsOverflowIndex.value) {
        const menuItem = {
          // removed the IMenuItem typing, typescript-eslint now complains about it being unnecessary (because of the final cast)
          label: tabOption.heading,
          value: index,
          leadingIcon: tabOption.leadingIcon,
          trailingIcon: tabOption.trailingIcon,
          trailingCounterValue: tabOption.trailingCounterValue ? Number(tabOption.trailingCounterValue) : undefined,
        };
        return menuItem;
      }
      return null;
    })
    .filter((menuOption) => {
      return menuOption !== null;
    }) as IMenuItem[]; // because we filter out null, but TS doesn't detect it while typing
});

const moreMenuTitle = computed(() => {
  if (tabsOverflowIndex.value === 0) {
    // When there is space only for the more menu, its title is the one of the selected tab
    return props.tabsOptions[props.selectedTabIndex].heading;
  }
  const optionsProvider = GlobalOptionsProvider.getInstance();
  const translateFunction = optionsProvider.getOptions()?.utils?.translateAndFormat;
  return translateFunction ? translateFunction("tabsMore", { count: tabsDisplayedUnderMenu.value.length }) : "";
});

function isSelectedTab(index: number) {
  return props.selectedTabIndex === index;
}

function selectTab(index: number) {
  const tabOptions = props.tabsOptions[index];
  // note: this direct access by ID is not very nice, if we could have ref would be nicer
  const tabContentElement = document.getElementById(props.tabContentId);
  if (tabContentElement) {
    tabContentElement.focus();
  }
  emits("update:selectedTabIndex", index);
  // if tab has a callback when it is selected/clicked, call it
  if (typeof tabOptions.clickCallback === "function") {
    tabOptions.clickCallback();
  }
}

function computeTabsWidths() {
  if (tabsContainer.value) {
    // TODO: would be nice to use ref over here
    const tabs = tabsContainer.value.getElementsByClassName("nck-tab");
    // note that a "fake" menu tab will be available at intial rendering for this function to compute it
    tabsWidths.value = Array.from(tabs, (tab) => {
      const style = window.getComputedStyle(tab);
      return parseInt(style.marginLeft, 10) + parseInt(style.width, 10) + parseInt(style.marginRight, 10);
    });
  }
}

function updateTabsSize() {
  if (tabsContainer.value) {
    const tabsContainerWidth = Math.floor(tabsContainer.value.getBoundingClientRect().width);
    const overflowIndex = getOverflowIndex(tabsContainerWidth, 0, 0);
    if (tabsOverflowIndex.value !== overflowIndex) {
      tabsOverflowIndex.value = overflowIndex;
      currentInstance?.$forceUpdate();
    }
  }
}

/**
 * Checks if the tabs have enough space to be displayed, or if a 'more' tab should be created.
 * To be used when the tabs container is resized (and of course only when a 'more' menu is desired).
 * Recursive : initial call with accumulatedWidth=0 and index=0.
 * Please note that the function uses this.tabsWidth, which lists all tabs widths, including the menu
 * tab width at the last position.
 */
function getOverflowIndex(tabsContainerWidth: number, accumulatedWidth: number, index: number): number {
  // the last item of tabsWidths is the menu, so we stop one step before
  if (index >= tabsWidths.value.length - 1) {
    // no overflow
    return -1;
  } else {
    // let's not increase accumulatedWidth and first see if there would be room to add a menu
    // note : the last item of tabsWidth is the menu tab
    if (accumulatedWidth + tabsWidths.value[tabsWidths.value.length - 1] > tabsContainerWidth) {
      // then the overflow is one tab sooner, in order to leave enough room for the menu
      return index - 1;
    }
    // now let's check if there's room for the next tab
    accumulatedWidth += tabsWidths.value[index];
    if (accumulatedWidth > tabsContainerWidth) {
      return index;
    }
    // no overflow til now, let's continue
    return getOverflowIndex(tabsContainerWidth, accumulatedWidth, ++index);
  }
}

onMounted(() => {
  if (canHaveMoreMenu.value) {
    if (tabsContainer.value) {
      computeTabsWidths();
      updateTabsSize();
      window.addEventListener("resize", updateTabsSize);
      const hasInvalidSizes = tabsWidths.value.some((width) => isNaN(width) || width <= 0);
      if (hasInvalidSizes) {
        const observer = new IntersectionObserver(
          () => {
            computeTabsWidths();
            updateTabsSize();
            const hasValidSizes = tabsWidths.value.every((width) => !isNaN(width) && width > 0);
            if (hasValidSizes) {
              observer.disconnect();
            }
          },
          { root: null },
        );
        observer.observe(tabsContainer.value);
      }
    }
  }
  if (initialRendering.value) {
    initialRendering.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateTabsSize, true);
});
</script>

<template>
  <ul
    class="nck-tabs-container"
    :class="{
      'no-divider': hideDivider,
      compact: type === TabsType.COMPACT,
      'compact-side': type === TabsType.COMPACT_SIDE,
    }"
    ref="tabsContainer"
  >
    <NckTab
      v-for="(tabOption, index) in tabsDisplayedInContainer"
      :key="index"
      :selected="isSelectedTab(index)"
      :tabContentId="tabContentId"
      :tabType="type"
      :heading="tabOption.heading"
      :leadingIcon="tabOption.leadingIcon"
      :trailingIcon="tabOption.trailingIcon"
      :trailingCounterValue="tabOption.trailingCounterValue ? Number(tabOption.trailingCounterValue) : undefined"
      :noLeftMargin="type === TabsType.COMPACT_SIDE && index === 0"
      @tab-selected="selectTab(index)"
    /><!-- no more space
    --><NckMoreTab
      v-if="canHaveMoreMenu && (tabsDisplayedUnderMenu.length > 0 || initialRendering)"
      :heading="moreMenuTitle"
      :tabContentId="tabContentId"
      :selected="selectedTabIndex >= tabsOverflowIndex"
      :tabsInMenu="tabsDisplayedUnderMenu"
      :selectedTabIndex="selectedTabIndex"
      :hiddenForInitialRendering="initialRendering"
      @tab-selected="selectTab"
    />
  </ul>
</template>

<style scoped lang="less">
.nck-tabs-container {
  display: flex;
  padding: 0;
  list-style: none;
  margin: 0;
  border-bottom: var(--nck-border-width-s) solid var(--nck-border-neutral);

  &.no-divider {
    border-bottom: none;
    padding-bottom: var(--nck-border-width-s);
  }

  &.compact,
  &.compact-side {
    text-align: left;
    white-space: nowrap;
    display: block;
  }
}
</style>
