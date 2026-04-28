import { ComponentPublicInstance } from "vue";
import { IFocusableExposed } from "./iFocusable";
import { IFormFieldWithValidation } from "./iFormFieldWithValidation";

export interface INckTextArea extends IFormFieldWithValidation, IFocusableExposed, ComponentPublicInstance {}
