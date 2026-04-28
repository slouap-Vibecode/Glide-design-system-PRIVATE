import { IDatepickerOptions } from "./iNckDatepickerOptions";
import { INckTranslations } from "./iNckTranslations";

export interface INckGlobalOptions {
  translations?: INckTranslations;
  componentOptions?: {
    datepicker?: IDatepickerOptions;
  };
  utils?: {
    translateAndFormat?: (wording: string, parameters?: object) => string;
  };
  urls?: {
    iconsURL?: string;
  };
}
