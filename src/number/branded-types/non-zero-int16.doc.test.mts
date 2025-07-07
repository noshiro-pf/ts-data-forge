import { NonZeroInt16, asNonZeroInt16 } from './non-zero-int16.mjs';

describe('asNonZeroInt16', () => {
  test('JSDoc example', () => {
    const x = asNonZeroInt16(1000); // NonZeroInt16
    const y = asNonZeroInt16(-1000); // NonZeroInt16

    assert(x === 1000);
    assert(y === -1000);

    expect(() => asNonZeroInt16(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroInt16(32768)).toThrow(TypeError); // Exceeds range
  });
});

describe('NonZeroInt16', () => {
  test('JSDoc example', () => {
    const a = asNonZeroInt16(30000);
    const b = asNonZeroInt16(-10000);

    // Arithmetic operations with automatic clamping and non-zero constraint
    const sum = NonZeroInt16.add(a, b); // NonZeroInt16 (20000)
    const diff = NonZeroInt16.sub(a, b); // NonZeroInt16 (32767 - clamped to MAX_VALUE)
    const product = NonZeroInt16.mul(a, b); // NonZeroInt16 (-32768 - clamped to MIN_VALUE)

    assert(sum === 20000);
    assert(diff === 32767); // clamped to MAX_VALUE
    assert(product === -32768); // clamped to MIN_VALUE

    // Utility operations
    const absolute = NonZeroInt16.abs(b); // NonZeroInt16 (10000)
    const minimum = NonZeroInt16.min(a, b); // NonZeroInt16 (-10000)
    const maximum = NonZeroInt16.max(a, b); // NonZeroInt16 (30000)

    assert(absolute === 10000);
    assert(minimum === -10000);
    assert(maximum === 30000);

    // Range operations (avoiding zero)
    const clamped = NonZeroInt16.clamp(50000); // NonZeroInt16 (32767 - clamped to MAX_VALUE)
    const random = NonZeroInt16.random(); // NonZeroInt16 (random non-zero value in range)
    const power = NonZeroInt16.pow(asNonZeroInt16(2), asNonZeroInt16(10)); // NonZeroInt16 (1024)

    assert(clamped === 32767);
    assert(
      random !== 0 &&
        random >= NonZeroInt16.MIN_VALUE &&
        random <= NonZeroInt16.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
