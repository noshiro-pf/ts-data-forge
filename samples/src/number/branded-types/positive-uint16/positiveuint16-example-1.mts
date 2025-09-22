// Sample code extracted from src/number/branded-types/positive-uint16.mts (PositiveUint16)
import { PositiveUint16, asPositiveUint16 } from 'ts-data-forge';

const a = asPositiveUint16(60000);
const b = asPositiveUint16(10000);

// Arithmetic operations with automatic clamping and positive constraint
const sum = PositiveUint16.add(a, b); // PositiveUint16 (65535 - clamped to MAX_VALUE)
const diff = PositiveUint16.sub(a, b); // PositiveUint16 (50000)
const reverseDiff = PositiveUint16.sub(b, a); // PositiveUint16 (1 - clamped to MIN_VALUE)
const product = PositiveUint16.mul(a, b); // PositiveUint16 (65535 - clamped due to overflow)

// Range operations (maintaining positive constraint)
const clamped = PositiveUint16.clamp(-100); // PositiveUint16 (1)
const minimum = PositiveUint16.min(a, b); // PositiveUint16 (10000)
const maximum = PositiveUint16.max(a, b); // PositiveUint16 (60000)

// Utility operations
const random = PositiveUint16.random(); // PositiveUint16 (random value in [1, 65535])
const power = PositiveUint16.pow(asPositiveUint16(2), asPositiveUint16(10)); // PositiveUint16 (1024)

export { a, b, clamped, diff, maximum, minimum, power, product, random, reverseDiff, sum };
