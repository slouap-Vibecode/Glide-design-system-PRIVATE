import { ComponentPublicInstance, Ref } from "vue";
import { TimelineType } from "../../constants/timelineType";
import { TimelineEventState } from "../../constants/timelineEventState";

export interface INckTimeline extends ComponentPublicInstance {
  type: TimelineType;
  events: Ref<INckTimelineEvent[]>;
}

export interface INckTimelineEvent {
  name: string;
  state: TimelineEventState;
  note?: string;
}
