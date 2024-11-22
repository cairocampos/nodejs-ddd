import { Category } from "@domain/category/category";
import { CreateCategoryCommand } from "./create-category-command";
import { DefaultCreateCategoryUseCase } from "./default-create-category-usecase";

describe("CreateCategoryUseCase", () => {
  it("should return category id when calls create category with valid params", () => {
    const expectedName = "Filmes";
    const expectedDescription = "A categoria mais assistida";
    const expectedIsActive = true;

    const command: CreateCategoryCommand = {
      name: expectedName,
      description: expectedDescription,
      isActive: expectedIsActive,
    };

    const categoryGateway = {
      create: vi.fn(),
      deleteById: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      findAll: vi.fn(),
    };

    categoryGateway.create.mockImplementation((category: Category) => category);

    const useCase = new DefaultCreateCategoryUseCase(categoryGateway);
    const output = useCase.execute(command).getRight();

    expect(output).not.toBeNull();
    expect(output.id).not.toBeNull();

    expect(categoryGateway.create).toHaveBeenCalledTimes(1);
    expect(categoryGateway.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expectedName,
        description: expectedDescription,
        active: expectedIsActive,
        id: output.id,
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
        deletedAt: null,
      })
    );
  });
});
