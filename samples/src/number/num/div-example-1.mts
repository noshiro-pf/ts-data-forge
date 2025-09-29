// Example: src/number/num.mts (div)
import { Num } from 'ts-data-forge';

const basic = Num.div(10, 2);
const divisor: number = 5;
const guarded = Num.isNonZero(divisor) ? Num.div(100, divisor) : undefined;

const summary = {
  basic,
  guarded,
};

// embed-sample-code-ignore-below
export { summary };
