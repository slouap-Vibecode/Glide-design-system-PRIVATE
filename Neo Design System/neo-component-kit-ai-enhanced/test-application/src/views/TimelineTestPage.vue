<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    
    <h1>Timeline - Progress Indicator Test Cases</h1>
    <p>Note: general rule for success event is that it overwrites the vertical line color for previous non-error events. Error events have higher priority, they do overwrite all previous events line color (see Test case #9).</p>
    <p>Note: there's no restriction on that, but probably it makes sense to consumers to not have "pending" state steps before non-pending ones.</p>

    <div v-for="(progressIndicatorTestCase, index) in progressIndicatorTestCases" :key="`progress-indicator-${index}`" :data-test-case="index">
      <div>
        <b>Test case {{ index + 1}}</b>
        {{ progressIndicatorTestCase.description }}
      </div>
      <nck-timeline
        :type="TimelineType.PROGRESS_INDICATOR"
        :events="progressIndicatorTestCase.events"
      />
    </div>

    <h1>Timeline - History Test Cases</h1>

    <div v-for="(historyTestCase, index) in historyTestCases" :key="`history-${index}`" :data-test-case="index">
        <div>
            <b>Test case {{ index + 1}}</b>
            {{ historyTestCase.description }}
        </div>
        <nck-timeline
            :type="TimelineType.HISTORY"
            :events="historyTestCase.events"
          >
            <template v-if="historyTestCase.customContent" #default="{ event, index }">
                <div v-html="historyTestCase.customContent(event, index)"></div>
            </template>
        </nck-timeline>
    </div>
</div>
</template>
<script setup lang="ts">
import { GroupDirection, NckTimeline, TimelineEventState, TimelineType } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";
import { INckTimelineEvent } from "../../../types/components/interfaces/iNckTimeline";
import { INckHistoryTimelineEvent } from "../../../types/components/interfaces/iNckHistoryTimeline";
import { INckProgressIndicatorTimelineEvent } from "../../../types/components/interfaces/iNckProgressIndicatorTimeline";

const progressIndicatorTestCases = ref<{
    description: string;
    events: INckProgressIndicatorTimelineEvent[]
}[]>([
    {
        description: "Simplest use case with two pending events.",
        events: [
            { name: 'First pending event', state: TimelineEventState.PENDING },
            { name: 'Second pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "Two pending events, first is active.",
        events: [
            { name: 'First pending event active', state: TimelineEventState.PENDING, isActive: true },
            { name: 'Second pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "Two pending events, both are active.",
        events: [
            { name: 'First pending event active', state: TimelineEventState.PENDING, isActive: true },
            { name: 'Second pending event active', state: TimelineEventState.PENDING, isActive: true }
        ]
    },
    {
        description: "First event failed, second pending.",
        events: [
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "First event done, second pending.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "Second failed event.",
        events: [
            { name: 'Success event with custom string note', state: TimelineEventState.SUCCESS, note: 'I am an additioonal note, so you can see that not only event date might be inserted in here.' },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "Three events, partially done.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: 'This note is positioned vertical.', notePosition: GroupDirection.VERTICAL },
            { name: 'Second success event with vertical date', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), notePosition: GroupDirection.VERTICAL },
            { name: 'Pending event', state: TimelineEventState.PENDING }
        ]
    },
    {
        description: "Last failed event.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Second success event with vertical date', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), notePosition: GroupDirection.VERTICAL },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() }
        ]
    },
    {
        description: "Fully done events.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Second success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Third success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() }
        ]
    },
    {
        description: "Long list with randomly ordered events.",
        events: [
            { name: 'Pending event with date', state: TimelineEventState.PENDING, note: new Date('2025-09-30').toISOString() },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING },
            { name: 'Pending event', state: TimelineEventState.PENDING },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending active event', state: TimelineEventState.PENDING, isActive: true },
            { name: 'Failed active event (not pulsing, only pending ones can), with a very long label.', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString() },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString() },
            { name: 'Pending event', state: TimelineEventState.PENDING },
            { name: 'Success event (active, but no visible effect)', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), isActive: true },
            { name: 'Pending active event', state: TimelineEventState.PENDING, isActive: true },
        ]
    },
]);

