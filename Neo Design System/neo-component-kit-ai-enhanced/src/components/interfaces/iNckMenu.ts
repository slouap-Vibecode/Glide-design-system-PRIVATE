import { ComponentPublicInstance } from "vue";

export interface INckMenu extends ComponentPublicInstance {
  focusMenu: () => void;
  putCurrentlySelectedElementIntoView: () => void;
  selectNextElement: ($event?: KeyboardEvent) => void;
  selectPreviousElement: ($event?: KeyboardEvent) => void;
  setNavigatedWithSelectedOrFirstEnabled: () => void;
}
