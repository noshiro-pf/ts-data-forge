// Example: src/number/branded-types/non-zero-uint16.mts (NonZeroUint16)
import { NonZeroUint16, asNonZeroUint16 } from 'ts-data-forge';

const a = asNonZeroUint16(60000);
const b = asNonZeroUint16(10000);

// Arithmetic operations with automatic clamping and non-zero constraint
const sum = NonZeroUint16.add(a, b); // NonZeroUint16 (65535 - clamped to MAX_VALUE)
const diff = NonZeroUint16.sub(a, b); // NonZeroUint16 (50000)
const reverseDiff = NonZeroUint16.sub(b, a); // NonZeroUint16 (1 - clamped to MIN_VALUE)
const product = NonZeroUint16.mul(a, b); // NonZeroUint16 (65535 - clamped due to overflow)

// Range operations (maintaining non-zero constraint)
const clamped = NonZeroUint16.clamp(-100); // NonZeroUint16 (1)
const minimum = NonZeroUint16.min(a, b); // NonZeroUint16 (10000)
const maximum = NonZeroUint16.max(a, b); // NonZeroUint16 (60000)

// Utility operations
const random = NonZeroUint16.random(); // NonZeroUint16 (random value in [1, 65535])
const power = NonZeroUint16.pow(asNonZeroUint16(2), asNonZeroUint16(10)); // NonZeroUint16 (1024)

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
