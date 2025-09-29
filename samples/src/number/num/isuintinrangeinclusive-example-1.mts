// Example: src/number/num.mts (isUintInRangeInclusive)
import { Num } from 'ts-data-forge';

const isValidSmallScore = Num.isUintInRangeInclusive(0, 10);
const checks = [isValidSmallScore(10), isValidSmallScore(11)];

const summary = {
  checks,
  isValidSmallScore,
};

// embed-sample-code-ignore-below
export { summary };
