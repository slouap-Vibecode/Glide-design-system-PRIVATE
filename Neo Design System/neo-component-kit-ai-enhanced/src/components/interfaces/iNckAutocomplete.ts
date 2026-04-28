import { IFormFieldWithValidation } from "./iFormFieldWithValidation";
import { IFocusable } from "./iFocusable";

// IFocusable includes Vue
export interface INckAutocomplete extends IFormFieldWithValidation, IFocusable {}

export type INckAutocompleteExposed = IFormFieldWithValidation & Pick<INckAutocomplete, "focus">;
