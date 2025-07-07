import { NonZeroUint32, asNonZeroUint32 } from './non-zero-uint32.mjs';

describe('asNonZeroUint32', () => {
  test('JSDoc example', () => {
    const x = asNonZeroUint32(1000); // NonZeroUint32
    const y = asNonZeroUint32(4294967295); // NonZeroUint32

    assert(x === 1000);
    assert(y === 4294967295);

    expect(() => asNonZeroUint32(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroUint32(-1)).toThrow(TypeError); // Negative value
    expect(() => asNonZeroUint32(4294967296)).toThrow(TypeError); // Exceeds range
  });
});

describe('NonZeroUint32', () => {
  test('JSDoc example', () => {
    const a = asNonZeroUint32(4000000000);
    const b = asNonZeroUint32(1000000000);

    // Arithmetic operations with automatic clamping and non-zero constraint
    const sum = NonZeroUint32.add(a, b); // NonZeroUint32 (4294967295 - clamped to MAX_VALUE)
    const diff = NonZeroUint32.sub(a, b); // NonZeroUint32 (3000000000)
    const reverseDiff = NonZeroUint32.sub(b, a); // NonZeroUint32 (1 - clamped to MIN_VALUE)
    const product = NonZeroUint32.mul(a, b); // NonZeroUint32 (4294967295 - clamped due to overflow)

    assert(sum === NonZeroUint32.MAX_VALUE);
    assert(diff === 3000000000);
    assert(reverseDiff === NonZeroUint32.MIN_VALUE);
    assert(product === NonZeroUint32.MAX_VALUE);

    // Range operations (maintaining non-zero constraint)
    const clamped = NonZeroUint32.clamp(-100); // NonZeroUint32 (1)
    const minimum = NonZeroUint32.min(a, b); // NonZeroUint32 (1000000000)
    const maximum = NonZeroUint32.max(a, b); // NonZeroUint32 (4000000000)

    assert(clamped === 1);
    assert(minimum === 1000000000);
    assert(maximum === 4000000000);

    // Utility operations
    const random = NonZeroUint32.random(); // NonZeroUint32 (random value in [1, 4294967295])
    const power = NonZeroUint32.pow(asNonZeroUint32(2), asNonZeroUint32(20)); // NonZeroUint32 (1048576)

    assert(
      random >= NonZeroUint32.MIN_VALUE && random <= NonZeroUint32.MAX_VALUE,
    );
    assert(power === 1048576);
  });
});
