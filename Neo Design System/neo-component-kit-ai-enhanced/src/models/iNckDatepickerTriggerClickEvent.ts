import { IFocusableExposed } from "@/components/interfaces/iFocusable";

export interface INckDatepickerTriggerClickEvent {
  clickEvent: Event;
  triggeredBy: IFocusableExposed;
}
