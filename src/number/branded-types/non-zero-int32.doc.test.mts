import { NonZeroInt32, asNonZeroInt32 } from './non-zero-int32.mjs';

describe('asNonZeroInt32', () => {
  test('JSDoc example', () => {
    const x = asNonZeroInt32(1000); // NonZeroInt32
    const y = asNonZeroInt32(-1000); // NonZeroInt32

    assert(x === 1000);
    assert(y === -1000);

    expect(() => asNonZeroInt32(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroInt32(2147483648)).toThrow(TypeError); // Exceeds range
  });
});

describe('NonZeroInt32', () => {
  test('JSDoc example', () => {
    const a = asNonZeroInt32(2000000000);
    const b = asNonZeroInt32(-500000000);

    // Arithmetic operations with automatic clamping and non-zero constraint
    const sum = NonZeroInt32.add(a, b); // NonZeroInt32 (1500000000)
    const diff = NonZeroInt32.sub(a, b); // NonZeroInt32 (2147483647 - clamped to MAX_VALUE)
    const product = NonZeroInt32.mul(a, b); // NonZeroInt32 (-2147483648 - clamped to MIN_VALUE)

    assert(sum === 1500000000);
    assert(diff === 2147483647); // clamped to MAX_VALUE
    assert(product === -2147483648); // clamped to MIN_VALUE

    // Utility operations
    const absolute = NonZeroInt32.abs(b); // NonZeroInt32 (500000000)
    const minimum = NonZeroInt32.min(a, b); // NonZeroInt32 (-500000000)
    const maximum = NonZeroInt32.max(a, b); // NonZeroInt32 (2000000000)

    assert(absolute === 500000000);
    assert(minimum === -500000000);
    assert(maximum === 2000000000);

    // Range operations (avoiding zero)
    const clamped = NonZeroInt32.clamp(1); // NonZeroInt32 (1 - valid non-zero value)
    const random = NonZeroInt32.random(); // NonZeroInt32 (random non-zero value in range)
    const power = NonZeroInt32.pow(asNonZeroInt32(2), asNonZeroInt32(20)); // NonZeroInt32 (1048576)

    assert(clamped === 1);
    assert(
      random !== 0 &&
        random >= NonZeroInt32.MIN_VALUE &&
        random <= NonZeroInt32.MAX_VALUE,
    );
    assert(power === 1048576);
  });
});
