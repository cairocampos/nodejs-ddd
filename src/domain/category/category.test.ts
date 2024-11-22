import { ThrowValidationHandler } from "@domain/validation/handlers/throw-validation-handler.js";
import { Category } from "@domain/category/category";
import { DomainException } from "@domain/exceptions/domain-exception.js";

describe("Category", () => {
  it("should create a new Category when passing valid params", () => {
    const expectedData = {
      name: "Filmes",
      description: "Categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    expect(category).not.toBeNull();
    expect(category.getId()).not.toBeNull();
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(category.getCreatedAt()).not.toBeNull();
    expect(category.getUpdatedAt()).not.toBeNull();
    expect(category.getDeletedAt()).toBeNull();
  });

  it("should receive error when create a new Category with null name", () => {
    const expectedData = {
      name: null,
      description: "Categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name!,
      expectedData.description,
      expectedData.isActive
    );

    try {
      category.validate(new ThrowValidationHandler());
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.getErrors()).toHaveLength(1);
      expect(error.getErrors().at(0).message).toEqual(
        "'name' should not be null"
      );
    }
  });

  it("should receive error when create a new Category with empty name", () => {
    const expectedData = {
      name: "  ",
      description: "Categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    try {
      category.validate(new ThrowValidationHandler());
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.getErrors()).toHaveLength(1);
      expect(error.getErrors().at(0).message).toEqual(
        "'name' should not be empty"
      );
    }
  });

  it("should receive error when create a new Category with name length less than 3", () => {
    const expectedData = {
      name: "Fi ",
      description: "Categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    try {
      category.validate(new ThrowValidationHandler());
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.getErrors()).toHaveLength(1);
      expect(error.getErrors().at(0).message).toEqual(
        "'name' must be between 3 and 255 characters"
      );
    }
  });

  it("should receive error when create a new Category with name more less than 255", () => {
    const expectedData = {
      name: "A".repeat(256),
      description: "Categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    expect(() => category.validate(new ThrowValidationHandler())).toThrow(
      DomainException.prototype
    );

    try {
      category.validate(new ThrowValidationHandler());
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error.getErrors()).toHaveLength(1);
      expect(error.getErrors().at(0).message).toEqual(
        "'name' must be between 3 and 255 characters"
      );
    }
  });

  it("should create a new Category when passing valid empty description", () => {
    const expectedData = {
      name: "Filmes",
      description: " ",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    expect(() => category.validate(new ThrowValidationHandler())).not.toThrow();

    expect(category).not.toBeNull();
    expect(category.getId()).not.toBeNull();
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(category.getCreatedAt()).not.toBeNull();
    expect(category.getUpdatedAt()).not.toBeNull();
    expect(category.getDeletedAt()).toBeNull();
  });

  it("should create a new Category when active is false", () => {
    const expectedData = {
      name: "Filmes",
      description: "A categoria mais assistida",
      isActive: false,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    expect(() => category.validate(new ThrowValidationHandler())).not.toThrow();

    expect(category).not.toBeNull();
    expect(category.getId()).not.toBeNull();
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(category.getCreatedAt()).not.toBeNull();
    expect(category.getUpdatedAt()).not.toBeNull();
    expect(category.getDeletedAt()).not.toBeNull();
  });

  it("should inactivate an active category when call deactivate", async () => {
    const expectedData = {
      name: "Filmes",
      description: "A categoria mais assistida",
      isActive: false,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      true
    );

    const updatedAt = category.getUpdatedAt();
    const createdAt = category.getCreatedAt();

    expect(() => category.validate(new ThrowValidationHandler())).not.toThrow();

    expect(category.isActive()).toBeTruthy();
    expect(category.getDeletedAt()).toBeNull();

    const currentCategory = category.deactivate();

    expect(currentCategory.getId()).toEqual(category.getId());
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(createdAt).toEqual(currentCategory.getCreatedAt());
    expect(category.getDeletedAt()).not.toBeNull();
    expect(currentCategory.isActive()).toBeFalsy();
    expect(currentCategory.getUpdatedAt()).toBeGreaterThanOrEqual(updatedAt);
  });

  it("should activate an inactive category when call activate", async () => {
    const expectedData = {
      name: "Filmes",
      description: "A categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      expectedData.name,
      expectedData.description,
      false
    );

    const updatedAt = category.getUpdatedAt();
    const createdAt = category.getCreatedAt();

    expect(() => category.validate(new ThrowValidationHandler())).not.toThrow();

    expect(category.isActive()).toBeFalsy();
    expect(category.getDeletedAt()).not.toBeNull();

    const currentCategory = category.activate();

    expect(currentCategory.getId()).toEqual(category.getId());
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(createdAt).toEqual(currentCategory.getCreatedAt());
    expect(category.getDeletedAt()).toBeNull();
    expect(currentCategory.isActive()).toBeTruthy();
    expect(currentCategory.getUpdatedAt()).toBeGreaterThanOrEqual(updatedAt);
  });

  it("should updated a valid category when call update", async () => {
    const expectedData = {
      name: "Filmes",
      description: "A categoria mais assistida",
      isActive: true,
    };
    const category = Category.create(
      "Film",
      "A categoria",
      expectedData.isActive
    );

    const updatedAt = category.getUpdatedAt();
    const createdAt = category.getCreatedAt();

    expect(() => category.validate(new ThrowValidationHandler())).not.toThrow();

    const currentCategory = category.update(
      expectedData.name,
      expectedData.description,
      expectedData.isActive
    );

    expect(currentCategory.getId()).toEqual(category.getId());
    expect(category.getName()).toEqual(expectedData.name);
    expect(category.getDescription()).toEqual(expectedData.description);
    expect(createdAt).toEqual(currentCategory.getCreatedAt());
    expect(category.getDeletedAt()).toBeNull();
    expect(currentCategory.isActive()).toBeTruthy();
    expect(currentCategory.getUpdatedAt()).toBeGreaterThanOrEqual(updatedAt);
  });
});
