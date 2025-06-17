import { match, Optional, pipe, Result } from 'ts-data-forge';

// Optional for nullable values
const maybeValue = Optional.some(42);

const doubled = Optional.map(maybeValue, (x) => x * 2);
console.log(Optional.unwrapOr(doubled, 0)); // 84

// Result for error handling
const success = Result.ok(42);

const mapped = Result.map(success, (x) => x * 2);
if (Result.isOk(mapped)) {
  console.log(mapped.value); // 84
}

// Advanced pipe usage
const processNumber = (input: number): Optional<number> => {
  const result = pipe(input)
    .map((x) => x * 2) // Regular transformation
    .map((x) => x + 10).value; // Chain transformations // Get the result

  // Convert to Optional and continue processing
  return result > 50 ? Optional.some(result / 2) : Optional.none;
};

console.log(processNumber(30)); // Optional.some(35)
console.log(processNumber(10)); // Optional.none

// Pattern matching with match
type Status = 'loading' | 'success' | 'error';

const handleStatus = (status: Status, data?: string): string =>
  match(status, {
    loading: 'Please wait...',
    success: `Data: ${data ?? 'No data'}`,
    error: 'An error occurred',
  });

console.log(handleStatus('loading')); // 'Please wait...'
console.log(handleStatus('success', 'Hello')); // 'Data: Hello'
console.log(handleStatus('error')); // 'An error occurred'

// Pattern matching with Result
const processResult = (result: Result<number, string>): string =>
  Result.isOk(result) ? `Success: ${result.value}` : `Error: ${result.value}`;

console.log(processResult(Result.ok(42))); // 'Success: 42'
console.log(processResult(Result.err('Failed'))); // 'Error: Failed'
