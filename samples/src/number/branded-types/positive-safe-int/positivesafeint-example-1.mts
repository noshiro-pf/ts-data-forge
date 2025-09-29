// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const a = asPositiveSafeInt(1_000_000);
const b = asPositiveSafeInt(2_000_000);

// Arithmetic operations with positive safe range clamping
const sum = PositiveSafeInt.add(a, b); // PositiveSafeInt (3000000)
const diff = PositiveSafeInt.sub(a, b); // PositiveSafeInt (1 - clamped to MIN_VALUE)
const product = PositiveSafeInt.mul(a, b); // PositiveSafeInt (2000000000000)

// Range operations
const clamped = PositiveSafeInt.clamp(0); // PositiveSafeInt (1)
const minimum = PositiveSafeInt.min(a, b); // PositiveSafeInt (1000000)
const maximum = PositiveSafeInt.max(a, b); // PositiveSafeInt (2000000)

// Utility operations
const random = PositiveSafeInt.random(); // PositiveSafeInt (random positive safe integer)
const power = PositiveSafeInt.pow(asPositiveSafeInt(2), asPositiveSafeInt(10)); // PositiveSafeInt (1024)

export { a, b, clamped, diff, maximum, minimum, power, product, random, sum };
