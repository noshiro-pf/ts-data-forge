import { NonZeroUint16, asNonZeroUint16 } from './non-zero-uint16.mjs';

describe('asNonZeroUint16', () => {
  test('JSDoc example', () => {
    const x = asNonZeroUint16(1000); // NonZeroUint16
    const y = asNonZeroUint16(65535); // NonZeroUint16

    assert(x === 1000);
    assert(y === 65535);

    expect(() => asNonZeroUint16(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroUint16(-1)).toThrow(TypeError); // Negative value
    expect(() => asNonZeroUint16(65536)).toThrow(TypeError); // Exceeds range
  });
});

describe('NonZeroUint16', () => {
  test('JSDoc example', () => {
    const a = asNonZeroUint16(60000);
    const b = asNonZeroUint16(10000);

    // Arithmetic operations with automatic clamping and non-zero constraint
    const sum = NonZeroUint16.add(a, b); // NonZeroUint16 (65535 - clamped to MAX_VALUE)
    const diff = NonZeroUint16.sub(a, b); // NonZeroUint16 (50000)
    const reverseDiff = NonZeroUint16.sub(b, a); // NonZeroUint16 (1 - clamped to MIN_VALUE)
    const product = NonZeroUint16.mul(a, b); // NonZeroUint16 (65535 - clamped due to overflow)

    assert(sum === 65535); // clamped to MAX_VALUE
    assert(diff === 50000);
    assert(reverseDiff === 1); // clamped to MIN_VALUE
    assert(product === 65535); // clamped due to overflow

    // Range operations (maintaining non-zero constraint)
    const clamped = NonZeroUint16.clamp(-100); // NonZeroUint16 (1)
    const minimum = NonZeroUint16.min(a, b); // NonZeroUint16 (10000)
    const maximum = NonZeroUint16.max(a, b); // NonZeroUint16 (60000)

    assert(clamped === 1);
    assert(minimum === 10000);
    assert(maximum === 60000);

    // Utility operations
    const random = NonZeroUint16.random(); // NonZeroUint16 (random value in [1, 65535])
    const power = NonZeroUint16.pow(asNonZeroUint16(2), asNonZeroUint16(10)); // NonZeroUint16 (1024)

    assert(
      random >= NonZeroUint16.MIN_VALUE && random <= NonZeroUint16.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
