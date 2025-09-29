// Example: src/functional/result.mts (unwrapOkOr)
import { Result } from 'ts-data-forge';

const result = Result.ok(42);
const value = Result.unwrapOkOr(result, 0);
console.log(value); // 42

export { result, value };
