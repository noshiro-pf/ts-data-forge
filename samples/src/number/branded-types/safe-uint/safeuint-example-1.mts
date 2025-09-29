// Example: src/number/branded-types/safe-uint.mts (SafeUint)
import { SafeUint, asSafeUint } from 'ts-data-forge';

const a = asSafeUint(9_007_199_254_740_000); // Near MAX_SAFE_INTEGER
const b = asSafeUint(1000);

// Arithmetic operations with safe unsigned range clamping
const sum = SafeUint.add(a, b); // SafeUint (clamped to MAX_SAFE_INTEGER)
const diff = SafeUint.sub(b, a); // SafeUint (0 - clamped to MIN_VALUE)
const product = SafeUint.mul(a, b); // SafeUint (clamped to MAX_SAFE_INTEGER)

// Range operations
const clamped = SafeUint.clamp(-100); // SafeUint (0)
const minimum = SafeUint.min(a, b); // SafeUint (1000)
const maximum = SafeUint.max(a, b); // SafeUint (a)

// Utility operations
const random = SafeUint.random(); // SafeUint (random safe unsigned integer)
const power = SafeUint.pow(asSafeUint(2), asSafeUint(20)); // SafeUint (1048576)

export { a, b, clamped, diff, maximum, minimum, power, product, random, sum };
