import { Identifier } from "@domain/identifier";
import assert from "node:assert";
import { ValidationHandler } from "./validation/validation-handler";

export abstract class Entity<ID extends Identifier> {
  protected constructor(protected id: ID) {
    assert.notEqual(this.id, null, "'id' should not be null");
  }

  abstract validate(handler: ValidationHandler): void;

  getId() {
    return this.id;
  }
}
