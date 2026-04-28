import { GroupDirection } from "../../constants/groupDirection";
import { INckTimelineEvent } from "./iNckTimeline";

export interface INckProgressIndicatorTimelineEvent extends INckTimelineEvent {
  isActive?: boolean;
  notePosition?: GroupDirection;
}
