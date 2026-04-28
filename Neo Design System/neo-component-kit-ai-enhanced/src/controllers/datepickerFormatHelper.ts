import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GlobalOptionsProvider } from "./globalOptionsProvider";

type DateOption = Date | null | undefined;

dayjs.extend(customParseFormat);

export class DatepickerFormatHelper {
  /*
   * This format is used by the 3rd-party library for its configuration.
   * It must be consistent with INTERNAL_FORMAT
   */
  private static readonly CONFIGURATION_FORMAT = "d/m/Y";

  /*
   * This format is used for all date/string conversions from/to the 3rd-party library
   */
  private static readonly INTERNAL_FORMAT = "DD/MM/YYYY";

  private static instance: DatepickerFormatHelper;

  private externalFormat: string;

  private constructor() {
    this.externalFormat = "";
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DatepickerFormatHelper();
    }
    return this.instance;
  }

  public static initialize(facadeComponentName: "NckDatepickerRange" | "NckDatepickerSingle") {
    const options = GlobalOptionsProvider.getInstance().getOptions();
    const instance = this.getInstance();
    const dateFormat = options?.componentOptions?.datepicker?.dateFormat;
    if (!dateFormat) {
      throw new Error(
        `Error in ${facadeComponentName}: you must provide the 'componentOptions.datepicker.dateFormat' option`,
      );
    } else {
      instance.externalFormat = dateFormat;
    }
  }

  /*
   * The format validator function for validation rules
   */
  public static FORMAT_VALIDATOR = (value: string) =>
    DatepickerFormatHelper.getInstance().parseExternal(value) !== null;

  public getConfigurationFormat() {
    return DatepickerFormatHelper.CONFIGURATION_FORMAT;
  }

  public getDateFormat() {
    return this.externalFormat;
  }

  public formatInternal(date: DateOption) {
    return this.format(date, DatepickerFormatHelper.INTERNAL_FORMAT);
  }

  public formatExternal(date: DateOption) {
    return this.format(date, this.externalFormat);
  }

  public parseInternal(text: string) {
    return this.parse(text, DatepickerFormatHelper.INTERNAL_FORMAT);
  }

  public parseExternal(text: string) {
    return this.parse(text, this.externalFormat);
  }

  private format(date: DateOption, formatString: string) {
    return date ? dayjs(date).format(formatString) : "";
  }

  private parse(text: string, formatString: string) {
    const parsed = dayjs(text, formatString, true);
    return parsed.isValid() ? parsed.toDate() : null;
  }
}
