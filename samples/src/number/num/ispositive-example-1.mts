// Sample code extracted from src/number/num.mts (isPositive)
import { Num } from 'ts-data-forge';

const count = 5;
if (Num.isPositive(count)) {
  // count is typed as PositiveNumber & 5
  const average = total / count; // Safe division
}

// Type narrowing with numeric literals
const value = 0 as -1 | 0 | 1 | 2;
if (Num.isPositive(value)) {
  // value is typed as 1 | 2
}
