// Sample code extracted from src/number/branded-types/non-zero-uint32.mts (NonZeroUint32)
import { NonZeroUint32, asNonZeroUint32 } from 'ts-data-forge';

const a = asNonZeroUint32(4000000000);
const b = asNonZeroUint32(1000000000);

// Arithmetic operations with automatic clamping and non-zero constraint
const sum = NonZeroUint32.add(a, b); // NonZeroUint32 (4294967295 - clamped to MAX_VALUE)
const diff = NonZeroUint32.sub(a, b); // NonZeroUint32 (3000000000)
const reverseDiff = NonZeroUint32.sub(b, a); // NonZeroUint32 (1 - clamped to MIN_VALUE)
const product = NonZeroUint32.mul(a, b); // NonZeroUint32 (4294967295 - clamped due to overflow)

// Range operations (maintaining non-zero constraint)
const clamped = NonZeroUint32.clamp(-100); // NonZeroUint32 (1)
const minimum = NonZeroUint32.min(a, b); // NonZeroUint32 (1000000000)
const maximum = NonZeroUint32.max(a, b); // NonZeroUint32 (4000000000)

// Utility operations
const random = NonZeroUint32.random(); // NonZeroUint32 (random value in [1, 4294967295])
const power = NonZeroUint32.pow(asNonZeroUint32(2), asNonZeroUint32(20)); // NonZeroUint32 (1048576)
