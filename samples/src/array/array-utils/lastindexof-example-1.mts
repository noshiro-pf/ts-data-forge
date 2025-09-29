// Example: src/array/array-utils.mts (lastIndexOf)
import { Arr } from 'ts-data-forge';

const values: readonly string[] = ['a', 'b', 'c', 'b'];
const lastB = Arr.lastIndexOf(values, 'b');
const missing = Arr.lastIndexOf(values, 'z');

const numbers = [1, 2, 3, 2, 1] as const;
const lastTwo = Arr.lastIndexOf(numbers, 2);

const summary = {
  lastB,
  lastTwo,
  missing,
  numbers,
  values,
};

// embed-sample-code-ignore-below
export { summary };
