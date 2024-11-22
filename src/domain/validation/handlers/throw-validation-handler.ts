import { DomainException } from "@domain/exceptions/domain-exception";
import { Validation, ValidationHandler } from "../validation-handler";

export class ThrowValidationHandler implements ValidationHandler {
  append(error: Error): ValidationHandler;
  append(error: ValidationHandler): ValidationHandler;

  append(error: any): ValidationHandler {
    if (error instanceof Error) {
      throw DomainException.with(error);
    }

    throw DomainException.with(error.getErrors());
  }

  validate(validation: Validation): ValidationHandler {
    try {
      validation.validate();
    } catch (error: any) {
      throw DomainException.with(error);
    }

    return this;
  }

  getErrors(): Error[] {
    return [];
  }

  hasError(): boolean {
    return !!this.getErrors().length;
  }

  firstError(): Error | null {
    return null;
  }
}
