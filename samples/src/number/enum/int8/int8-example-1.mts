// Sample code extracted from src/number/enum/int8.mts (Int8)
import { Int8, asInt8 } from 'ts-data-forge';

// Basic usage
const a = asInt8(100);
const b = asInt8(50);

// Arithmetic with automatic clamping
const sum = Int8.add(a, b); // Int8 (127) - clamped to maximum
const diff = Int8.sub(a, b); // Int8 (50)
const product = Int8.mul(a, b); // Int8 (127) - clamped due to overflow
const quotient = Int8.div(a, b); // Int8 (2)

// Boundary handling
const overflow = Int8.add(asInt8(127), asInt8(10)); // Int8 (127) - clamped
const underflow = Int8.sub(asInt8(-128), asInt8(10)); // Int8 (-128) - clamped

// Utility operations
const clamped = Int8.clamp(200); // Int8 (127)
const absolute = Int8.abs(asInt8(-100)); // Int8 (100)
const minimum = Int8.min(a, b); // Int8 (50)
const maximum = Int8.max(a, b); // Int8 (100)

// Random generation
const die = Int8.random(asInt8(1), asInt8(6)); // Random 1-6
const offset = Int8.random(asInt8(-10), asInt8(10)); // Random ±10
