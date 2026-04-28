export interface ITabOptions {
  heading: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  clickCallback?: Function; // maybe we should type it better, but it is a breaking change
  leadingIcon?: string;
  trailingIcon?: string;
  trailingCounterValue?: string;
}
