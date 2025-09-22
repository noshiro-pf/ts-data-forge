// Sample code extracted from src/number/branded-types/int32.mts (Int32)
import { Int32, asInt32 } from 'ts-data-forge';

const a = asInt32(2000000000);
const b = asInt32(500000000);

// Arithmetic operations with automatic clamping
const sum = Int32.add(a, b); // Int32 (2147483647 - clamped to MAX_VALUE)
const diff = Int32.sub(a, b); // Int32 (1500000000)
const product = Int32.mul(a, b); // Int32 (2147483647 - clamped due to overflow)

// Range operations
const clamped = Int32.clamp(5000000000); // Int32 (2147483647)
const minimum = Int32.min(a, b); // Int32 (500000000)
const maximum = Int32.max(a, b); // Int32 (2000000000)

// Utility operations
const absolute = Int32.abs(asInt32(-1000)); // Int32 (1000)
const random = Int32.random(); // Int32 (random value in valid range)

export { a, absolute, b, clamped, diff, maximum, minimum, product, random, sum };
