// Example: src/number/num.mts (isNonNegative)
import { Num } from 'ts-data-forge';

const value = 10;
const isValueNonNegative = Num.isNonNegative(value);

const candidate = -1 as -1 | 0 | 1;
const narrowed = Num.isNonNegative(candidate) ? candidate : undefined;

const summary = {
  candidate,
  isValueNonNegative,
  narrowed,
  value,
};

// embed-sample-code-ignore-below
export { summary };
