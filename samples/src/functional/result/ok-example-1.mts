// Example: src/functional/result.mts (ok)
import { Result } from 'ts-data-forge';

// Basic success case
const success = Result.ok(42);
console.log(Result.isOk(success)); // true
console.log(Result.unwrapOk(success)); // 42

// Function that returns a Result
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.err('Division by zero');
  }
  return Result.ok(a / b);
}

const result = divide(10, 2);
console.log(Result.unwrapOk(result)); // 5

export { divide, result, success };
