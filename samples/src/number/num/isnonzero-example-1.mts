// Example: src/number/num.mts (isNonZero)
import { Num } from 'ts-data-forge';

const value = 5;
if (Num.isNonZero(value)) {
  // value is typed as NonZeroNumber & 5
  const result = 10 / value; // Safe division
}

// Works with numeric literals
const literal = 0 as 0 | 1 | 2;
if (Num.isNonZero(literal)) {
  // literal is typed as 1 | 2
}

export { literal, value };
