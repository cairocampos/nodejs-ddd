export class DomainException extends Error {
  private constructor(private errors: Error[]) {
    super("");
  }

  static with(errorsList: Error[]): DomainException;
  static with(anError: Error): DomainException;

  static with(data: any): DomainException {
    return new DomainException(Array.isArray(data) ? data : [data]);
  }

  getErrors(): Error[] {
    return this.errors;
  }
}
