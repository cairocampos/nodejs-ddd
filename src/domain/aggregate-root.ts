import { Identifier } from "@domain/identifier";
import { Entity } from "@domain/entity";

export abstract class AggregateRoot<ID extends Identifier> extends Entity<ID> {
  constructor(protected id: ID) {
    super(id);
  }
}
