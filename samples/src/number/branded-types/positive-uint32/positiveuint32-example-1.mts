// Sample code extracted from src/number/branded-types/positive-uint32.mts (PositiveUint32)
import { PositiveUint32, asPositiveUint32 } from 'ts-data-forge';

const a = asPositiveUint32(4000000000);
const b = asPositiveUint32(1000000000);

// Arithmetic operations with automatic clamping and positive constraint
const sum = PositiveUint32.add(a, b); // PositiveUint32 (4294967295 - clamped to MAX_VALUE)
const diff = PositiveUint32.sub(a, b); // PositiveUint32 (3000000000)
const reverseDiff = PositiveUint32.sub(b, a); // PositiveUint32 (1 - clamped to MIN_VALUE)
const product = PositiveUint32.mul(a, b); // PositiveUint32 (4294967295 - clamped due to overflow)

// Range operations (maintaining positive constraint)
const clamped = PositiveUint32.clamp(-100); // PositiveUint32 (1)
const minimum = PositiveUint32.min(a, b); // PositiveUint32 (1000000000)
const maximum = PositiveUint32.max(a, b); // PositiveUint32 (4000000000)

// Utility operations
const random = PositiveUint32.random(); // PositiveUint32 (random value in [1, 4294967295])
const power = PositiveUint32.pow(asPositiveUint32(2), asPositiveUint32(20)); // PositiveUint32 (1048576)
