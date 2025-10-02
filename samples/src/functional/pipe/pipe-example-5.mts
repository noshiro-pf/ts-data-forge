// Example: src/functional/pipe.mts
import { Optional, pipe } from 'ts-data-forge';

const value = pipe(2)
  .map((n) => n * 7)
  .map((n) => n.toString()).value;

const optionalValue = pipe(Optional.some('hello')).mapOptional(
  (text) => text.length + 5,
).value;

const summary = {
  optionalValue,
  value,
};

// embed-sample-code-ignore-below
export { summary };
