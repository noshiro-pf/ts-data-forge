// Sample code extracted from src/number/branded-types/safe-int.mts (SafeInt)
import { SafeInt, asSafeInt } from 'ts-data-forge';

// Near the boundary
const nearMax = asSafeInt(9007199254740990);
const increment = asSafeInt(10);

// Automatic clamping prevents precision loss
const sum = SafeInt.add(nearMax, increment); // Clamped to MAX_SAFE_INTEGER
const product = SafeInt.mul(nearMax, increment); // Clamped to MAX_SAFE_INTEGER

// Safe operations
const a = asSafeInt(1000000);
const b = asSafeInt(500);

const diff = SafeInt.sub(a, b); // SafeInt (999500)
const quotient = SafeInt.div(a, b); // SafeInt (2000)
const power = SafeInt.pow(b, asSafeInt(2)); // SafeInt (250000)

// Utility operations
const absolute = SafeInt.abs(asSafeInt(-42)); // SafeInt (42)
const clamped = SafeInt.clamp(2 ** 60); // SafeInt (MAX_SAFE_INTEGER)

// Random generation
const die = SafeInt.random(asSafeInt(1), asSafeInt(6)); // Random 1-6
