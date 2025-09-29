// Example: src/array/array-utils.mts (zeros)
import { Arr } from 'ts-data-forge';

const threeZeros = Arr.zeros(3);
const empty = Arr.zeros(0);
const count = 2;
const runtime = Arr.zeros(count);

const summary = {
  count,
  empty,
  runtime,
  threeZeros,
};

// embed-sample-code-ignore-below
export { summary };
