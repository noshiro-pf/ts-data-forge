// Example: src/number/branded-types/finite-number.mts (FiniteNumber)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

// Type validation
FiniteNumber.is(3.14); // true
FiniteNumber.is(Infinity); // false
FiniteNumber.is(0 / 0); // false (NaN)

// Arithmetic with guaranteed finite results
const a = asFiniteNumber(10.5);
const b = asFiniteNumber(3.2);

const sum = FiniteNumber.add(a, b); // FiniteNumber (13.7)
const diff = FiniteNumber.sub(a, b); // FiniteNumber (7.3)
const product = FiniteNumber.mul(a, b); // FiniteNumber (33.6)
const quotient = FiniteNumber.div(a, b); // FiniteNumber (3.28125)
const power = FiniteNumber.pow(a, asFiniteNumber(2)); // FiniteNumber (110.25)

// Rounding to integers
const value = asFiniteNumber(5.7);
const floored = FiniteNumber.floor(value); // Int (5)
const ceiled = FiniteNumber.ceil(value); // Int (6)
const rounded = FiniteNumber.round(value); // Int (6)

// Utility operations
const absolute = FiniteNumber.abs(asFiniteNumber(-42.5)); // FiniteNumber (42.5)
const minimum = FiniteNumber.min(a, b, asFiniteNumber(5)); // FiniteNumber (3.2)
const maximum = FiniteNumber.max(a, b, asFiniteNumber(5)); // FiniteNumber (10.5)

// Random generation
const rand = FiniteNumber.random(asFiniteNumber(0), asFiniteNumber(1)); // Random in [0, 1]

export {
  a,
  absolute,
  b,
  ceiled,
  diff,
  floored,
  maximum,
  minimum,
  power,
  product,
  quotient,
  rand,
  rounded,
  sum,
  value,
};
