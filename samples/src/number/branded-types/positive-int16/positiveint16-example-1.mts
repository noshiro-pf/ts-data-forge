// Sample code extracted from src/number/branded-types/positive-int16.mts (PositiveInt16)
import { PositiveInt16, asPositiveInt16 } from 'ts-data-forge';

const a = asPositiveInt16(30000);
const b = asPositiveInt16(5000);

// Arithmetic operations with automatic clamping
const sum = PositiveInt16.add(a, b); // PositiveInt16 (32767 - clamped to MAX_VALUE)
const diff = PositiveInt16.sub(a, b); // PositiveInt16 (25000)
const reverseDiff = PositiveInt16.sub(b, a); // PositiveInt16 (1 - clamped to MIN_VALUE)
const product = PositiveInt16.mul(a, b); // PositiveInt16 (32767 - clamped due to overflow)

// Range operations
const clamped = PositiveInt16.clamp(0); // PositiveInt16 (1)
const minimum = PositiveInt16.min(a, b); // PositiveInt16 (5000)
const maximum = PositiveInt16.max(a, b); // PositiveInt16 (30000)

// Utility operations
const random = PositiveInt16.random(); // PositiveInt16 (random value in [1, 32767])
const power = PositiveInt16.pow(asPositiveInt16(2), asPositiveInt16(10)); // PositiveInt16 (1024)
