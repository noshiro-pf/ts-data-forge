// Example: src/array/array-utils.mts (size)
import { Arr } from 'ts-data-forge';

const tuple = ['a', 'b', 'c'] as const;
const numbers: readonly number[] = [1, 2, 3, 4];

const tupleSize = Arr.size(tuple);
const numberSize = Arr.size(numbers);
const emptySize = Arr.size([]);

const summary = {
  emptySize,
  numberSize,
  numbers,
  tuple,
  tupleSize,
};

// embed-sample-code-ignore-below
export { summary };
