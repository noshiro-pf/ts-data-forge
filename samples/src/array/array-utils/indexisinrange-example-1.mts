// Example: src/array/array-utils.mts (indexIsInRange)
import { Arr } from 'ts-data-forge';

const numbers = [10, 20] as const;
const zero = Arr.indexIsInRange(numbers, 0);
const one = Arr.indexIsInRange(numbers, 1);
const two = Arr.indexIsInRange(numbers, 2);
const empty = Arr.indexIsInRange([], 0);

const summary = {
  empty,
  numbers,
  one,
  two,
  zero,
};

// embed-sample-code-ignore-below
export { summary };
