// Example: src/array/array-utils.mts (isNonEmpty)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3] as const;
const result = Arr.isNonEmpty(numbers);
const first = result ? numbers[0] : undefined;

const summary = {
  first,
  numbers,
  result,
};

// embed-sample-code-ignore-below
export { summary };
