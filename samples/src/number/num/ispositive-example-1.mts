// Example: src/number/num.mts (isPositive)
import { Num } from 'ts-data-forge';

const count = 5;
const average = Num.isPositive(count) ? 100 / count : undefined;

const value = 0 as -1 | 0 | 1 | 2;
const narrowed = Num.isPositive(value) ? value : undefined;

const summary = {
  average,
  count,
  narrowed,
  value,
};

// embed-sample-code-ignore-below
export { summary };
