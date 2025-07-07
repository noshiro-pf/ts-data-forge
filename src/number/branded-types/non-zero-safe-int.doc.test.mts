import { NonZeroSafeInt, asNonZeroSafeInt } from './non-zero-safe-int.mjs';

describe('asNonZeroSafeInt', () => {
  test('JSDoc example', () => {
    const x = asNonZeroSafeInt(5); // NonZeroSafeInt
    const y = asNonZeroSafeInt(-1000); // NonZeroSafeInt

    assert(x === 5);
    assert(y === -1000);

    expect(() => asNonZeroSafeInt(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroSafeInt(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('NonZeroSafeInt', () => {
  test('JSDoc example', () => {
    const a = asNonZeroSafeInt(9007199254740000); // Near MAX_SAFE_INTEGER
    const b = asNonZeroSafeInt(-1000);

    // Arithmetic operations with non-zero safe range clamping
    const sum = NonZeroSafeInt.add(a, b); // NonZeroSafeInt (9007199254739000)
    const diff = NonZeroSafeInt.sub(a, b); // NonZeroSafeInt (clamped to MAX_SAFE_INTEGER)
    const product = NonZeroSafeInt.mul(a, b); // NonZeroSafeInt (clamped to MIN_SAFE_INTEGER)

    assert(sum === 9007199254739000);
    assert(diff === 9007199254740991); // clamped to MAX_SAFE_INTEGER
    assert(product === -9007199254740991); // clamped to MIN_SAFE_INTEGER

    // Utility operations
    const absolute = NonZeroSafeInt.abs(b); // NonZeroSafeInt (1000)
    const minimum = NonZeroSafeInt.min(a, b); // NonZeroSafeInt (-1000)
    const maximum = NonZeroSafeInt.max(a, b); // NonZeroSafeInt (a)

    assert(absolute === 1000);
    assert(minimum === -1000);
    assert(maximum === 9007199254740000);

    // Random generation
    const random = NonZeroSafeInt.random(); // NonZeroSafeInt (random non-zero safe integer)

    assert(
      random !== 0 &&
        random >= NonZeroSafeInt.MIN_VALUE &&
        random <= NonZeroSafeInt.MAX_VALUE,
    );
  });
});
