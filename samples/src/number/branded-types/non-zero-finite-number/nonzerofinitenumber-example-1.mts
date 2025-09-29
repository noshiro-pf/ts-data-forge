// Example: src/number/branded-types/non-zero-finite-number.mts (NonZeroFiniteNumber)
import { NonZeroFiniteNumber, asNonZeroFiniteNumber } from 'ts-data-forge';

const factor = asNonZeroFiniteNumber(2.5);
const multiplier = asNonZeroFiniteNumber(-1.5);

// Arithmetic operations that preserve non-zero constraint
const result = NonZeroFiniteNumber.add(factor, multiplier); // NonZeroFiniteNumber (1.0)
const difference = NonZeroFiniteNumber.sub(factor, multiplier); // NonZeroFiniteNumber (4.0)
const product = NonZeroFiniteNumber.mul(factor, multiplier); // NonZeroFiniteNumber (-3.75)
const quotient = NonZeroFiniteNumber.div(factor, multiplier); // NonZeroFiniteNumber (-1.666...)

// Utility operations
const absolute = NonZeroFiniteNumber.abs(multiplier); // NonZeroFiniteNumber (1.5)
const minimum = NonZeroFiniteNumber.min(factor, multiplier); // NonZeroFiniteNumber (-1.5)
const maximum = NonZeroFiniteNumber.max(factor, multiplier); // NonZeroFiniteNumber (2.5)

// Rounding operations (return NonZeroInt)
const rounded = NonZeroFiniteNumber.round(factor); // NonZeroInt (3)
const floored = NonZeroFiniteNumber.floor(factor); // NonZeroInt (2)
const ceiled = NonZeroFiniteNumber.ceil(factor); // NonZeroInt (3)

// Random generation
const randomValue = NonZeroFiniteNumber.random(); // NonZeroFiniteNumber (random non-zero value)

export {
  absolute,
  ceiled,
  difference,
  factor,
  floored,
  maximum,
  minimum,
  multiplier,
  product,
  quotient,
  randomValue,
  result,
  rounded,
};
