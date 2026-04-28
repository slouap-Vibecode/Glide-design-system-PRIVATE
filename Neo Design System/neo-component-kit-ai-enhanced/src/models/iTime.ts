export interface ITime {
  /**
   * Field to store the time. The "date" (year, month, day) are considered irrelevant in this case.
   */
  time: Date | null;

  /**
   * Represent a range of hours before and after the current time when using a range.
   * Note that range have precise expected "time" values when being used and this is not used as a "free field".
   */
  range: 0 | 3 | 12;
}
