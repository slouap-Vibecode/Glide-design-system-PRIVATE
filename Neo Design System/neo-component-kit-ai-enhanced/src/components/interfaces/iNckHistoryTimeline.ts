import { INckTimelineEvent } from "./iNckTimeline";

export interface INckHistoryTimelineEvent extends INckTimelineEvent {
  iconName?: string;
  iconAltText?: string;
  actionButton?: boolean;
  buttonIconName?: string;
  buttonIconAltText?: string;
  buttonLoading?: boolean;
  buttonDisabled?: boolean;
  buttonOnClick?: (event: INckHistoryTimelineEvent) => void;
}
