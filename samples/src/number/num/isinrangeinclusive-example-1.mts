// Example: src/number/num.mts (isInRangeInclusive)
import { Num } from 'ts-data-forge';

const inRange = Num.isInRangeInclusive(1, 10);
const checks = [inRange(1), inRange(5), inRange(11)];

const summary = {
  checks,
  inRange,
};

// embed-sample-code-ignore-below
export { summary };
