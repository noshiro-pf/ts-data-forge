import { NonNegativeInt16, asNonNegativeInt16 } from './non-negative-int16.mjs';

describe('asNonNegativeInt16', () => {
  test('JSDoc example', () => {
    const x = asNonNegativeInt16(1000); // NonNegativeInt16
    const y = asNonNegativeInt16(0); // NonNegativeInt16

    assert(x === 1000);
    assert(y === 0);

    expect(() => asNonNegativeInt16(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asNonNegativeInt16(32768)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('NonNegativeInt16', () => {
  test('JSDoc example', () => {
    const a = asNonNegativeInt16(30000);
    const b = asNonNegativeInt16(5000);

    // Arithmetic operations with automatic clamping
    const sum = NonNegativeInt16.add(a, b); // NonNegativeInt16 (32767 - clamped to MAX_VALUE)
    const diff = NonNegativeInt16.sub(a, b); // NonNegativeInt16 (25000)
    const reverseDiff = NonNegativeInt16.sub(b, a); // NonNegativeInt16 (0 - clamped to MIN_VALUE)
    const product = NonNegativeInt16.mul(a, b); // NonNegativeInt16 (32767 - clamped due to overflow)

    assert(sum === 32767); // clamped to MAX_VALUE
    assert(diff === 25000);
    assert(reverseDiff === 0); // clamped to MIN_VALUE
    assert(product === 32767); // clamped due to overflow

    // Range operations
    const clamped = NonNegativeInt16.clamp(-100); // NonNegativeInt16 (0)
    const minimum = NonNegativeInt16.min(a, b); // NonNegativeInt16 (5000)
    const maximum = NonNegativeInt16.max(a, b); // NonNegativeInt16 (30000)

    assert(clamped === 0);
    assert(minimum === 5000);
    assert(maximum === 30000);

    // Utility operations
    const random = NonNegativeInt16.random(); // NonNegativeInt16 (random value in [0, 32767])
    const power = NonNegativeInt16.pow(
      asNonNegativeInt16(2),
      asNonNegativeInt16(10),
    ); // NonNegativeInt16 (1024)

    assert(
      random >= NonNegativeInt16.MIN_VALUE &&
        random <= NonNegativeInt16.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
