// Example: src/array/array-utils.mts (last)
import { Arr, Optional } from 'ts-data-forge';

const empty = Arr.last([]);
const tupleLast = Arr.last(['first', 'last'] as const);
const numbers: readonly number[] = [10, 20, 30];
const maybeNumber = Arr.last(numbers);

const lastNumber = Optional.unwrapOr(maybeNumber, 0);

const nested = [[1], [], [2, 3]] as const;
const available = nested.map(Arr.last).filter(Optional.isSome);

const summary = {
  available,
  empty,
  lastNumber,
  maybeNumber,
  numbers,
  tupleLast,
};

// embed-sample-code-ignore-below
export { summary };
