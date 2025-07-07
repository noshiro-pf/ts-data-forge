import { PositiveUint16, asPositiveUint16 } from './positive-uint16.mjs';

describe('asPositiveUint16', () => {
  test('JSDoc example', () => {
    const x = asPositiveUint16(1000); // PositiveUint16
    const y = asPositiveUint16(65535); // PositiveUint16

    assert(x === 1000);
    assert(y === 65535);

    expect(() => asPositiveUint16(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveUint16(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asPositiveUint16(65536)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('PositiveUint16', () => {
  test('JSDoc example', () => {
    const a = asPositiveUint16(60000);
    const b = asPositiveUint16(10000);

    // Arithmetic operations with automatic clamping and positive constraint
    const sum = PositiveUint16.add(a, b); // PositiveUint16 (65535 - clamped to MAX_VALUE)
    const diff = PositiveUint16.sub(a, b); // PositiveUint16 (50000)
    const reverseDiff = PositiveUint16.sub(b, a); // PositiveUint16 (1 - clamped to MIN_VALUE)
    const product = PositiveUint16.mul(a, b); // PositiveUint16 (65535 - clamped due to overflow)

    assert(sum === PositiveUint16.MAX_VALUE);
    assert(diff === 50000);
    assert(reverseDiff === PositiveUint16.MIN_VALUE);
    assert(product === PositiveUint16.MAX_VALUE);

    // Range operations (maintaining positive constraint)
    const clamped = PositiveUint16.clamp(-100); // PositiveUint16 (1)
    const minimum = PositiveUint16.min(a, b); // PositiveUint16 (10000)
    const maximum = PositiveUint16.max(a, b); // PositiveUint16 (60000)

    assert(clamped === 1);
    assert(minimum === 10000);
    assert(maximum === 60000);

    // Utility operations
    const random = PositiveUint16.random(); // PositiveUint16 (random value in [1, 65535])
    const power = PositiveUint16.pow(asPositiveUint16(2), asPositiveUint16(10)); // PositiveUint16 (1024)

    assert(
      random >= PositiveUint16.MIN_VALUE && random <= PositiveUint16.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
