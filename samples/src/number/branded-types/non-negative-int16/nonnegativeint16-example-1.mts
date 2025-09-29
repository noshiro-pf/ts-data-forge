// Example: src/number/branded-types/non-negative-int16.mts (NonNegativeInt16)
import { NonNegativeInt16, asNonNegativeInt16 } from 'ts-data-forge';

const a = asNonNegativeInt16(30_000);
const b = asNonNegativeInt16(5000);

// Arithmetic operations with automatic clamping
const sum = NonNegativeInt16.add(a, b); // NonNegativeInt16 (32767 - clamped to MAX_VALUE)
const diff = NonNegativeInt16.sub(a, b); // NonNegativeInt16 (25000)
const reverseDiff = NonNegativeInt16.sub(b, a); // NonNegativeInt16 (0 - clamped to MIN_VALUE)
const product = NonNegativeInt16.mul(a, b); // NonNegativeInt16 (32767 - clamped due to overflow)

// Range operations
const clamped = NonNegativeInt16.clamp(-100); // NonNegativeInt16 (0)
const minimum = NonNegativeInt16.min(a, b); // NonNegativeInt16 (5000)
const maximum = NonNegativeInt16.max(a, b); // NonNegativeInt16 (30000)

// Utility operations
const random = NonNegativeInt16.random(); // NonNegativeInt16 (random value in [0, 32767])
const power = NonNegativeInt16.pow(
  asNonNegativeInt16(2),
  asNonNegativeInt16(10),
); // NonNegativeInt16 (1024)

export {
  a,
  b,
  clamped,
  diff,
  maximum,
  minimum,
  power,
  product,
  random,
  reverseDiff,
  sum,
};
