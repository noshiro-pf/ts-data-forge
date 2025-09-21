// Sample code extracted from src/functional/result.mts (isOk)
import { Result } from 'ts-data-forge';

// Basic type guard usage
const result: Result<number, string> = divide(10, 2);

if (Result.isOk(result)) {
  // TypeScript knows result is Result.Ok<number>
  console.log(result.value); // Safe to access .value
  console.log(Result.unwrapOk(result)); // 5
} else {
  // TypeScript knows result is Result.Err<string>
  console.log(result.value); // Error message
}

// Using in conditional logic
const processResult = (r: Result<string, Error>) => {
  return Result.isOk(r)
    ? r.value.toUpperCase() // Safe string operations
    : 'Error occurred';
};

// Filtering arrays of Results
const results: Result<number, string>[] = [
  Result.ok(1),
  Result.err('error'),
  Result.ok(2),
];
const successes = results.filter(Result.isOk);
// successes is Result.Ok<number>[]
