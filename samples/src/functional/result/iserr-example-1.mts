// Sample code extracted from src/functional/result.mts (isErr)
import { Result } from 'ts-data-forge';

// Basic type guard usage
const result: Result<number, string> = divide(10, 0);

if (Result.isErr(result)) {
  // TypeScript knows result is Result.Err<string>
  console.log(result.value); // Safe to access error .value
  console.log(Result.unwrapErr(result)); // "Division by zero"
} else {
  // TypeScript knows result is Result.Ok<number>
  console.log(result.value); // Success value
}

// Error handling patterns
const handleResult = (r: Result<Data, ApiError>) => {
  if (Result.isErr(r)) {
    logError(r.value); // Safe error operations
    return null;
  }
  return processData(r.value);
};

// Collecting errors from multiple Results
const results: Result<string, ValidationError>[] = validateForm();
const errors = results.filter(Result.isErr).map((err) => err.value); // ValidationError[]
