import { match, Optional, pipe, Result } from 'ts-data-forge';

// Optional for nullable values
const maybeValue = Optional.some(42);

const doubled = Optional.map(maybeValue, (x) => x * 2);

assert.strictEqual(Optional.unwrapOr(doubled, 0), 84);

// Result for error handling
const success = Result.ok(42);

const mapped = Result.map(success, (x) => x * 2);

assert.deepStrictEqual(mapped, Result.ok(84));

// Advanced pipe usage
const processNumber = (input: number): Optional<number> =>
  pipe(input)
    .map((x) => x * 2) // Regular transformation
    .map((x) => x + 10) // Chain transformations
    .map((x) => (x > 50 ? Optional.some(x / 2) : Optional.none)).value; // Get the result

assert.deepStrictEqual(processNumber(30), Optional.some(35));

assert.deepStrictEqual(processNumber(10), Optional.none);

// Pattern matching with match
type Status = 'loading' | 'success' | 'error';

const handleStatus = (status: Status, data?: string): string =>
  match(status, {
    loading: 'Please wait...',
    success: `Data: ${data ?? 'No data'}`,
    error: 'An error occurred',
  });

assert.strictEqual(handleStatus('loading'), 'Please wait...');
assert.strictEqual(handleStatus('success', 'Hello'), 'Data: Hello');
assert.strictEqual(handleStatus('error'), 'An error occurred');

// Pattern matching with Result
const processResult = (result: Result<number, string>): string =>
  Result.isOk(result) ? `Success: ${result.value}` : `Error: ${result.value}`;

assert.strictEqual(processResult(Result.ok(42)), 'Success: 42');
assert.strictEqual(processResult(Result.err('Failed')), 'Error: Failed');
