// Sample code extracted from src/functional/result.mts (flatMap)
import { Result } from 'ts-data-forge';

const divide = (a: number, b: number): Result<number, string> =>
  b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
console.log(Result.unwrapOk(result)); // 5
