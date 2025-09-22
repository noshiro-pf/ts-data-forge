// Sample code extracted from src/number/branded-types/uint.mts (Uint)
import { Uint, asUint } from 'ts-data-forge';

const a = asUint(100);
const b = asUint(150);

// Arithmetic operations with non-negative clamping
const sum = Uint.add(a, b); // Uint (250)
const diff = Uint.sub(a, b); // Uint (0 - clamped to MIN_VALUE)
const product = Uint.mul(a, b); // Uint (15000)
const quotient = Uint.div(b, a); // Uint (1)

// Range operations
const clamped = Uint.clamp(-50); // Uint (0)
const minimum = Uint.min(a, b); // Uint (100)
const maximum = Uint.max(a, b); // Uint (150)

// Utility operations
const random = Uint.random(); // Uint (random non-negative integer)
const power = Uint.pow(asUint(2), asUint(8)); // Uint (256)

export { a, b, clamped, diff, maximum, minimum, power, product, quotient, random, sum };
