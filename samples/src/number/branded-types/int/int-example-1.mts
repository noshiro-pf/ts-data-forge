// Example: src/number/branded-types/int.mts (Int)
import { Int, asInt } from 'ts-data-forge';

// Type validation
Int.is(42); // true
Int.is(3.14); // false
Int.is(-0); // true (negative zero is an integer)

// Basic arithmetic
const a = asInt(10);
const b = asInt(3);

const sum = Int.add(a, b); // Int (13)
const diff = Int.sub(a, b); // Int (7)
const product = Int.mul(a, b); // Int (30)
const quotient = Int.div(a, b); // Int (3) - floor division
const power = Int.pow(a, b); // Int (1000)

// Utility operations
const absolute = Int.abs(asInt(-42)); // Int (42)
const minimum = Int.min(a, b, asInt(5)); // Int (3)
const maximum = Int.max(a, b, asInt(5)); // Int (10)

// Random generation
const die = Int.random(asInt(1), asInt(6)); // Random Int in [1, 6]

export {
  a,
  absolute,
  b,
  die,
  diff,
  maximum,
  minimum,
  power,
  product,
  quotient,
  sum,
};
