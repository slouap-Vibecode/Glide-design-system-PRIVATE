export class ValidationRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validator: (value: any, params?: Record<string, any>) => boolean;
  public errorMessage: string;
  public relatedFieldName: string | undefined;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validator: (value: any, params?: Record<string, any>) => boolean,
    errorMessage: string,
    relatedFieldName?: string,
  ) {
    this.validator = validator;
    this.errorMessage = errorMessage;
    this.relatedFieldName = relatedFieldName ?? undefined;
  }
}
