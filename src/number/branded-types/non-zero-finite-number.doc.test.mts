import {
  NonZeroFiniteNumber,
  asNonZeroFiniteNumber,
} from './non-zero-finite-number.mjs';

describe('asNonZeroFiniteNumber', () => {
  test('JSDoc example', () => {
    const x = asNonZeroFiniteNumber(5.5); // NonZeroFiniteNumber
    const y = asNonZeroFiniteNumber(-3.2); // NonZeroFiniteNumber

    assert(x === 5.5);
    assert(y === -3.2);

    expect(() => asNonZeroFiniteNumber(0)).toThrow(TypeError); // Zero is not a non-zero finite number
    expect(() => asNonZeroFiniteNumber(Number.POSITIVE_INFINITY)).toThrow(
      TypeError,
    ); // Infinity is not a finite number
  });
});

describe('NonZeroFiniteNumber', () => {
  test('JSDoc example', () => {
    const factor = asNonZeroFiniteNumber(2.5);
    const multiplier = asNonZeroFiniteNumber(-1.5);

    // Arithmetic operations that preserve non-zero constraint
    const result = NonZeroFiniteNumber.add(factor, multiplier); // NonZeroFiniteNumber (1.0)
    const difference = NonZeroFiniteNumber.sub(factor, multiplier); // NonZeroFiniteNumber (4.0)
    const product = NonZeroFiniteNumber.mul(factor, multiplier); // NonZeroFiniteNumber (-3.75)
    const quotient = NonZeroFiniteNumber.div(factor, multiplier); // NonZeroFiniteNumber (-1.666...)

    assert(result === 1.0);
    assert(difference === 4.0);
    assert(product === -3.75);
    assert(Math.abs(quotient - -1.6666666666666667) < 0.0000000000000001);

    // Utility operations
    const absolute = NonZeroFiniteNumber.abs(multiplier); // NonZeroFiniteNumber (1.5)
    const minimum = NonZeroFiniteNumber.min(factor, multiplier); // NonZeroFiniteNumber (-1.5)
    const maximum = NonZeroFiniteNumber.max(factor, multiplier); // NonZeroFiniteNumber (2.5)

    assert(absolute === 1.5);
    assert(minimum === -1.5);
    assert(maximum === 2.5);

    // Rounding operations (return NonZeroInt)
    const rounded = NonZeroFiniteNumber.round(factor); // NonZeroInt (3)
    const floored = NonZeroFiniteNumber.floor(factor); // NonZeroInt (2)
    const ceiled = NonZeroFiniteNumber.ceil(factor); // NonZeroInt (3)

    assert(rounded === 3);
    assert(floored === 2);
    assert(ceiled === 3);

    // Random generation
    const randomValue = NonZeroFiniteNumber.random(); // NonZeroFiniteNumber (random non-zero value)

    assert(randomValue !== 0 && Number.isFinite(randomValue));
  });
});
