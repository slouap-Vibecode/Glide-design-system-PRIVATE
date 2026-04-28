<script setup lang="ts">
import { ref, computed } from "vue";
import NckIcon from "../../nckIcon.vue";
import NckCounterBadge from "../../nckCounterBadge.vue";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";
import { TabsType } from "@/constants/tabsType";

const props = defineProps<{
  heading: string;
  tabContentId: string;
  tabType?: TabsType;
  selected?: boolean;
  leadingIcon?: string;
  trailingCounterValue?: number;
  trailingIcon?: string;
  controlsMenu?: boolean;
  ignoreIconColor?: boolean;
  noLeftMargin?: boolean;
}>();

const emits = defineEmits<{
  (e: "tab-selected"): void;
}>();

const tabButton = ref<HTMLButtonElement | null>(null);

const iconColor = computed(() => {
  if (props.ignoreIconColor) {
    return;
  }
  return props.selected ? IconColors.BRIGHT_BLUE_300 : IconColors.BLUE_GREY_500;
});

function focus() {
  if (tabButton.value) {
    tabButton.value.focus();
  }
}

defineExpose({
  focus,
});
</script>

<template>
  <li
    class="nck-tab"
    :class="{
      selected,
      'uniform-full-tab': tabType === TabsType.UNIFORM_FULL,
      'compact-tab': tabType === TabsType.COMPACT || tabType === TabsType.COMPACT_SIDE,
      'no-left-margin': noLeftMargin,
    }"
  >
    <button
      ref="tabButton"
      :aria-expanded="selected ? 'true' : 'false'"
      :aria-controls="selected ? tabContentId : undefined"
      class="text-m"
      :class="{ 'text-m-600': selected }"
      @click="emits('tab-selected')"
      :aria-haspopup="controlsMenu ? 'listbox' : undefined"
    >
      <div class="focus-style-container">
        <div class="leading-container" v-if="leadingIcon">
          <NckIcon
            :iconName="leadingIcon"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="iconColor"
            :secondaryColor="iconColor"
          />
        </div>
        <span class="tab-content">{{ heading }}</span>
        <div class="trailing-container" v-if="trailingCounterValue || trailingIcon">
          <NckCounterBadge v-if="trailingCounterValue" :entry="Number(trailingCounterValue)" />
          <NckIcon
            v-else-if="trailingIcon"
            :iconName="trailingIcon"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="iconColor"
            :secondaryColor="iconColor"
          />
        </div>
      </div>
    </button>
  </li>
</template>

<style scoped lang="less">
@import (reference) "../../../styles/colorsVariables.less";
@import (reference) "../../../styles/typography.less";
@import (reference) "../../../styles/focusMixins.less";

.nck-tab {
  min-width: 4.5rem;
  height: 3rem;
  margin-bottom: calc(-1 * var(--nck-border-width-s));
  vertical-align: bottom;

  &.uniform-full-tab {
    flex: 1;
  }

  &.compact-tab.no-left-margin {
    margin-left: 0;
  }

  &.compact-tab {
    display: inline-block;
    flex: 0;
    flex-basis: auto;
    margin: 0 0.5rem;
    margin-bottom: calc(-1 * var(--nck-border-width-s));
    button {
      padding-left: 0rem;
      padding-right: 0rem;
    }
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: calc(-1 * var(--nck-border-width-s));

    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    padding-top: 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.1875rem;
    /* to align text with selected tab */

    &:focus {
      outline: none;

      .focus-style-container {
        box-shadow: inset 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-primary);
        .outline-focus-ring-for-high-contrast-display();
        outline-offset: -0.1875rem;
      }
    }

    &:active {
      background-color: var(--blue-grey-100);
    }
  }

  &.selected {
    button {
      padding-bottom: 0;
      color: var(--ink-100);
    }

    border-bottom: 0.1875rem solid var(--nck-border-active);
  }

  button {
    color: var(--ink-70);
    &:hover {
      color: var(--ink-100);
    }
  }

  .focus-style-container {
    padding: 0.5rem;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .tab-content {
      white-space: nowrap;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .trailing-container {
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
    }

    .leading-container {
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
