// Example: src/number/branded-types/non-zero-int32.mts (NonZeroInt32)
import { NonZeroInt32, asNonZeroInt32 } from 'ts-data-forge';

const a = asNonZeroInt32(2_000_000_000);
const b = asNonZeroInt32(-500_000_000);

// Arithmetic operations with automatic clamping and non-zero constraint
const sum = NonZeroInt32.add(a, b); // NonZeroInt32 (1500000000)
const diff = NonZeroInt32.sub(a, b); // NonZeroInt32 (2147483647 - clamped to MAX_VALUE)
const product = NonZeroInt32.mul(a, b); // NonZeroInt32 (-2147483648 - clamped to MIN_VALUE)

// Utility operations
const absolute = NonZeroInt32.abs(b); // NonZeroInt32 (500000000)
const minimum = NonZeroInt32.min(a, b); // NonZeroInt32 (-500000000)
const maximum = NonZeroInt32.max(a, b); // NonZeroInt32 (2000000000)

// Range operations (avoiding zero)
const clamped = NonZeroInt32.clamp(0); // NonZeroInt32 (1 or -1, avoiding zero)
const random = NonZeroInt32.random(); // NonZeroInt32 (random non-zero value in range)
const power = NonZeroInt32.pow(asNonZeroInt32(2), asNonZeroInt32(20)); // NonZeroInt32 (1048576)

export {
  a,
  absolute,
  b,
  clamped,
  diff,
  maximum,
  minimum,
  power,
  product,
  random,
  sum,
};
