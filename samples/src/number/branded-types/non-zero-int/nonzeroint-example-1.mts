// Example: src/number/branded-types/non-zero-int.mts (NonZeroInt)
import { NonZeroInt, asNonZeroInt } from 'ts-data-forge';

const a = asNonZeroInt(10);
const b = asNonZeroInt(-5);

// Arithmetic operations
const sum = NonZeroInt.add(a, b); // NonZeroInt (5)
const diff = NonZeroInt.sub(a, b); // NonZeroInt (15)
const product = NonZeroInt.mul(a, b); // NonZeroInt (-50)
const quotient = NonZeroInt.div(a, b); // NonZeroInt (-2)

// Utility operations
const absolute = NonZeroInt.abs(b); // NonZeroInt (5)
const power = NonZeroInt.pow(a, asNonZeroInt(2)); // NonZeroInt (100)
const minimum = NonZeroInt.min(a, b); // NonZeroInt (-5)
const maximum = NonZeroInt(a, b); // NonZeroInt (10)

// Random generation
const randomInt = NonZeroInt.random(); // NonZeroInt (random non-zero integer)

export {
  a,
  absolute,
  b,
  diff,
  maximum,
  minimum,
  power,
  product,
  quotient,
  randomInt,
  sum,
};
