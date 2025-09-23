// Example: src/array/array-utils.mts (head)
import { Arr, Optional } from 'ts-data-forge';

const empty = Arr.head([]);
const tupleHead = Arr.head(['first', 'second'] as const);
const numbers: readonly number[] = [10, 20, 30];
const maybeNumber = Arr.head(numbers);

const firstNumber = Optional.unwrapOr(maybeNumber, 0);

const nested = [[1, 2], [], [3]] as const;
const available = nested.map(Arr.head).filter(Optional.isSome);

const summary = {
  available,
  empty,
  firstNumber,
  maybeNumber,
  tupleHead,
};

// embed-sample-code-ignore-below
export { numbers, summary };
