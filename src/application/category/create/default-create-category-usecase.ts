import { CategoryGateway } from "@domain/category/category-gateway";
import { CreateCategoryCommand } from "./create-category-command";
import { CreateCategoryOutput } from "./create-category-output";
import { CreateCategoryUseCase } from "./create-category-usecase";
import { Category } from "@domain/category/category";
import { Notification } from "@domain/validation/handlers/notification";
import { Either, left, right } from "@domain/either";

export class DefaultCreateCategoryUseCase extends CreateCategoryUseCase {
  constructor(private categoryGateway: CategoryGateway) {
    super();
  }

  execute(
    command: CreateCategoryCommand
  ): Either<Notification, CreateCategoryOutput> {
    const notification = Notification.create();
    const category = Category.create(
      command.name,
      command.description,
      command.isActive
    );

    category.validate(notification);

    return notification.hasError() ? left(notification) : this.create(category);
  }

  private create(
    category: Category
  ): Either<Notification, CreateCategoryOutput> {
    try {
      const result = this.categoryGateway.create(category);

      return right({
        id: result.getId(),
      });
    } catch (error) {
      return left(Notification.create(error as Error));
    }
  }
}
