import { Int16, asInt16 } from './int16.mjs';

describe('asInt16', () => {
  test('JSDoc example', () => {
    const x = asInt16(1000); // Int16
    const y = asInt16(-5000); // Int16

    assert(x === 1000);
    assert(y === -5000);

    expect(() => asInt16(50000)).toThrow(TypeError); // Exceeds range
    expect(() => asInt16(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('Int16', () => {
  test('JSDoc example', () => {
    const a = asInt16(30000);
    const b = asInt16(5000);

    assert(a === 30000);
    assert(b === 5000);

    // Arithmetic operations with automatic clamping
    const sum = Int16.add(a, b); // Int16 (32767 - clamped to MAX_VALUE)
    const diff = Int16.sub(a, b); // Int16 (25000)
    const product = Int16.mul(a, b); // Int16 (32767 - clamped due to overflow)

    assert(sum === 32767); // clamped to MAX_VALUE
    assert(diff === 25000);
    assert(product === 32767); // clamped due to overflow

    // Range operations
    const clamped = Int16.clamp(100000); // Int16 (32767)
    const minimum = Int16.min(a, b); // Int16 (5000)
    const maximum = Int16.max(a, b); // Int16 (30000)

    assert(clamped === 32767);
    assert(minimum === 5000);
    assert(maximum === 30000);

    // Range constants
    const range = Int16.MAX_VALUE - Int16.MIN_VALUE + 1; // 65536
    assert(range === 65536);
  });
});
