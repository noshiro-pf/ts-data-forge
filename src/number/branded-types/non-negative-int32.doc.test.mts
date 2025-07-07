import { NonNegativeInt32, asNonNegativeInt32 } from './non-negative-int32.mjs';

describe('asNonNegativeInt32', () => {
  test('JSDoc example', () => {
    const x = asNonNegativeInt32(1000); // NonNegativeInt32
    const y = asNonNegativeInt32(0); // NonNegativeInt32

    assert(x === 1000);
    assert(y === 0);

    expect(() => asNonNegativeInt32(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asNonNegativeInt32(2147483648)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('NonNegativeInt32', () => {
  test('JSDoc example', () => {
    const a = asNonNegativeInt32(2000000000);
    const b = asNonNegativeInt32(500000000);

    // Arithmetic operations with automatic clamping
    const sum = NonNegativeInt32.add(a, b); // NonNegativeInt32 (2147483647 - clamped to MAX_VALUE)
    const diff = NonNegativeInt32.sub(a, b); // NonNegativeInt32 (1500000000)
    const reverseDiff = NonNegativeInt32.sub(b, a); // NonNegativeInt32 (0 - clamped to MIN_VALUE)
    const product = NonNegativeInt32.mul(a, b); // NonNegativeInt32 (2147483647 - clamped due to overflow)

    assert(sum === NonNegativeInt32.MAX_VALUE);
    assert(diff === 1500000000);
    assert(reverseDiff === NonNegativeInt32.MIN_VALUE);
    assert(product === NonNegativeInt32.MAX_VALUE);

    // Range operations
    const clamped = NonNegativeInt32.clamp(-1000); // NonNegativeInt32 (0)
    const minimum = NonNegativeInt32.min(a, b); // NonNegativeInt32 (500000000)
    const maximum = NonNegativeInt32.max(a, b); // NonNegativeInt32 (2000000000)

    assert(clamped === 0);
    assert(minimum === 500000000);
    assert(maximum === 2000000000);

    // Utility operations
    const random = NonNegativeInt32.random(); // NonNegativeInt32 (random value in [0, 2147483647])
    const power = NonNegativeInt32.pow(
      asNonNegativeInt32(2),
      asNonNegativeInt32(20),
    ); // NonNegativeInt32 (1048576)

    assert(random >= 0 && random <= NonNegativeInt32.MAX_VALUE);
    assert(power === 1048576);
  });
});
