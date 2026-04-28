import { DatepickerPopoverPosition } from "@/constants/datepickerPopoverPosition";

/**
 * Popover properties for:
 * - Range datepicker (NckDatepickerRange).
 * - Single datepicker (NckDatepickerSingle).
 */
export interface IDatepickerPopover {
  /**
   * Position of the datepicker popover relatively to its triggers.
   *
   * Accepts one of the [DatepickerPopoverPosition](#datepickerpopoverposition) values
   */
  popoverPosition?: DatepickerPopoverPosition;

  /**
   * Useful in modals, sets popover as position fixed and computes its coordinates in javascript instead of css.
   * Use this wisely as is it will impact your performances.
   *
   * Accessibility limitation: when this property is used and browser default font size is changed after page loading, the position of the dropdown menu will be wrong.
   * This problem does not occur when the browser font size is customized before initial page rendering.
   * This is a defect but considered as minor because a user requiring custom browser default font size will probably not fiddle constantly with this browser-wide setting after page load but set it once and for all.
   */
  ignoreParentOverflow?: boolean;
}
