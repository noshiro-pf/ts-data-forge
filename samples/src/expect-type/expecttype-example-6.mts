// Example: src/expect-type.mts
import { Optional, expectType } from 'ts-data-forge';

const maybeNumber = Optional.some(42);
expectType<typeof maybeNumber, Optional<number>>('<=');

const summary = {
  maybeNumber,
};

// embed-sample-code-ignore-below
export { summary };
