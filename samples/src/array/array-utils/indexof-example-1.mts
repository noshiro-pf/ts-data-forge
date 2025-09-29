// Example: src/array/array-utils.mts (indexOf)
import { Arr } from 'ts-data-forge';

const values: readonly string[] = ['a', 'b', 'c', 'b'];
const firstB = Arr.indexOf(values, 'b');
const missing = Arr.indexOf(values, 'z');

const lettersResult = Arr.indexOf('b')(['x', 'y', 'b']);

const summary = {
  firstB,
  lettersResult,
  missing,
  values,
};

// embed-sample-code-ignore-below
export { summary };
