import { ValidationRule } from "@/models/validationRule";
import { IFormFieldWithValidationProps } from "./iFormFieldWithValidationProps";

export interface IFormFieldWithValidationAndCustomRulesProps extends IFormFieldWithValidationProps {
  /**
   * Validation rules for the field. They control the error display of the input field.
   *
   * It is an array of objects with two mandatory fields, and an optional one:
   *
   *  - validator (function, (value: any, otherFields: Record<string, any>) => boolean): a function that has a mandatory value parameter (the current value of
   * the input will be passed) and, if the relatedFieldName option is used, an optional object parameter (this object will have the relatedFieldName as a key,
   * along with its value). The validator function must return a boolean. If true it means the field is valid, and if it is false then it is invalid.
   *  - errorMessage (string): the message displayed in case the field is invalid.
   *  - relatedFieldName: optional, the name of another validatable field, which value would be of use for this rule.
   * Important : this field must be located within the same [NckForm](#nckform) as the field to validate.
   *
   * Note: only one error at a time is displayed to the user.
   */
  rules?: ValidationRule[];
}
