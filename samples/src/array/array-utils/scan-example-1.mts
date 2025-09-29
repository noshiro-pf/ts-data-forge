// Example: src/array/array-utils.mts (scan)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3, 4] as const;
const runningTotal = Arr.scan(numbers, (acc, value) => acc + value, 0);
const runningProduct = Arr.scan(numbers, (acc, value) => acc * value, 1);

const strings = ['a', 'b', 'c'] as const;
const prefixes = Arr.scan(strings, (acc, value) => acc + value, '');

const summary = {
  numbers,
  prefixes,
  runningProduct,
  runningTotal,
  strings,
};

// embed-sample-code-ignore-below
export { summary };
