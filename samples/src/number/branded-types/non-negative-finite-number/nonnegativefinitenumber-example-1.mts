// Sample code extracted from src/number/branded-types/non-negative-finite-number.mts (NonNegativeFiniteNumber)
import {
  NonNegativeFiniteNumber,
  asNonNegativeFiniteNumber,
} from 'ts-data-forge';

const distance = asNonNegativeFiniteNumber(5.5);
const speed = asNonNegativeFiniteNumber(2.2);

// Arithmetic operations with non-negative clamping
const total = NonNegativeFiniteNumber.add(distance, speed); // NonNegativeFiniteNumber (7.7)
const diff = NonNegativeFiniteNumber.sub(speed, distance); // NonNegativeFiniteNumber (0 - clamped)
const area = NonNegativeFiniteNumber.mul(distance, speed); // NonNegativeFiniteNumber (12.1)
const ratio = NonNegativeFiniteNumber.div(distance, speed); // NonNegativeFiniteNumber (2.5)

// Range operations
const clamped = NonNegativeFiniteNumber.clamp(-10.5); // NonNegativeFiniteNumber (0)
const minimum = NonNegativeFiniteNumber.min(distance, speed); // NonNegativeFiniteNumber (2.2)
const maximum = NonNegativeFiniteNumber.max(distance, speed); // NonNegativeFiniteNumber (5.5)

// Rounding operations (return Uint)
const pixels = NonNegativeFiniteNumber.round(distance); // Uint (6)
const floorValue = NonNegativeFiniteNumber.floor(distance); // Uint (5)
const ceilValue = NonNegativeFiniteNumber.ceil(distance); // Uint (6)

export { area, ceilValue, clamped, diff, distance, floorValue, maximum, minimum, pixels, ratio, speed, total };
