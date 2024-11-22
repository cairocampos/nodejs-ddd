import { AggregateRoot } from "@domain/aggregate-root";
import { CategoryID } from "./category-id";
import { ValidationHandler } from "@domain/validation/validation-handler";
import { CategoryValidator } from "./category-validator";

export class Category extends AggregateRoot<CategoryID> {
  private constructor(
    id: CategoryID,
    private name: string,
    private description: string,
    private active: boolean,
    private createdAt: number,
    private updatedAt: number,
    private deletedAt: number | null
  ) {
    super(id);
  }

  static create(name: string, description: string, isActive: boolean) {
    const id = CategoryID.unique();
    const now = Date.now();

    const deletedAt = isActive ? null : now;

    return new Category(id, name, description, isActive, now, now, deletedAt);
  }

  update(name: string, description: string, isActive: boolean): Category {
    if (isActive) {
      this.activate();
    } else {
      this.deactivate();
    }

    this.name = name;
    this.description = description;
    this.updatedAt = Date.now();
    return this;
  }

  validate(handler: ValidationHandler): void {
    new CategoryValidator(this, handler).validate();
  }

  activate(): Category {
    this.deletedAt = null;
    this.active = true;
    this.updatedAt = Date.now();
    return this;
  }

  deactivate(): Category {
    if (this.getDeletedAt() === null) {
      this.deletedAt = Date.now();
    }

    this.active = false;
    this.updatedAt = Date.now();
    return this;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  isActive() {
    return this.active;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getDeletedAt() {
    return this.deletedAt;
  }
}
