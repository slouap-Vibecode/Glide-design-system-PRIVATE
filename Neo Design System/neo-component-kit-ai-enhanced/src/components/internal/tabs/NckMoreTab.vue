<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import NckTab from "./NckTab.vue";
import NckPopover from "../../nckPopover.vue";
import NckMenu from "../../nckMenu.vue";
import { TabsType } from "@/constants/tabsType";
import { IFocusable } from "../../interfaces/iFocusable";
import { IMenuItem } from "@/models/iMenuItem";
import { PopoverSize } from "@/constants/popoverSize";
import { INckMenu } from "../../interfaces/iNckMenu";

defineProps<{
  heading: string;
  tabContentId: string;
  selected: boolean;
  tabsInMenu: IMenuItem[];
  selectedTabIndex: number;
  hiddenForInitialRendering?: boolean;
}>();

const emits = defineEmits<{
  (e: "tab-selected", tabIndex: number): void;
}>();

const menuExpanded = ref<boolean>(false);
const menuBlurred = ref<boolean>(false);
const tabElement = ref<IFocusable | null>(null);
const tabsMenu = ref<INckMenu | null>(null);
let clickCancelListener: ((event: MouseEvent) => void) | null = null; // may cancel menu expanding if needed

function toggleAndFocusMenu() {
  menuExpanded.value = !menuExpanded.value;
  if (menuExpanded.value && tabsMenu.value) {
    // tabsMenu.value.setNavigatedWithSelectedOrFirstEnabled();
    tabsMenu.value.focusMenu();
  }
}

function hidePopover() {
  menuExpanded.value = false;
  menuBlurred.value = false;
}

function blurMenu() {
  menuBlurred.value = true;
  menuExpanded.value = false;
}

async function focusAfterMenuDismissed() {
  menuExpanded.value = false;
  await nextTick();
  if (tabElement.value) {
    tabElement.value.focus();
  }
}

function selectTab(selectedValue: unknown) {
  if (selectedValue) {
    emits("tab-selected", Number(selectedValue));
  }
  hidePopover();
}

function isFromMenuButton(event: Event) {
  if (event.target instanceof HTMLElement) {
    const tab = event.target.closest("li");
    if (tab?.classList.contains("more-tab")) {
      return true;
    }
  }
  return false;
}

function setupCancellingClickForTabMenu() {
  // setup the event cancelling clicks on the menu tab that would reopen it
  // (because clicking the tab triggers a focus event before the click event, which toggles the menu ;
  // so we want to cancel the click that would otherwise toggle it again)
  clickCancelListener = (event: MouseEvent) => {
    if (menuBlurred.value) {
      menuBlurred.value = false;
      if (isFromMenuButton(event)) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };
  document.addEventListener("click", clickCancelListener, true);
}

onMounted(() => {
  setupCancellingClickForTabMenu();
});

onUnmounted(() => {
  if (clickCancelListener) {
    document.removeEventListener("click", clickCancelListener, true);
  }
});
</script>

<template>
  <div
    class="more-tab-container nck-tab"
    :aria-hidden="hiddenForInitialRendering"
    :class="{ 'hidden-for-initial-rendering': hiddenForInitialRendering }"
  >
    <NckTab
      class="more-tab"
      ref="tabElement"
      :heading="heading"
      :tabContentId="tabContentId"
      :selected="selected"
      :trailingIcon="menuExpanded ? 'caret-up' : 'caret-down'"
      :tabType="TabsType.COMPACT"
      controlsMenu
      ignoreIconColor
      @tab-selected="toggleAndFocusMenu"
    />
    <NckPopover
      :displayed="menuExpanded"
      title=""
      @hide-popover="hidePopover"
      class="tabs-popover-menu"
      :size="PopoverSize.FLUID_WIDTH"
      placement="right"
    >
      <template #popover-body>
        <NckMenu
          ref="tabsMenu"
          :items="tabsInMenu"
          :selectedValue="selectedTabIndex"
          :autoSelect="false"
          forceFocusAspectOnNavigatedMenuItem
          @element-selected="selectTab"
          @menu-blurred="blurMenu"
          @menu-dismissed="focusAfterMenuDismissed"
        />
      </template>
    </NckPopover>
  </div>
</template>

<style scoped lang="less">
.more-tab-container {
  display: inline-block;
  position: relative;
}

.hidden-for-initial-rendering {
  visibility: hidden;
}

.tabs-popover-menu {
  margin: 0 0.5rem; // mimick tab margin to align with it
  white-space: normal;
  min-width: 10rem;
  right: 0;
  width: auto; // this is a bit weird that we have to overwrite popover component but that was here before
}
</style>
