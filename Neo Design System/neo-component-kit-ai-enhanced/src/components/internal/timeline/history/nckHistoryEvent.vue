<template>
  <div
    class="nck-history-event"
    :class="{
      'last-step': props.isLast,
    }"
  >
    <nck-history-icon
      :eventState="props.event.state"
      :iconName="props.event.iconName ?? ''"
      :iconAltText="props.event.iconAltText ?? ''"
    />

    <div class="nck-history-details">
      <div
        class="nck-history-details-wrapper"
        :class="{
          'nck-history-details-wrapper-margin-desktop': shouldApplyMarginToDesktop,
          'nck-history-details-wrapper-margin-others': shouldApplyMarginToOthers,
        }"
      >
        <div class="nck-history-details-content" :class="{ 'vertical-view': hasActionButton }">
          <b class="text-m-semibold font-color-ink-100">{{ props.event.name }}</b>

          <span class="text-m font-color-ink-70" v-if="props.event.note">{{ props.event.note }}</span>
        </div>
        <nck-button
          v-if="hasActionButton"
          class="nck-history-button"
          :type="ButtonType.FILLED"
          :size="ButtonSize.M"
          :leftIcon="props.event.buttonIconName"
          :iconAltText="props.event.buttonIconAltText"
          :loading="props.event.buttonLoading"
          :disabled="props.event.buttonDisabled"
          @click="props.event.buttonOnClick?.(props.event)"
        >
        </nck-button>
      </div>
      <div v-if="hasSlotContent" class="nck-history-slot-wrapper">
        <slot :event="props.event" :index="$attrs.index" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../../../../styles/colorsVariables.less";
@import (reference) "../../../../styles/historyVariables.less";
@import (reference) "../../../../styles/breakpointsVariables.less";
@import (reference) "../../../../styles/timeline.less";

.vertical-view() {
  flex-direction: column;
  gap: 0.25rem;
}

.nck-history-event {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  position: relative;
  overflow-wrap: anywhere;

  &:not(.last-step) {
    &::after {
      content: "";
      display: block;
      width: @vertical-line-width;
      height: calc(100% + @events-bottom-margin);
      position: absolute;
      left: calc((@event-icon-container-size / 2) - (@vertical-line-width / 2));
      top: @rounded-icon-gap;
      background-color: var(--nck-border-neutral);
    }
  }

  .nck-history-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    width: 100%;

    .nck-history-details-wrapper {
      display: flex;
      flex-direction: row;
      gap: 0.25rem;
      min-width: 0;

      &.nck-history-details-wrapper-margin-desktop {
        @media @desktop {
          margin: 0.5rem 0 0 0;
        }
      }

      &.nck-history-details-wrapper-margin-others {
        @media @phone, @tablet {
          margin: 0.5rem 0 0 0;
        }
      }

      .nck-history-details-content {
        display: flex;
        gap: 0.625rem;
        justify-content: space-between;
        text-align: left;
        flex-grow: 1;

        &.vertical-view {
          .vertical-view();
        }

        @media @phone, @tablet {
          .vertical-view();
        }
      }
    }

    .nck-history-slot-wrapper {
      display: flex;
      text-align: left;
    }

    .nck-history-button {
      margin: auto;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, useSlots } from "vue";
import nckHistoryIcon from "./nckHistoryIcon.vue";
import { ButtonSize, ButtonType } from "@/main";
import NckButton from "../../../nckButton.vue";
import { INckHistoryTimelineEvent } from "@/components/interfaces/iNckHistoryTimeline";

const props = defineProps<{
  event: INckHistoryTimelineEvent;
  isLast: boolean;
}>();

const slots = useSlots();
const hasSlotContent = computed(() => {
  const slot = slots.default ? slots.default() : [];
  return Array.isArray(slot) && slot.some((vnode) => Array.isArray(vnode.children) && vnode.children?.length);
});

const hasActionButton = computed(() => {
  return props.event.actionButton;
});

const shouldApplyMarginToDesktop = computed(() => {
  if (!hasActionButton.value) {
    return true;
  }

  return false;
});

const shouldApplyMarginToOthers = computed(() => {
  if (!props.event.note) {
    return true;
  }

  return false;
});

onMounted(() => {
  if (hasActionButton.value && (!props.event.buttonIconName || !props.event.buttonIconAltText)) {
    throw new Error(
      "Error in NckHistoryEvent: for button with icon only, you need to provide a non-empty iconName or a non-empty iconAltText",
    );
  }
});
</script>
