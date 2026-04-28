import { Colors } from "@/constants/colors";

export interface IContentSwitcherOption {
  text?: string;
  icon?: string;
  iconAltText?: string;
  disabled?: boolean;
  value: string;
  counterValue?: number;
  counterBackgroundColor?: Colors;
  counterFontColor?: Colors;
}
