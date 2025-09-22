// Sample code extracted from src/functional/result.mts (unwrapErrThrow)
import { Result } from 'ts-data-forge';

const failure = Result.err('Network timeout');
console.log(Result.unwrapErrThrow(failure)); // "Network timeout"

const success = Result.ok(42);
try {
  Result.unwrapErrThrow(success); // throws Error: "Expected Err but got Ok: 42"
} catch (error) {
  console.log(error.message); // "Expected Err but got Ok: 42"
}

export { failure, success };
