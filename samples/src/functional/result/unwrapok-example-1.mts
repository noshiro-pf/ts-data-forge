// Sample code extracted from src/functional/result.mts (unwrapOk)
import { Result } from 'ts-data-forge';

// With guaranteed Ok - returns the value
const success = Result.ok(42);
const value = Result.unwrapOk(success); // Type: number, Value: 42

// With general Result - may return undefined
const maybeResult: Result<string, Error> = fetchData();
const data = Result.unwrapOk(maybeResult); // Type: string | undefined

// Safe pattern for handling both cases
const result = Result.ok('hello');
const unwrapped = Result.unwrapOk(result);
if (unwrapped !== undefined) {
  console.log(unwrapped.toUpperCase()); // "HELLO"
}

// Useful in conditional chains
const processResult = (r: Result<number, string>) => {
  const value = Result.unwrapOk(r);
  return value !== undefined ? value * 2 : 0;
};

export { data, maybeResult, processResult, result, success, unwrapped, value };
