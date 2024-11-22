import { Validator } from "@domain/validation/validator";
import { ValidationHandler } from "@domain/validation/validation-handler";
import { Category } from "@domain/category/category";

export class CategoryValidator extends Validator {
  private static NAME_MIN_LENGTH = 3;
  private static NAME_MAX_LENGTH = 255;

  constructor(private category: Category, _handler: ValidationHandler) {
    super(_handler);
  }

  validate(): void {
    const name = this.category.name;
    if (name === null) {
      this.validationHandler.append(new Error("'name' should not be null"));
      return;
    }

    if (!name.trim()) {
      this.validationHandler.append(new Error("'name' should not be empty"));
      return;
    }

    const length = name.trim().length;
    if (
      length < CategoryValidator.NAME_MIN_LENGTH ||
      length > CategoryValidator.NAME_MAX_LENGTH
    ) {
      this.validationHandler.append(
        new Error("'name' must be between 3 and 255 characters")
      );
    }
  }
}
