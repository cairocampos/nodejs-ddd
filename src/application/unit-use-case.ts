export abstract class UnitUseCase<IN> {
  abstract execute(data: IN): void;
}
