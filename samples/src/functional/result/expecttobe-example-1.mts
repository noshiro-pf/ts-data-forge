// Example: src/functional/result.mts
import { Result } from 'ts-data-forge';

const success = Result.ok(5);
const failure = Result.err(new Error('fail'));
const mapped = Result.map(success, (n) => n * 2);
const mappedErr = Result.mapErr(failure, (error) => error.message);
const swapped = Result.swap(failure);
const optional = Result.toOptional(success);
const fallback = Result.orElse(failure, success);

const summary = {
  fallback,
  mapped,
  mappedErr,
  optional,
  success,
  swapped,
};

// embed-sample-code-ignore-below
export { summary };

