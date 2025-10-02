// Example: src/functional/pipe.mts
import { Optional, pipe } from 'ts-data-forge';

const value = pipe(2)
  .map((n) => n * 4)
  .map((n) => n.toString()).value;

const optionalValue = pipe(Optional.some('hello')).mapOptional(
  (text) => text.length + 2,
).value;

const summary = {
  optionalValue,
  value,
};

// embed-sample-code-ignore-below
export { summary };
