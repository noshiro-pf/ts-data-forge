// Example: src/functional/result.mts (expectToBe)
import { Result } from 'ts-data-forge';

const result = Result.ok(42);
const value = Result.expectToBe(result, 'Operation must succeed');
console.log(value); // 42

export { result, value };
