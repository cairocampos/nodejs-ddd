import { Pagination } from "@domain/pagination/Pagination";
import { Category } from "./category";
import { CategoryID } from "./category-id";
import { CategorySearchQuery } from "./category-search-query";

export interface CategoryGateway {
  create(category: Category): Category;
  deleteById(andId: CategoryID): void;
  findById(andId: CategoryID): Category;
  update(aCategory: Category): Category;
  findAll(aQuery: CategorySearchQuery): Pagination<Category>;
}
