import { ComponentPublicInstance } from "vue";

export interface IFocusable extends ComponentPublicInstance {
  focus: () => void;
}

export interface IFocusableExposed {
  focus: () => void;
}
