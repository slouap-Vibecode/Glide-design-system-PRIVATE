import { IFocusable } from "@/components/interfaces/iFocusable";
import { IFormFieldWithValidation } from "@/components/interfaces/iFormFieldWithValidation";
import type { InjectionKey } from "vue";

interface IFocusableFormFieldWithValidation extends IFormFieldWithValidation {
  focus: IFocusable["focus"];
}

export const formAddValidationInjectionKey = Symbol("nckFormAddFieldWithValidation") as InjectionKey<
  (component: IFocusableFormFieldWithValidation) => void
>;
export const formRemoveValidationInjectionKey = Symbol("nckFormRemoveFieldWithValidation") as InjectionKey<
  (component: IFocusableFormFieldWithValidation) => void
>;
