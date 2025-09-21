// Sample code extracted from src/functional/result.mts (unwrapThrow)
import { Result } from 'ts-data-forge';

const success = Result.ok(42);
console.log(Result.unwrapThrow(success)); // 42

const failure = Result.err('Network error');
try {
  Result.unwrapThrow(failure); // throws Error: "Network error"
} catch (error) {
  console.log(error.message); // "Network error"
}
