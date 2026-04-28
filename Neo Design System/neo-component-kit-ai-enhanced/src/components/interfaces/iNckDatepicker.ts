import { ComponentPublicInstance } from "vue";
import { IFocusable } from "./iFocusable";
import { IFormFieldWithValidation } from "./iFormFieldWithValidation";

export interface INckDatepickerExposed extends IFormFieldWithValidation {
  focus: IFocusable["focus"];
}

export interface INckDatepicker extends INckDatepickerExposed, ComponentPublicInstance {}
