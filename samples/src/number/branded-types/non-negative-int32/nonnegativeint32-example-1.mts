// Sample code extracted from src/number/branded-types/non-negative-int32.mts (NonNegativeInt32)
import { NonNegativeInt32, asNonNegativeInt32 } from 'ts-data-forge';

const a = asNonNegativeInt32(2000000000);
const b = asNonNegativeInt32(500000000);

// Arithmetic operations with automatic clamping
const sum = NonNegativeInt32.add(a, b); // NonNegativeInt32 (2147483647 - clamped to MAX_VALUE)
const diff = NonNegativeInt32.sub(a, b); // NonNegativeInt32 (1500000000)
const reverseDiff = NonNegativeInt32.sub(b, a); // NonNegativeInt32 (0 - clamped to MIN_VALUE)
const product = NonNegativeInt32.mul(a, b); // NonNegativeInt32 (2147483647 - clamped due to overflow)

// Range operations
const clamped = NonNegativeInt32.clamp(-1000); // NonNegativeInt32 (0)
const minimum = NonNegativeInt32.min(a, b); // NonNegativeInt32 (500000000)
const maximum = NonNegativeInt32.max(a, b); // NonNegativeInt32 (2000000000)

// Utility operations
const random = NonNegativeInt32.random(); // NonNegativeInt32 (random value in [0, 2147483647])
const power = NonNegativeInt32.pow(
  asNonNegativeInt32(2),
  asNonNegativeInt32(20),
); // NonNegativeInt32 (1048576)
