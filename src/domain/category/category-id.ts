import { Identifier } from "@domain/identifier";
import crypto from "node:crypto";

export class CategoryID extends Identifier {
  constructor(private _value: string) {
    super();
  }

  static unique(): CategoryID {
    return this.from(crypto.randomUUID().toString().toLowerCase());
  }

  static from(id: string): CategoryID {
    return new CategoryID(id);
  }

  get value() {
    return this._value;
  }

  //   static from(id: crypto.UUID): CategoryID {
  //     return new CategoryID(id.toString().toLowerCase());
  //   }
}
