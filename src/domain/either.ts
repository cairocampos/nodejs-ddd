export class Either<L, R> {
  private constructor(private dataLeft: L, private dataRight: R) {}

  static left<L, R>(data: L): Either<L, R> {
    return new Either(data, null as R);
  }

  static right<L, R>(data: R): Either<L, R> {
    return new Either(null as L, data);
  }

  getLeft(): L {
    return this.dataLeft;
  }

  getRight(): R {
    return this.dataRight;
  }

  isLeft(): boolean {
    return !!this.dataLeft;
  }

  isRight(): boolean {
    return !!this.dataRight;
  }
}

export function left<L, R>(data: L): Either<L, R> {
  return Either.left<L, R>(data);
}

export function right<L, R>(data: R): Either<L, R> {
  return Either.right<L, R>(data);
}
