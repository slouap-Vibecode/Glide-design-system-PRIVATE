<template>
  <div v-if="props.type === TimelineType.PROGRESS_INDICATOR" class="nck-progress-indicator">
    <ol class="nck-progress-indicator-list">
      <li v-for="(event, index) in props.events" :key="index">
        <nck-progress-indicator-event
          :event="event"
          :isFirst="index === 0"
          :isLast="index === props.events.length - 1"
          :isNotLastDecision="index < lastDecisionIndex && index !== lastErrorDecisionIndex"
          :isFutureErrorPresent="index < lastErrorDecisionIndex"
          :isFutureSuccessPresent="index < lastSuccessDecisionIndex"
        >
          <template #default>
            <!-- @slot Slot for inserting custom content under state badge and date label (for progress indicator) or state name and note (for history). -->
            <slot :event="event" :index="index" />
          </template>
        </nck-progress-indicator-event>
      </li>
    </ol>
  </div>
  <div v-else class="nck-history">
    <ol class="nck-history-list">
      <li v-for="(event, index) in props.events" :key="index">
        <nck-history-event :event="event" :isLast="index === props.events.length - 1">
          <template #default>
            <!-- @slot Slot for inserting custom content under state badge and date label (for progress indicator) or state name and note (for history). -->
            <slot :event="event" :index="index" />
          </template>
        </nck-history-event>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../styles/timeline.less";

ol.nck-progress-indicator-list,
ol.nck-history-list {
  list-style-type: none;
  padding: 1rem;
  margin: 0;
  li {
    margin-bottom: @events-bottom-margin;
  }
}
</style>

<script setup lang="ts">
import { computed, PropType } from "vue";
import nckProgressIndicatorEvent from "./internal/timeline/progressIndicator/nckProgressIndicatorEvent.vue";
import nckHistoryEvent from "./internal/timeline/history/nckHistoryEvent.vue";
import { TimelineType } from "@/constants/timelineType";
import { INckTimelineEvent } from "./interfaces/iNckTimeline";
import { TimelineEventState } from "@/main";
/**
 * @component
 * @displayName nck-timeline
 * A component to display ordered pending, completed, and failed events as a vertical timeline. It has two aspects: **Progress Indicator** and **History**.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations) (for progress indicator type only):
 *  - success
 *  - error
 * - [Icons URL](#icons)
 */

const props = defineProps({
  /**
   * An array of objects describing each event. It must contain at least two events.
   *
   * The following properties are available:
   *
   * **Common properties (both types):**
   *
   *  - name (string, mandatory): the label displayed in the badge
   *  - state ([TimelineEventState](#timelineeventstate), mandatory): the current state of the event
   *  - note (string, optional): an option to display any additional information about the event by not using the free zone (slot)
   *
   * **Progress Indicator type only:**
   *
   *  - state behavior:
   *    - success events: makes the vertical line green and shows a check icon for the last event of this type
   *    - error events: makes the vertical line a darker grey than the default, and shows a cross icon for each event of this type
   *  - notePosition ([GroupDirection](#groupdirection), optional): position of the note relative to the event badge; possible values are 'horizontal' (default) and 'vertical'
   *  - isActive (boolean, optional): whether the event is active; used for the aria-current attribute, text highlighting and pulsing effect (for pending events only)
   *
   * **History type only:**
   *
   *  - state behavior:
   *    - success events: shows a customizable green icon for each event of this type
   *    - error events: shows a customizable red icon for each event of this type
   *    - pending events: shows a customizable blue icon for each event of this type
   *
   *  - iconName (string, mandatory): name of the icon to be displayed inside the event badge.
   *  - iconAltText (string, mandatory): alt text for the icon to be displayed inside the event badge.
   *  - actionButton (boolean, optional, default: false): whether to show an action button for the event.
   *  - buttonIconName (string, optional): name of the icon to be displayed inside the action button. (Required when actionButton is true)
   *  - buttonIconAltText (string, optional): alt text for the icon to be displayed inside the action button. (Required when actionButton is true)
   *  - buttonOnClick (function, optional): a function to be called when the action button is clicked
   */
  events: {
    type: Array as PropType<INckTimelineEvent[]>,
    required: true,
    validator: (val: INckTimelineEvent[]) => val.length > 1,
  },
  /**
   * Aspect of the timeline component.
   *
   * The **progress indicator**, which shows the progression of events over time, and the **history**, which displays a record of past events.
   *
   * Accepts one of the [TimelineType](#timelinetype) value.
   */
  type: {
    type: String as PropType<TimelineType>,
    required: false,
    validator: (val: TimelineType) => Object.values(TimelineType).includes(val) || val === undefined,
    default: TimelineType.PROGRESS_INDICATOR,
  },
});

