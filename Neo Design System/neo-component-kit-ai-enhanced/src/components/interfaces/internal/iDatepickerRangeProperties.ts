import { IDateWithRange } from "@/models/iDateWithRange";
import { ValidationRule } from "@/models/validationRule";
import { IDatepickerCommonProperties } from "./iDatepickerCommonProperties";

export interface IDatepickerRangeProperties extends IDatepickerCommonProperties {
  /**
   * Whether the datepicker is a range or a single date selection.
   *
   * Defaults to range datepicker.
   *
   * @ignore
   * Undocumented: this is used internally to handle a range or a single datepicker.
   */
  isRange?: boolean;

  /**
   * The v-model for the dates.
   * It represents a date range, and should be an array:
   *  - When Date picker only (withTime absent or false): accepting Date or null values.
   *  - When Date & Time picker (withTime being true or present): accepting an object implementing IDateWithRange { date: Date, range: 0 | 3 | 12 } or null.
   * A null value has the meaning of an unset date.
   */
  modelValue?: [IDateWithRange | Date | null, IDateWithRange | Date | null];

  /**
   * Name for the start date html input.
   */
  startRangeName: string;

  /**
   * Name for the end date html input.
   */
  endRangeName: string;

  /**
   * Label for the start date.
   */
  startRangeLabel: string;

  /**
   * Label for the end date.
   */
  endRangeLabel: string;

  /**
   * Validation rules for the start date field.
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
  startRangeRules?: ValidationRule[];

  /**
   * Validation rules for the end date field.
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
  endRangeRules?: ValidationRule[];

  /**
   * The label for the time picker for the start date. Only used in Date & Time picker (with "withTime" option).
   */
  startTimeLabel?: string;

  /**
   * The label for the time picker for the end date. Only used in Date & Time picker (with "withTime" option).
   */
  endTimeLabel?: string;

  /**
   * *Required* when using "withTime" option. The name for the time picker input for the start date. Only used in Date & Time picker (with "withTime" option).
   */
  startTimeName?: string;

  /**
   * *Required* when using "withTime" option. The name for the time picker input for the end date. Only used in Date & Time picker (with "withTime" option).
   */
  endTimeName?: string;

  /**
   * *Required* when using "withTime" option. The text alternative for the input clearing button for the start time picker. Only used in Date & Time picker (with "withTime" option).
   */
  startTimeClearButtonAltText?: string;

  /**
   * *Required* when using "withTime" option. The text alternative for the input clearing button for the end time picker. Only used in Date & Time picker (with "withTime" option).
   */
  endTimeClearButtonAltText?: string;
}
