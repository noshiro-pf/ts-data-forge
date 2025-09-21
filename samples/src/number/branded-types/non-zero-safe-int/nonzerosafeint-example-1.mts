// Sample code extracted from src/number/branded-types/non-zero-safe-int.mts (NonZeroSafeInt)
import { NonZeroSafeInt, asNonZeroSafeInt } from 'ts-data-forge';

const a = asNonZeroSafeInt(9007199254740000); // Near MAX_SAFE_INTEGER
const b = asNonZeroSafeInt(-1000);

// Arithmetic operations with non-zero safe range clamping
const sum = NonZeroSafeInt.add(a, b); // NonZeroSafeInt (9007199254739000)
const diff = NonZeroSafeInt.sub(a, b); // NonZeroSafeInt (clamped to MAX_SAFE_INTEGER)
const product = NonZeroSafeInt.mul(a, b); // NonZeroSafeInt (clamped to MIN_SAFE_INTEGER)

// Utility operations
const absolute = NonZeroSafeInt.abs(b); // NonZeroSafeInt (1000)
const minimum = NonZeroSafeInt.min(a, b); // NonZeroSafeInt (-1000)
const maximum = NonZeroSafeInt.max(a, b); // NonZeroSafeInt (a)

// Random generation
const random = NonZeroSafeInt.random(); // NonZeroSafeInt (random non-zero safe integer)
