// Sample code extracted from src/number/branded-types/positive-finite-number.mts (PositiveFiniteNumber)
import { PositiveFiniteNumber, asPositiveFiniteNumber } from 'ts-data-forge';

const probability = asPositiveFiniteNumber(0.75);
const rate = asPositiveFiniteNumber(1.25);

// Arithmetic operations with positive clamping
const combined = PositiveFiniteNumber.add(probability, rate); // PositiveFiniteNumber (2.0)
const difference = PositiveFiniteNumber.sub(rate, probability); // PositiveFiniteNumber (0.5)
const scaled = PositiveFiniteNumber.mul(probability, rate); // PositiveFiniteNumber (0.9375)
const ratio = PositiveFiniteNumber.div(rate, probability); // PositiveFiniteNumber (1.666...)

// Range operations
const clamped = PositiveFiniteNumber.clamp(-10.5); // PositiveFiniteNumber (MIN_VALUE)
const minimum = PositiveFiniteNumber.min(probability, rate); // PositiveFiniteNumber (0.75)
const maximum = PositiveFiniteNumber.max(probability, rate); // PositiveFiniteNumber (1.25)

// Rounding operations (different return types based on operation)
const ceiled = PositiveFiniteNumber.ceil(probability); // PositiveInt (1)
const floored = PositiveFiniteNumber.floor(rate); // Uint (1)
const rounded = PositiveFiniteNumber.round(rate); // Uint (1)

// Utility operations
const random = PositiveFiniteNumber.random(); // PositiveFiniteNumber (random positive value)
const power = PositiveFiniteNumber.pow(rate, probability); // PositiveFiniteNumber (1.18...)

export { ceiled, clamped, combined, difference, floored, maximum, minimum, power, probability, random, rate, ratio, rounded, scaled };
