// Example: src/array/array-utils.mts (range)
import { Arr } from 'ts-data-forge';

const oneToFour = Arr.range(1, 5);
const evens = Arr.range(0, 10, 2);
const countdown = Arr.range(5, 0, -1);
const empty = Arr.range(3, 3);

const summary = {
  countdown,
  empty,
  evens,
  oneToFour,
};

// embed-sample-code-ignore-below
export { summary };
