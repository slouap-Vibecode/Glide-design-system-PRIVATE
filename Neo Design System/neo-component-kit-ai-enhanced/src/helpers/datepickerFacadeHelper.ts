export class DatepickerFacadeHelper {
  public static getFacadeComponentName(isRangeDatepicker: boolean): "NckDatepickerRange" | "NckDatepickerSingle" {
    return isRangeDatepicker ? "NckDatepickerRange" : "NckDatepickerSingle";
  }
}
