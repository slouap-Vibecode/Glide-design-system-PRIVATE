export interface IFormFieldWithValidationProps {
  /**
   * Makes the field readonly.
   */
  readonly?: boolean;

  /**
   * Disable the field.
   */
  disabled?: boolean;

  /**
   * Whether the field is required or not.
   *
   * It provides style, accessibility and field validation.
   */
  required?: boolean;

  /**
   * A message to help user in their use of the field.
   * It is displayed below the field.
   */
  helpMessage?: string;
}
