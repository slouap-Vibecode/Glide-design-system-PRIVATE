import { ComponentPublicInstance } from "vue";
import { IFocusableExposed } from "./iFocusable";
import { IFormFieldWithValidation } from "./iFormFieldWithValidation";

export interface INckRadioButtons extends IFormFieldWithValidation, IFocusableExposed, ComponentPublicInstance {}
