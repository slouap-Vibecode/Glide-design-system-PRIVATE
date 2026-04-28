export interface IDropdownOption<T = unknown> {
  label: string;
  subLabel?: string;
  value: T;
  disabled?: boolean;
}
