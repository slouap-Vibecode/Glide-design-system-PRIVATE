<template>
  <div class="nck-progress-indicator-icon-container">
    <template v-if="isPendingEvent || props.hideDecisionIcon">
      <svg
        class="nck-progress-indicator-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <circle
          :class="{
            'not-decided-circle-active': props.isActive,
            'not-decided-circle': !props.isActive,
            'decided-circle': props.hideDecisionIcon,
          }"
          cx="18"
          cy="10"
          r="4"
        />
      </svg>
      <!-- Box shadow can not be applied on 'circle', so this is workaround. -->
      <svg
        v-if="props.isActive && isPendingEvent"
        class="nck-progress-indicator-icon not-decided-circle-active pulsing-circle"
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <circle cx="18" cy="10" r="4" />
      </svg>
    </template>
    <div v-else class="nck-progress-indicator-decision-icon">
      <nck-icon
        v-if="iconDetails"
        class="nck-progress-indicator-custom-icon"
        :class="{ 'nck-custom-success-icon': isSuccessEvent, 'nck-custom-error-icon': isErrorEvent }"
        :iconName="iconDetails.name"
        :iconAltText="iconDetails.label"
        :iconSize="IconSize.L"
        :primaryColor="IconColors.WHITE"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../../../../styles/colorsVariables.less";
@import (reference) "../../../../styles/progressIndicatorVariables.less";
@import (reference) "../../../../styles/timeline.less";

.nck-progress-indicator-icon-container {
  width: @event-icon-container-size;
  z-index: 1;

  .nck-progress-indicator-icon {
    width: @event-icon-container-size;
  }

  .not-decided-circle-active {
    fill: var(--nck-icon-neutral);
  }

  .not-decided-circle {
    fill: var(--nck-icon-disabled);
  }

  .decided-circle {
    fill: var(--white);
  }

  .pulsing-circle {
    z-index: -1;
    animation: pulse-animation 1.8s infinite;
    position: absolute;
    top: 0;
    left: 0;
  }

  .nck-progress-indicator-decision-icon {
    position: relative;
    z-index: 1;

    .nck-progress-indicator-custom-icon {
      width: @event-icon-container-size;
      height: @event-icon-container-size;
      border-radius: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--box-shadow-level-3);

      &.nck-custom-success-icon {
        background-color: var(--nck-surface-success-solid);
      }

      &.nck-custom-error-icon {
        background-color: var(--nck-surface-negative-solid);
      }

      /deep/svg {
        width: calc(@event-icon-container-size / 2);
        height: calc(@event-icon-container-size / 2);
      }
    }
  }
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  33% {
    transform: scale(1);
    opacity: 0;
  }
  66% {
    transform: scale(2);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import { computed, PropType } from "vue";
import NckIcon from "@/components/nckIcon.vue";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { TimelineEventState } from "@/main";
const props = defineProps({
  eventState: {
    type: String as PropType<TimelineEventState>,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
  hideDecisionIcon: {
    type: Boolean,
    required: true,
  },
});

const isPendingEvent = computed(() => {
  return props.eventState === TimelineEventState.PENDING;
});

const isSuccessEvent = computed(() => {
  return props.eventState === TimelineEventState.SUCCESS;
});

const isErrorEvent = computed(() => {
  return props.eventState === TimelineEventState.ERROR;
});

const iconDetails = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();

  switch (props.eventState) {
    case TimelineEventState.SUCCESS:
      return { name: "check", label: globalOptions?.translations?.success ?? "" };
    case TimelineEventState.ERROR:
      return { name: "close", label: globalOptions?.translations?.error ?? "" };
    default:
      return null;
  }
});
</script>
