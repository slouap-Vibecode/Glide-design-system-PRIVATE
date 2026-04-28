<template>
  <div class="nck-history-decision-icon">
    <nck-icon
      class="nck-history-custom-icon"
      :class="{
        'nck-custom-success-icon': isSuccessEvent,
        'nck-custom-error-icon': isErrorEvent,
        'nck-custom-pending-icon': isPendingEvent,
      }"
      :iconName="iconName"
      :iconAltText="iconAltText"
      :iconSize="IconSize.S"
      :primaryColor="iconPrimaryColor"
    />
  </div>
</template>

<style scoped lang="less">
@import (reference) "../../../../styles/colorsVariables.less";
@import (reference) "../../../../styles/historyVariables.less";
@import (reference) "../../../../styles/timeline.less";

.nck-history-decision-icon {
  z-index: 1;

  .nck-history-custom-icon {
    width: @event-icon-container-size;
    height: @event-icon-container-size;
    border-radius: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.nck-custom-success-icon {
      background-color: var(--nck-surface-success-subtle);
    }

    &.nck-custom-error-icon {
      background-color: var(--nck-surface-negative-subtle);
    }

    &.nck-custom-pending-icon {
      background-color: var(--nck-surface-info-subtle);
    }

    /deep/svg {
      width: @event-icon-size;
      height: @event-icon-size;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import NckIcon from "@/components/nckIcon.vue";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";
import { TimelineEventState } from "@/constants/timelineEventState";

const props = defineProps<{
  eventState: TimelineEventState;
  iconName: string;
  iconAltText: string;
}>();

const isSuccessEvent = computed(() => {
  return props.eventState === TimelineEventState.SUCCESS;
});

const isErrorEvent = computed(() => {
  return props.eventState === TimelineEventState.ERROR;
});

const isPendingEvent = computed(() => {
  return props.eventState === TimelineEventState.PENDING;
});

const iconPrimaryColor = computed(() => {
  switch (props.eventState) {
    case TimelineEventState.SUCCESS:
      return IconColors.GREEN_300;
    case TimelineEventState.ERROR:
      return IconColors.RED_300;
    case TimelineEventState.PENDING:
      return IconColors.BRIGHT_BLUE_300;
    default:
      return IconColors.BLUE_GREY_400;
  }
});

onMounted(() => {
  if (!props.iconName && !props.iconAltText) {
    throw new Error(
      "Error in NckHistoryIcon: for history icon, you need to provide a non-empty iconName and non-empty iconAltText",
    );
  }
});
</script>
