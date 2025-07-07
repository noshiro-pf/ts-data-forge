import { PositiveInt16, asPositiveInt16 } from './positive-int16.mjs';

describe('asPositiveInt16', () => {
  test('JSDoc example', () => {
    const x = asPositiveInt16(1000); // PositiveInt16
    const y = asPositiveInt16(32767); // PositiveInt16

    assert(x === 1000);
    assert(y === 32767);

    expect(() => asPositiveInt16(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveInt16(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asPositiveInt16(32768)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('PositiveInt16', () => {
  test('JSDoc example', () => {
    const a = asPositiveInt16(30000);
    const b = asPositiveInt16(5000);

    // Arithmetic operations with automatic clamping
    const sum = PositiveInt16.add(a, b); // PositiveInt16 (32767 - clamped to MAX_VALUE)
    const diff = PositiveInt16.sub(a, b); // PositiveInt16 (25000)
    const reverseDiff = PositiveInt16.sub(b, a); // PositiveInt16 (1 - clamped to MIN_VALUE)
    const product = PositiveInt16.mul(a, b); // PositiveInt16 (32767 - clamped due to overflow)

    assert(sum === 32767); // clamped to MAX_VALUE
    assert(diff === 25000);
    assert(reverseDiff === 1); // clamped to MIN_VALUE
    assert(product === 32767); // clamped due to overflow

    // Range operations
    const clamped = PositiveInt16.clamp(0); // PositiveInt16 (1)
    const minimum = PositiveInt16.min(a, b); // PositiveInt16 (5000)
    const maximum = PositiveInt16.max(a, b); // PositiveInt16 (30000)

    assert(clamped === 1);
    assert(minimum === 5000);
    assert(maximum === 30000);

    // Utility operations
    const random = PositiveInt16.random(); // PositiveInt16 (random value in [1, 32767])
    const power = PositiveInt16.pow(asPositiveInt16(2), asPositiveInt16(10)); // PositiveInt16 (1024)

    assert(
      random >= PositiveInt16.MIN_VALUE && random <= PositiveInt16.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
