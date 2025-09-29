// Example: src/number/num.mts (isNonZero)
import { Num } from 'ts-data-forge';

const candidate = 5;
const safeDivision = Num.isNonZero(candidate) ? 10 / candidate : undefined;

const literal = 0 as 0 | 1 | 2;
const narrowed = Num.isNonZero(literal) ? literal : undefined;

const summary = {
  candidate,
  literal,
  narrowed,
  safeDivision,
};

// embed-sample-code-ignore-below
export { summary };
