import {
  NonNegativeFiniteNumber,
  asNonNegativeFiniteNumber,
} from './non-negative-finite-number.mjs';

describe('asNonNegativeFiniteNumber', () => {
  test('JSDoc example', () => {
    const x = asNonNegativeFiniteNumber(5.5); // NonNegativeFiniteNumber
    const y = asNonNegativeFiniteNumber(0); // NonNegativeFiniteNumber

    assert(x === 5.5);
    assert(y === 0);

    expect(() => asNonNegativeFiniteNumber(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asNonNegativeFiniteNumber(Number.POSITIVE_INFINITY)).toThrow(
      TypeError,
    ); // Infinity is not a finite number
  });
});

describe('NonNegativeFiniteNumber', () => {
  test('JSDoc example', () => {
    const distance = asNonNegativeFiniteNumber(5.5);
    const speed = asNonNegativeFiniteNumber(2.2);

    // Arithmetic operations with non-negative clamping
    const total = NonNegativeFiniteNumber.add(distance, speed); // NonNegativeFiniteNumber (7.7)
    const diff = NonNegativeFiniteNumber.sub(speed, distance); // NonNegativeFiniteNumber (0 - clamped)
    const area = NonNegativeFiniteNumber.mul(distance, speed); // NonNegativeFiniteNumber (12.1)
    const ratio = NonNegativeFiniteNumber.div(distance, speed); // NonNegativeFiniteNumber (2.5)

    assert(total === 7.7);
    assert(diff === 0); // clamped to 0
    assert(Math.abs(area - 12.1) < 0.0000000000000001);
    assert(Math.abs(ratio - 2.5) < 0.0000000000000001);

    // Range operations
    const clamped = NonNegativeFiniteNumber.clamp(-10.5); // NonNegativeFiniteNumber (0)
    const minimum = NonNegativeFiniteNumber.min(distance, speed); // NonNegativeFiniteNumber (2.2)
    const maximum = NonNegativeFiniteNumber.max(distance, speed); // NonNegativeFiniteNumber (5.5)

    assert(clamped === 0);
    assert(minimum === 2.2);
    assert(maximum === 5.5);

    // Rounding operations (return Uint)
    const pixels = NonNegativeFiniteNumber.round(distance); // Uint (6)
    const floorValue = NonNegativeFiniteNumber.floor(distance); // Uint (5)
    const ceilValue = NonNegativeFiniteNumber.ceil(distance); // Uint (6)

    assert(pixels === 6);
    assert(floorValue === 5);
    assert(ceilValue === 6);
  });
});
