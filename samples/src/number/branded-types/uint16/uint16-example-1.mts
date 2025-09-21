// Sample code extracted from src/number/branded-types/uint16.mts (Uint16)
import { Uint16, asUint16 } from 'ts-data-forge';

const a = asUint16(60000);
const b = asUint16(10000);

// Arithmetic operations with automatic clamping
const sum = Uint16.add(a, b); // Uint16 (65535 - clamped to MAX_VALUE)
const diff = Uint16.sub(b, a); // Uint16 (0 - clamped to MIN_VALUE)
const product = Uint16.mul(a, b); // Uint16 (65535 - clamped due to overflow)

// Range operations
const clamped = Uint16.clamp(-100); // Uint16 (0)
const minimum = Uint16.min(a, b); // Uint16 (10000)
const maximum = Uint16.max(a, b); // Uint16 (60000)

// Utility operations
const random = Uint16.random(); // Uint16 (random value in [0, 65535])
const power = Uint16.pow(asUint16(2), asUint16(10)); // Uint16 (1024)
