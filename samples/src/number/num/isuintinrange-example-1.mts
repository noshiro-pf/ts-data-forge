// Example: src/number/num.mts (isUintInRange)
import { Num } from 'ts-data-forge';

// Custom range validation
const isValidPercentage = Num.isUintInRange(0, 101);
if (isValidPercentage(value)) {
  // value is typed as 0 | 1 | ... | 100
}

export { isValidPercentage };
