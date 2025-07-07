import { PositiveInt32, asPositiveInt32 } from './positive-int32.mjs';

describe('asPositiveInt32', () => {
  test('JSDoc example', () => {
    const x = asPositiveInt32(1000); // PositiveInt32
    const y = asPositiveInt32(2147483647); // PositiveInt32

    assert(x === 1000);
    assert(y === 2147483647);

    expect(() => asPositiveInt32(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveInt32(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asPositiveInt32(2147483648)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('PositiveInt32', () => {
  test('JSDoc example', () => {
    const a = asPositiveInt32(2000000000);
    const b = asPositiveInt32(500000000);

    // Arithmetic operations with automatic clamping and positive constraint
    const sum = PositiveInt32.add(a, b); // PositiveInt32 (2147483647 - clamped to MAX_VALUE)
    const diff = PositiveInt32.sub(a, b); // PositiveInt32 (1500000000)
    const reverseDiff = PositiveInt32.sub(b, a); // PositiveInt32 (1 - clamped to MIN_VALUE)
    const product = PositiveInt32.mul(a, b); // PositiveInt32 (2147483647 - clamped due to overflow)

    assert(sum === 2147483647); // clamped to MAX_VALUE
    assert(diff === 1500000000);
    assert(reverseDiff === 1); // clamped to MIN_VALUE
    assert(product === 2147483647); // clamped due to overflow

    // Range operations (maintaining positive constraint)
    const clamped = PositiveInt32.clamp(-1000); // PositiveInt32 (1)
    const minimum = PositiveInt32.min(a, b); // PositiveInt32 (500000000)
    const maximum = PositiveInt32.max(a, b); // PositiveInt32 (2000000000)

    assert(clamped === 1);
    assert(minimum === 500000000);
    assert(maximum === 2000000000);

    // Utility operations
    const random = PositiveInt32.random(); // PositiveInt32 (random value in [1, 2147483647])
    const power = PositiveInt32.pow(asPositiveInt32(2), asPositiveInt32(20)); // PositiveInt32 (1048576)

    assert(
      random >= PositiveInt32.MIN_VALUE && random <= PositiveInt32.MAX_VALUE,
    );
    assert(power === 1048576);
  });
});
