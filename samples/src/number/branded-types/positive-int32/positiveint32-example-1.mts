// Sample code extracted from src/number/branded-types/positive-int32.mts (PositiveInt32)
import { PositiveInt32, asPositiveInt32 } from 'ts-data-forge';

const a = asPositiveInt32(2000000000);
const b = asPositiveInt32(500000000);

// Arithmetic operations with automatic clamping and positive constraint
const sum = PositiveInt32.add(a, b); // PositiveInt32 (2147483647 - clamped to MAX_VALUE)
const diff = PositiveInt32.sub(a, b); // PositiveInt32 (1500000000)
const reverseDiff = PositiveInt32.sub(b, a); // PositiveInt32 (1 - clamped to MIN_VALUE)
const product = PositiveInt32.mul(a, b); // PositiveInt32 (2147483647 - clamped due to overflow)

// Range operations (maintaining positive constraint)
const clamped = PositiveInt32.clamp(-1000); // PositiveInt32 (1)
const minimum = PositiveInt32.min(a, b); // PositiveInt32 (500000000)
const maximum = PositiveInt32.max(a, b); // PositiveInt32 (2000000000)

// Utility operations
const random = PositiveInt32.random(); // PositiveInt32 (random value in [1, 2147483647])
const power = PositiveInt32.pow(asPositiveInt32(2), asPositiveInt32(20)); // PositiveInt32 (1048576)

export { a, b, clamped, diff, maximum, minimum, power, product, random, reverseDiff, sum };
