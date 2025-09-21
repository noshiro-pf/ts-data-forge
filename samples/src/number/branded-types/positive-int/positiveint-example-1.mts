// Sample code extracted from src/number/branded-types/positive-int.mts (PositiveInt)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

// Type validation
PositiveInt.is(5); // true
PositiveInt.is(1); // true (minimum value)
PositiveInt.is(0); // false
PositiveInt.is(-1); // false

// Automatic clamping in operations
const a = asPositiveInt(10);
const b = asPositiveInt(3);

const sum = PositiveInt.add(a, b); // PositiveInt (13)
const diff1 = PositiveInt.sub(a, b); // PositiveInt (7)
const diff2 = PositiveInt.sub(b, a); // PositiveInt (1) - clamped!
const product = PositiveInt.mul(a, b); // PositiveInt (30)
const quotient = PositiveInt.div(a, b); // PositiveInt (3)

// Edge case: division that would be < 1
const small = PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1)

// Range operations
const minimum = PositiveInt.min(a, b); // PositiveInt (3)
const maximum = PositiveInt.max(a, b); // PositiveInt (10)

// Random generation
const dice = PositiveInt.random(asPositiveInt(1), asPositiveInt(6)); // 1-6
const id = PositiveInt.random(asPositiveInt(1000), asPositiveInt(9999)); // 4-digit ID
