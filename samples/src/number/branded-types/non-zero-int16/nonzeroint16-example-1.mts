// Sample code extracted from src/number/branded-types/non-zero-int16.mts (NonZeroInt16)
import { NonZeroInt16, asNonZeroInt16 } from 'ts-data-forge';

const a = asNonZeroInt16(30000);
const b = asNonZeroInt16(-10000);

// Arithmetic operations with automatic clamping and non-zero constraint
const sum = NonZeroInt16.add(a, b); // NonZeroInt16 (20000)
const diff = NonZeroInt16.sub(a, b); // NonZeroInt16 (32767 - clamped to MAX_VALUE)
const product = NonZeroInt16.mul(a, b); // NonZeroInt16 (-32768 - clamped to MIN_VALUE)

// Utility operations
const absolute = NonZeroInt16.abs(b); // NonZeroInt16 (10000)
const minimum = NonZeroInt16.min(a, b); // NonZeroInt16 (-10000)
const maximum = NonZeroInt16.max(a, b); // NonZeroInt16 (30000)

// Range operations (avoiding zero)
const clamped = NonZeroInt16.clamp(0); // NonZeroInt16 (1 or -1, avoiding zero)
const random = NonZeroInt16.random(); // NonZeroInt16 (random non-zero value in range)
const power = NonZeroInt16.pow(asNonZeroInt16(2), asNonZeroInt16(10)); // NonZeroInt16 (1024)
