import { DomainException } from "@domain/exceptions/domain-exception";
import { Validation, ValidationHandler } from "../validation-handler";

export class Notification implements ValidationHandler {
  private constructor(private errors: Array<Error>) {}

  static create(error?: Error) {
    if (error) {
      return new Notification([]).append(error);
    }

    return new Notification([]);
  }

  append(error: Error): Notification;
  append(error: ValidationHandler): Notification;

  append(error: Error | ValidationHandler): Notification {
    if (error instanceof Error) {
      this.errors.push(error);
    } else {
      this.errors.push(...error.getErrors());
    }

    return this;
  }

  validate(validation: Validation): ValidationHandler {
    try {
      validation.validate();
    } catch (error) {
      if (error instanceof DomainException) {
        this.append(error);
      } else if (error instanceof Error) {
        this.append(new Error(error.message));
      }
    }

    return this;
  }

  getErrors(): Error[] {
    return this.errors;
  }

  hasError(): boolean {
    return !!this.errors.length;
  }

  firstError(): Error | null {
    const error = this.errors.at(0);
    if (error !== undefined) {
      return error;
    }

    return null;
  }
}
