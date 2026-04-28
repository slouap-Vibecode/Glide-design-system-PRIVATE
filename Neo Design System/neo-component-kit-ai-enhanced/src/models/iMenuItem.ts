export interface IMenuItem<Data = unknown> {
  label: string;
  subLabel?: string;
  value: Data;
  disabled?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  trailingCounterValue?: number;
}