const historyTestCases = ref<{
    description: string;
    customContent: ((event: INckTimelineEvent, index: number) => string) | null;
    events: INckHistoryTimelineEvent[]
}[]>([
    {
        description: "Simplest use case with two pending events.",
        events: [
            { name: 'First event', state: TimelineEventState.PENDING, iconName: 'status-pending', iconAltText: 'Add' },
            { name: 'Second event', state: TimelineEventState.PENDING, iconName: 'status-pending', iconAltText: 'Add' },
        ],
        customContent: null
    },
    {
        description: "Two event, both with button, clicking the buttons show window alert.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', buttonOnClick: (event) => updateStatusToError(event), iconName: 'status-success', iconAltText: 'Success' },
            { name: 'Second success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', buttonOnClick: (event) => updateStatusToError(event), iconName: 'status-success', iconAltText: 'Success' },
        ],
        customContent: null
    },
    {
        description: "Simplest use case with two pending events with buttons.",
        events: [
            { name: 'First pending event active', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' },
            { name: 'Second pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Add' }
        ],
        customContent: null
    },
    {
        description: "First event success, second error and third pending.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), iconName: 'status-success', iconAltText: 'Success' },
            { name: 'Error event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), iconName: 'status-cancel', iconAltText: 'Error' },
            { name: 'Pending event', state: TimelineEventState.PENDING, iconName: 'status-pending', iconAltText: 'Pending' },
        ],
        customContent: null
    },
    {
        description: "First event success, second error and third pending with buttons.",
        events: [
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-cancel', iconAltText: 'Error' },
            { name: 'Error event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-cancel', iconAltText: 'Error' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-pending', iconAltText: 'Pending' },
        ],
        customContent: null
    },
    {
        description: "First one with button (aligns vertical) and second one without button.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-success', iconAltText: 'Success' },
            { name: 'Second success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), iconName: 'status-success', iconAltText: 'Success' },
        ],
        customContent: null
    },
    {
        description: "First one with button (aligns vertical) and second and third one without button, with custom content.",
        events: [
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'status-success', iconAltText: 'Success' },
            { name: 'Second pending event', state: TimelineEventState.PENDING, note: new Date('2025-09-30').toISOString(), iconName: 'status-pending', iconAltText: 'Success' },
            { name: 'Third error event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), iconName: 'status-cancel', iconAltText: 'Success' },
        ],
        customContent: (event: INckTimelineEvent, index: number) => {
            if (event.state === TimelineEventState.ERROR) {
                return `<p class="text-m">Custom content for error event named: ${event.name} (index: ${index})</p>`;
            } else if (event.state === TimelineEventState.PENDING) {
                return `<p class="text-l">Custom content for pending event named: ${event.name} (index: ${index})</p>`;
            } else if (event.state === TimelineEventState.SUCCESS) {
                return `<p style="margin: 0" class="text-s">Custom content for success event named: ${event.name} (index: ${index})</p>`;
            }
            return '';
        }
    },
    {
        description: "Long list with randomly ordered events, buttons and icons.",
        events: [
            { name: 'Pending event with date', state: TimelineEventState.PENDING, note: new Date('2025-09-30').toISOString(), iconName: 'minus', iconAltText: 'Pending' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'add-plus', buttonIconAltText: 'Add', iconName: 'check', iconAltText: 'Success' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'edit-pencil', buttonIconAltText: 'Edit', iconName: 'accessibility', iconAltText: 'Pending' },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'refresh', buttonIconAltText: 'Retry', iconName: 'alert', iconAltText: 'Error' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), iconName: 'airport-rail', iconAltText: 'Success' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'voucher', buttonIconAltText: 'View', iconName: 'star', iconAltText: 'Success' },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), iconName: 'account-double', iconAltText: 'Error' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'watch', buttonIconAltText: 'Delete', iconName: 'pause-circle', iconAltText: 'Pending' },
            { name: 'Pending event', state: TimelineEventState.PENDING, iconName: 'time', iconAltText: 'Pending' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'download', buttonIconAltText: 'Download', iconName: 'amenity-pool-dark', iconAltText: 'Success' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'setting', buttonIconAltText: 'Settings', iconName: 'car', iconAltText: 'Pending' },
            { name: 'Failed event with very long label.', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'warning', buttonIconAltText: 'Warning', iconName: 'business', iconAltText: 'Error' },
            { name: 'Failed event', state: TimelineEventState.ERROR, note: new Date('2025-09-30').toISOString(), iconName: 'calm', iconAltText: 'Error' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), actionButton: true, buttonIconName: 'share', buttonIconAltText: 'Share', iconName: 'blank', iconAltText: 'Success' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), iconName: 'arrow-down', iconAltText: 'Success' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'infinity', buttonIconAltText: 'Info', iconName: 'air-conditioning', iconAltText: 'Pending' },
            { name: 'Success event', state: TimelineEventState.SUCCESS, note: new Date('2025-09-30').toISOString(), iconName: 'activity', iconAltText: 'Success' },
            { name: 'Pending event', state: TimelineEventState.PENDING, actionButton: true, buttonIconName: 'copy', buttonIconAltText: 'Copy', iconName: 'play-circle', iconAltText: 'Pending' }
        ],
        customContent: null
    },
]);

const updateStatusToError = (event: INckTimelineEvent) => {
    event.state = TimelineEventState.ERROR;
};
</script>