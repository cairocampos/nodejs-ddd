export interface Validation {
  validate(): void;
}

export interface ValidationHandler {
  append(error: Error): ValidationHandler;
  append(error: ValidationHandler): ValidationHandler;
  validate(validation: Validation): ValidationHandler;
  getErrors(): Error[];
  hasError(): boolean;
  firstError(): Error | null;
}
