// Sample code extracted from src/number/branded-types/int16.mts (Int16)
import { Int16, asInt16 } from 'ts-data-forge';

const a = asInt16(30000);
const b = asInt16(5000);

// Arithmetic operations with automatic clamping
const sum = Int16.add(a, b); // Int16 (32767 - clamped to MAX_VALUE)
const diff = Int16.sub(a, b); // Int16 (25000)
const product = Int16.mul(a, b); // Int16 (32767 - clamped due to overflow)

// Range operations
const clamped = Int16.clamp(100000); // Int16 (32767)
const minimum = Int16.min(a, b); // Int16 (5000)
const maximum = Int16.max(a, b); // Int16 (30000)

// Range constants
const range = Int16.MAX_VALUE - Int16.MIN_VALUE + 1; // 65536
