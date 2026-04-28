import { TimeInterval } from "@/constants/timeInterval";

export interface IDatepickerCommonProperties {
  /**
   * Whether the field is required or not.
   *
   * It provides style, accessibility and field validation.
   */
  required?: boolean;

  /**
   * @ignore
   * Undocumented : this option is for testing purpose
   */
  todayDate?: Date | null | undefined;

  /**
   * Minimum date allowed (the provided date is included).
   *
   * If you want to restrict selection to a range of dates, use in conjunction with maxDateAllowed.
   *
   * Note: if you are using withTimeRange option, the upper selected range time value will be checked against minDateAllowed to verify validity of the selected range
   */
  minDateAllowed?: Date | null | undefined;

  /**
   * Maximum date allowed (the provided date is included).
   *
   * If you want to restrict selection to a range of dates, use in conjunction with minDateAllowed.
   *
   * Note: if you are using withTimeRange option, the lower selected range time value will be checked against maxDateAllowed to verify validity of the selected range
   */
  maxDateAllowed?: Date | null | undefined;

  /**
   * Error message to display when a selected date is before the minimum allowed date (minDateAllowed).
   *
   * Required when minDateAllowed is provided.
   */
  beforeMinDateErrorMessage?: string;

  /**
   * Error message to display when a selected date is after the maximum allowed date (maxDateAllowed).
   *
   * Required when maxDateAllowed is provided.
   */
  afterMaxDateErrorMessage?: string;

  /**
   * Add ability to pick also time
   */
  withTime?: boolean;

  /**
   * Only applicable when Time option ("withTime") is enabled. It is ignored otherwise.   *
   * Time increment for selectable time.
   */
  timeInterval?: TimeInterval;

  /**
   * Only applicable when Time option ("withTime") is enabled. It is ignored otherwise.   *
   * Allow time ranges ("morning", "afternoon", etc.) to be displayed and selectable by user
   */
  withTimeRange?: boolean;

  /**
   * Only applicable when Time option ("withTime") is enabled. It is ignored otherwise.   *
   * Allow time range representing all day to be displayed and selectable by user
   */
  withFlexibleTime?: boolean;

  /**
   * Display a "calendar" icon in front of the date fields.   *
   */
  hasLeadingIcon?: boolean;
}
