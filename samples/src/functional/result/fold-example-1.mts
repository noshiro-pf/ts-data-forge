// Sample code extracted from src/functional/result.mts (fold)
import { Result } from 'ts-data-forge';

const result = Result.ok(42);
const folded = Result.fold(
  result,
  (x) => x * 2,
  () => 0,
);
console.log(Result.unwrapOk(folded)); // 84

export { folded, result };
