import { ValidationHandler } from "./validation-handler";

export abstract class Validator {
  protected constructor(private handler: ValidationHandler) {}

  abstract validate(): void;

  get validationHandler() {
    return this.handler;
  }
}
