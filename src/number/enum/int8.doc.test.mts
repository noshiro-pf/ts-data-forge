import { Int8, asInt8, isInt8 } from './int8.mjs';

describe('isInt8', () => {
  test('JSDoc example', () => {
    assert(isInt8(100)); // true
    assert(isInt8(-50)); // true
    assert(isInt8(127)); // true (max value)
    assert(isInt8(-128)); // true (min value)
    assert(!isInt8(128)); // false (exceeds max)
    assert(!isInt8(-129)); // false (below min)
    assert(!isInt8(5.5)); // false (not integer)
  });
});

describe('asInt8', () => {
  test('JSDoc example', () => {
    const byte = asInt8(100); // Int8
    const max = asInt8(127); // Int8 (maximum value)
    const min = asInt8(-128); // Int8 (minimum value)
    const zero = asInt8(0); // Int8

    assert(byte === 100);
    assert(max === 127);
    assert(min === -128);
    assert(zero === 0);

    // These throw TypeError:
    expect(() => asInt8(128)).toThrow(TypeError); // Exceeds maximum (127)
    expect(() => asInt8(-129)).toThrow(TypeError); // Below minimum (-128)
    expect(() => asInt8(1.5)).toThrow(TypeError); // Not an integer
    expect(() => asInt8(Number.NaN)).toThrow(TypeError); // Not a number
  });
});

describe('Int8', () => {
  test('JSDoc example', () => {
    // Basic usage
    const a = asInt8(100);
    const b = asInt8(50);

    assert(a === 100);
    assert(b === 50);

    // Arithmetic with automatic clamping
    const sum = Int8.add(a, b); // Int8 (127) - clamped to maximum
    const diff = Int8.sub(a, b); // Int8 (50)
    const product = Int8.mul(a, b); // Int8 (127) - clamped due to overflow
    const quotient = Int8.div(a, 25 as const); // Int8 (4)

    assert(sum === 127);
    assert(diff === 50);
    assert(product === 127);
    assert(quotient === 4);

    // Boundary handling
    const overflow = Int8.add(asInt8(127), asInt8(10)); // Int8 (127) - clamped
    const underflow = Int8.sub(asInt8(-128), asInt8(10)); // Int8 (-128) - clamped

    assert(overflow === 127);
    assert(underflow === -128);

    // Utility operations
    const clamped = Int8.clamp(200); // Int8 (127)
    const absolute = Int8.abs(asInt8(-100)); // Int8 (100)
    const minimum = Int8.min(a, b); // Int8 (50)
    const maximum = Int8.max(a, b); // Int8 (100)

    assert(clamped === 127);
    assert(absolute === 100);
    assert(minimum === 50);
    assert(maximum === 100);

    // Random generation
    const die = Int8.random(asInt8(1), asInt8(6)); // Random 1-6
    const offset = Int8.random(asInt8(-10), asInt8(10)); // Random ±10

    assert(die >= 1 && die <= 6);
    assert(offset >= -10 && offset <= 10);
  });
});
