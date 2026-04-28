export interface IFormFieldWithValidation {
  isValidationEnabled: () => boolean;
  isValid: () => boolean;
  validate: () => Promise<boolean>;
}
