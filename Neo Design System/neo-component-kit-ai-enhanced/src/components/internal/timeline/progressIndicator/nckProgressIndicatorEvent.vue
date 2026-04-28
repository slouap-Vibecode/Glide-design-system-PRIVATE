<template>
  <div
    class="nck-progress-indicator-event"
    :class="{
      'first-step': props.isFirst,
      'last-step': props.isLast,
      'has-future-success-step': props.isFutureSuccessPresent,
      'has-future-error-step': props.isFutureErrorPresent,
      'last-step-fully-done': isSuccessStepLast,
    }"
    :aria-current="props.event.isActive ? 'step' : undefined"
  >
    <nck-progress-indicator-icon
      :eventState="props.event.state"
      :isActive="props.event.isActive"
      :hideDecisionIcon="hideDecisionIcon"
    />

    <div
      class="nck-progress-indicator-details-wrapper"
      :class="{ 'align-center-by-decision-icon': !hideDecisionIcon && !isPendingEvent }"
    >
      <div class="nck-progress-indicator-details-content" :class="{ 'vertical-view': isVerticalView }">
        <span
          v-if="isPendingEvent"
          :class="{
            'text-m font-color-ink-70': !props.event.isActive,
            'text-m-semibold font-color-ink-100': props.event.isActive,
          }"
          >{{ props.event.name }}</span
        >
        <nck-badge v-else :label="props.event.name" :type="BadgeType.SUBTLE" :color="badgeColor" />

        <span class="text-m font-color-ink-70" v-if="props.event.note">{{ props.event.note }}</span>
      </div>

      <div v-if="hasSlotContent" class="nck-progress-indicator-slot-wrapper">
        <slot :event="props.event" :index="$attrs.index" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../../../../styles/colorsVariables.less";
@import (reference) "../../../../styles/progressIndicatorVariables.less";
@import (reference) "../../../../styles/breakpointsVariables.less";
@import (reference) "../../../../styles/timeline.less";

.vertical-view() {
  flex-direction: column;
  gap: 0.25rem;

  .nck-badge {
    width: auto;
    max-width: 100%;
    align-self: flex-start;
  }
}

.nck-progress-indicator-event {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  position: relative;

  &:not(.last-step-fully-done) {
    &::after {
      content: "";
      display: block;
      width: @vertical-line-width;
      height: calc(100% + @events-bottom-margin);
      position: absolute;
      left: calc((@event-icon-container-size / 2) - (@vertical-line-width / 2));
      top: @rounded-icon-gap;
      background-color: var(--blue-grey-100);
    }

    &.last-completed-step::after {
      top: 0.2rem;
    }

    &.first-step::after {
      border-radius: 6.1875rem 6.1875rem 0 0;
      top: 0;
      height: calc(100% + @events-bottom-margin + @rounded-icon-gap);
    }

    &.last-step::after {
      border-radius: 0 0 6.1875rem 6.1875rem;
      height: calc(1rem + @rounded-icon-gap); // Last event height shouldn't take full space.
    }

    // Keep the following order (error events to overwrite success ones)
    &.has-future-success-step::after {
      background-color: @success-vertical-progress-line; //TODO replace after NCK-2072: var(--green-250);
    }

    &.has-future-error-step::after {
      background-color: var(--nck-icon-disabled);
    }
  }

  .nck-progress-indicator-details-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    width: 100%;

    &.align-center-by-decision-icon {
      align-self: center;
    }

    .nck-progress-indicator-details-content {
      display: flex;
      gap: 0.625rem;
      justify-content: space-between;
      text-align: left;

      &.vertical-view {
        .vertical-view();
      }

      @media @phone, @tablet {
        .vertical-view();
      }
    }

    .nck-progress-indicator-slot-wrapper {
      display: flex;
      text-align: left;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, PropType, useSlots } from "vue";
import nckProgressIndicatorIcon from "./nckProgressIndicatorIcon.vue";
import { BadgeColor } from "../../../../constants/badgeColor";
import { BadgeType } from "../../../../constants/badgeType";
import NckBadge from "../../../nckBadge.vue";
import { GroupDirection } from "@/constants/groupDirection";
import { TimelineEventState } from "../../../../constants/timelineEventState";
import { INckProgressIndicatorTimelineEvent } from "@/components/interfaces/iNckProgressIndicatorTimeline";

const props = defineProps({
  event: {
    type: Object as PropType<INckProgressIndicatorTimelineEvent>,
    required: true,
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
  isNotLastDecision: {
    type: Boolean,
    required: true,
  },
  isFutureErrorPresent: {
    type: Boolean,
    required: true,
  },
  isFutureSuccessPresent: {
    type: Boolean,
    required: true,
  },
});

const slots = useSlots();
const hasSlotContent = computed(() => {
  const slot = slots.default?.();
  return Array.isArray(slot) && slot.some((vnode) => vnode.children?.length);
});

const isSuccessStepLast = computed(() => {
  return props.event.state === TimelineEventState.SUCCESS && props.isLast;
});

const isPendingEvent = computed(() => {
  return props.event.state === TimelineEventState.PENDING;
});

const isErrorEvent = computed(() => {
  return props.event.state === TimelineEventState.ERROR;
});

const badgeColor = computed(() => {
  return props.event.state === TimelineEventState.SUCCESS ? BadgeColor.GREEN : BadgeColor.RED;
});

const isVerticalView = computed(() => {
  return props.event.notePosition === GroupDirection.VERTICAL;
});

const hideDecisionIcon = computed(() => {
  return !isErrorEvent.value && props.isNotLastDecision;
});
</script>
