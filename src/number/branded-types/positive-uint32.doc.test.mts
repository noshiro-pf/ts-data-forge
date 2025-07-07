import { PositiveUint32, asPositiveUint32 } from './positive-uint32.mjs';

describe('asPositiveUint32', () => {
  test('JSDoc example', () => {
    const x = asPositiveUint32(1000); // PositiveUint32
    const y = asPositiveUint32(4294967295); // PositiveUint32

    assert(x === 1000);
    assert(y === 4294967295);

    expect(() => asPositiveUint32(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveUint32(-1)).toThrow(TypeError); // Negative values are not allowed
    expect(() => asPositiveUint32(4294967296)).toThrow(TypeError); // Value exceeds maximum range
  });
});

describe('PositiveUint32', () => {
  test('JSDoc example', () => {
    const a = asPositiveUint32(4000000000);
    const b = asPositiveUint32(1000000000);

    // Arithmetic operations with automatic clamping and positive constraint
    const sum = PositiveUint32.add(a, b); // PositiveUint32 (4294967295 - clamped to MAX_VALUE)
    const diff = PositiveUint32.sub(a, b); // PositiveUint32 (3000000000)
    const reverseDiff = PositiveUint32.sub(b, a); // PositiveUint32 (1 - clamped to MIN_VALUE)
    const product = PositiveUint32.mul(a, b); // PositiveUint32 (4294967295 - clamped due to overflow)

    assert(sum === PositiveUint32.MAX_VALUE);
    assert(diff === 3000000000);
    assert(reverseDiff === PositiveUint32.MIN_VALUE);
    assert(product === PositiveUint32.MAX_VALUE);

    // Range operations (maintaining positive constraint)
    const clamped = PositiveUint32.clamp(-100); // PositiveUint32 (1)
    const minimum = PositiveUint32.min(a, b); // PositiveUint32 (1000000000)
    const maximum = PositiveUint32.max(a, b); // PositiveUint32 (4000000000)

    assert(clamped === 1);
    assert(minimum === 1000000000);
    assert(maximum === 4000000000);

    // Utility operations
    const random = PositiveUint32.random(); // PositiveUint32 (random value in [1, 4294967295])
    const power = PositiveUint32.pow(asPositiveUint32(2), asPositiveUint32(20)); // PositiveUint32 (1048576)

    assert(
      random >= PositiveUint32.MIN_VALUE && random <= PositiveUint32.MAX_VALUE,
    );
    assert(power === 1048576);
  });
});
