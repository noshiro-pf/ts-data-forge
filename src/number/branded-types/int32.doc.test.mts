import { Int32, asInt32 } from './int32.mjs';

describe('asInt32', () => {
  test('JSDoc example', () => {
    const x = asInt32(100000); // Int32
    const y = asInt32(-500000); // Int32

    assert(x === 100000);
    assert(y === -500000);

    expect(() => asInt32(3000000000)).toThrow(TypeError); // Exceeds range
    expect(() => asInt32(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('Int32', () => {
  test('JSDoc example', () => {
    const a = asInt32(2000000000);
    const b = asInt32(500000000);

    // Arithmetic operations with automatic clamping
    const sum = Int32.add(a, b); // Int32 (2147483647 - clamped to MAX_VALUE)
    const diff = Int32.sub(a, b); // Int32 (1500000000)
    const product = Int32.mul(a, b); // Int32 (2147483647 - clamped due to overflow)

    assert(sum === 2147483647); // clamped to MAX_VALUE
    assert(diff === 1500000000);
    assert(product === 2147483647); // clamped due to overflow

    // Range operations
    const clamped = Int32.clamp(5000000000); // Int32 (2147483647)
    const minimum = Int32.min(a, b); // Int32 (500000000)
    const maximum = Int32.max(a, b); // Int32 (2000000000)

    assert(clamped === 2147483647);
    assert(minimum === 500000000);
    assert(maximum === 2000000000);

    // Utility operations
    const absolute = Int32.abs(asInt32(-1000)); // Int32 (1000)
    const random = Int32.random(); // Int32 (random value in valid range)

    assert(absolute === 1000);
    assert(random >= Int32.MIN_VALUE && random <= Int32.MAX_VALUE);
  });
});
