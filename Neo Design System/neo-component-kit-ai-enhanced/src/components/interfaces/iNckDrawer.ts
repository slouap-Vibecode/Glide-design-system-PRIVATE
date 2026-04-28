import { ComponentPublicInstance } from "vue";

export interface INckDrawer extends ComponentPublicInstance {
  closeDrawer: (...args: unknown[]) => void;
  dismissDrawer: (...args: unknown[]) => void;
  setFocusAtTheBeginning: () => void;
}
