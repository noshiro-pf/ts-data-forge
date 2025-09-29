// Example: src/number/num.mts (increment)
import { Num } from 'ts-data-forge';

const start = 0;
const incremented = Num.increment(start);

const summary = {
  incremented,
  start,
};

// embed-sample-code-ignore-below
export { summary };
