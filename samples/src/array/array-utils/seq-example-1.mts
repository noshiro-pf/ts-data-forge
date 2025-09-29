// Example: src/array/array-utils.mts (seq)
import { Arr } from 'ts-data-forge';

const firstFour = Arr.seq(4);
const firstTwo = Arr.seq(2);
const empty = Arr.seq(0);

const summary = {
  empty,
  firstFour,
  firstTwo,
};

// embed-sample-code-ignore-below
export { summary };
