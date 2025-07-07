import {
  FiniteNumber,
  asFiniteNumber,
  isFiniteNumber,
} from './finite-number.mjs';

describe('isFiniteNumber', () => {
  test('JSDoc example', () => {
    assert(isFiniteNumber(42));
    assert(isFiniteNumber(3.14));
    assert(isFiniteNumber(-0));
    assert(!isFiniteNumber(Number.POSITIVE_INFINITY));
    assert(!isFiniteNumber(-Number.POSITIVE_INFINITY));
    assert(!isFiniteNumber(Number.NaN));
    assert(!isFiniteNumber(1 / 0)); // 1/0 = Number.POSITIVE_INFINITY
  });
});

describe('asFiniteNumber', () => {
  test('JSDoc example', () => {
    const x = asFiniteNumber(5.5); // FiniteNumber
    const y = asFiniteNumber(-10); // FiniteNumber
    const z = asFiniteNumber(0); // FiniteNumber

    assert(x === 5.5);
    assert(y === -10);
    assert(z === 0);

    // These throw TypeError:
    // asFiniteNumber(Number.POSITIVE_INFINITY);     // Not finite
    // asFiniteNumber(-Number.POSITIVE_INFINITY);    // Not finite
    // asFiniteNumber(Number.NaN);          // Not a number
    // asFiniteNumber(Math.sqrt(-1)); // Results in NaN
  });
});

describe('FiniteNumber', () => {
  test('JSDoc example', () => {
    // Type validation
    assert(FiniteNumber.is(3.14));
    assert(!FiniteNumber.is(Number.POSITIVE_INFINITY));
    assert(!FiniteNumber.is(0 / 0)); // 0/0 = Number.NaN

    // Arithmetic with guaranteed finite results
    const a = asFiniteNumber(10.5);
    const b = asFiniteNumber(3.2);

    const sum = FiniteNumber.add(a, b); // FiniteNumber (13.7)
    const diff = FiniteNumber.sub(a, b); // FiniteNumber (7.3)
    const product = FiniteNumber.mul(a, b); // FiniteNumber (33.6)
    const quotient = FiniteNumber.div(a, b); // FiniteNumber (3.28125)
    const power = FiniteNumber.pow(a, asFiniteNumber(2)); // FiniteNumber (110.25)

    assert(sum === 13.7);
    assert(Math.abs(diff - 7.3) < 0.0001); // Floating point precision
    assert(Math.abs(product - 33.6) < 0.0001); // Check with tolerance
    assert(quotient === 3.28125);
    assert(power === 110.25);

    // Rounding to integers
    const value = asFiniteNumber(5.7);
    const floored = FiniteNumber.floor(value); // Int (5)
    const ceiled = FiniteNumber.ceil(value); // Int (6)
    const rounded = FiniteNumber.round(value); // Int (6)

    assert(floored === 5);
    assert(ceiled === 6);
    assert(rounded === 6);

    // Utility operations
    const absolute = FiniteNumber.abs(asFiniteNumber(-42.5)); // FiniteNumber (42.5)
    const minimum = FiniteNumber.min(a, b, asFiniteNumber(5)); // FiniteNumber (3.2)
    const maximum = FiniteNumber.max(a, b, asFiniteNumber(5)); // FiniteNumber (10.5)

    assert(absolute === 42.5);
    assert(minimum === 3.2);
    assert(maximum === 10.5);

    // Random generation
    const rand = FiniteNumber.random(asFiniteNumber(0), asFiniteNumber(1)); // Random in [0, 1]
    assert(rand >= 0 && rand <= 1);
  });
});
