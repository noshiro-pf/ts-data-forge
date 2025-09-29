// Example: src/number/num.mts (isNonNegative)
import { Num } from 'ts-data-forge';

const value = 10;
if (Num.isNonNegative(value)) {
  // value is typed as NonNegativeNumber & 10
  const arr = Array.from({length: value}); // Safe array creation
}

// Type narrowing with unions
const index = -1 as -1 | 0 | 1;
if (Num.isNonNegative(index)) {
  // index is typed as 0 | 1
}

export { index, value };