const lastDecisionIndex = computed(() => {
  return props.events.findLastIndex((event: INckTimelineEvent) => event.state !== TimelineEventState.PENDING);
});

const lastErrorDecisionIndex = computed(() => {
  return props.events.findLastIndex((event: INckTimelineEvent) => event.state === TimelineEventState.ERROR);
});

const lastSuccessDecisionIndex = computed(() => {
  return props.events.findLastIndex((event: INckTimelineEvent) => event.state === TimelineEventState.SUCCESS);
});
</script>

<docs>

  Progress Indicator version of the timeline.

  ```jsx
  <nck-timeline
    :type="TimelineType.PROGRESS_INDICATOR"
    :events="[
      { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date().toISOString() },
      { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date().toISOString() },
      { name: 'Error event', state: TimelineEventState.ERROR, note: 'Any string can be added as a note and optionally to be positioned vertical.', notePosition: GroupDirection.VERTICAL },
      { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date().toISOString() },
      { name: 'Pending event', state: TimelineEventState.PENDING, note: new Date().toISOString() },
      { name: 'Pending active event', state: TimelineEventState.PENDING, isActive: true },
      { name: 'Pending event', state: TimelineEventState.PENDING }
    ]"
  >
    <template #default="{ event, index }">
        <p v-if="event.isActive">Custom content for active event named: {{event.name}} (index: {{index + 1}})</p>
        <p v-if="event.state === TimelineEventState.ERROR">Custom content for error event named: {{event.name}} (index: {{index + 1}})</p>
        <p v-if="index === 0">Custom content for first event named: {{event.name}} (index: {{index + 1}})</p>
    </template>
  </nck-timeline>
  ```

  History version of the timeline.

  ```jsx
  <nck-timeline
    :type="TimelineType.HISTORY"
    :events="[
      { name: 'Success event 1', state: TimelineEventState.SUCCESS, iconName: 'status-success', iconAltText: 'Add' },
      { name: 'Success event 2', state: TimelineEventState.SUCCESS, iconName: 'status-success', iconAltText: 'Add', actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add' },
      { name: 'Error event 1', state: TimelineEventState.ERROR, note: new Date().toISOString(), iconName: 'status-success', iconAltText: 'Add' },
      { name: 'Error event 2', state: TimelineEventState.ERROR, note: new Date().toISOString(), iconName: 'status-success', iconAltText: 'Add', actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add' },
      { name: 'Error event 3', state: TimelineEventState.ERROR, note: 'Any string can be added as a  vertical.', iconName: 'status-critical', iconAltText: 'Add' },
      { name: 'Success event 3', state: TimelineEventState.SUCCESS, note: new Date().toISOString(), iconName: 'status-success', iconAltText: 'Add' },
      { name: 'Pending event 1', state: TimelineEventState.PENDING, iconName: 'status-pending', iconAltText: 'Add' },
      { name: 'Pending event 2', state: TimelineEventState.PENDING, note: 'Note for pending event', buttonOnClick: (event) => console.log('Second button clicked! ' + event.name), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
      { name: 'Pending event 3', state: TimelineEventState.PENDING, note: 'Note for pending event', buttonOnClick: (event) => console.log('Second button clicked! ' + event.name), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
      { name: 'Pending event 4', state: TimelineEventState.PENDING, note: 'Note for pending event', buttonOnClick: (event) => console.log('Third button clicked! ' + event.name), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
      { name: 'Pendingevent5, button is loading', state: TimelineEventState.PENDING, note: 'Note for pending event', iconName: 'status-pending', iconAltText: 'Add', buttonLoading: true, actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
      { name: 'Pendingevent6, button is disabled', state: TimelineEventState.PENDING, note: 'Noteforpendingevent', iconName: 'status-pending', iconAltText: 'Add', buttonDisabled: true, actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
    ]"
  >
    <template #default="{ event, index }">
        <p class="text-m" style="margin: 0" v-if="(index == 1 || index == 3 || index == 5 || index == 6 || index == 7)">Custom content for event named: {{event.name}} (index: {{index + 1}})</p>
    </template>
  </nck-timeline>
  ```

</docs>
