// Example: src/number/num.mts (decrement)
import { Num } from 'ts-data-forge';

const start = 3;
const decremented = Num.decrement(start);

const summary = {
  decremented,
  start,
};

// embed-sample-code-ignore-below
export { summary };
