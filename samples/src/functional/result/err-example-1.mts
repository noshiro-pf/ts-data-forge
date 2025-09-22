// Sample code extracted from src/functional/result.mts (err)
import { Result } from 'ts-data-forge';

// Basic error case
const failure = Result.err('Something went wrong');
console.log(Result.isErr(failure)); // true
console.log(Result.unwrapErr(failure)); // "Something went wrong"

// Function that can fail
function parseInteger(input: string): Result<number, string> {
  const num = parseInt(input, 10);
  if (isNaN(num)) {
    return Result.err(`Invalid number format: ${input}`);
  }
  return Result.ok(num);
}

const result = parseInteger('abc');
console.log(Result.unwrapErr(result)); // "Invalid number format: abc"

// Using custom error types
interface ValidationError {
  field: string;
  message: string;
}

const validationError = Result.err<ValidationError>({
  field: 'email',
  message: 'Invalid email format',
});

export { failure, parseInteger, result, validationError };
export type { ValidationError };
