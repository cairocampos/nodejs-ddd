import { UseCase } from "src/application/use-case";
import { CreateCategoryCommand } from "./create-category-command";
import { CreateCategoryOutput } from "./create-category-output";
import { Either } from "@domain/either";
import { Notification } from "@domain/validation/handlers/notification";

export abstract class CreateCategoryUseCase extends UseCase<
  CreateCategoryCommand,
  Either<Notification, CreateCategoryOutput>
> {}
