import { PlacementBinding } from "./placementBinding";
import { ScrollListener } from "./scrollListener";
import { VNode, DirectiveBinding, ComponentPublicInstance } from "vue";

export interface TooltipBuilderData {
  binding: DirectiveBinding;
  placement: PlacementBinding;
  triggerElement: HTMLElement;
  nodeElement: VNode;
  tooltipElement: HTMLElement;
  innerElement: HTMLElement;
  buttonComponent?: ComponentPublicInstance; // this is the container of the button, to be compatible with composition API
  displayed: boolean;
  onHideEvent?: (event: Event) => void;
  scrollListener?: ScrollListener;
  tooltipCleanUp?: () => void;
}
