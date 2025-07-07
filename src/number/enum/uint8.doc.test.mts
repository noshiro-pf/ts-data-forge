import { Uint8, asUint8, isUint8 } from './uint8.mjs';

describe('isUint8', () => {
  test('JSDoc example 1', () => {
    assert(isUint8(100)); // true
    assert(isUint8(0)); // true (minimum value)
    assert(isUint8(255)); // true (maximum value)
    assert(!isUint8(256)); // false (exceeds max)
    assert(!isUint8(-1)); // false (negative)
    assert(!isUint8(5.5)); // false (not integer)
  });

  test('JSDoc example 2', () => {
    const byte = asUint8(200); // Uint8
    const zero = asUint8(0); // Uint8 (minimum)
    const max = asUint8(255); // Uint8 (maximum)

    assert(byte === 200);
    assert(zero === 0);
    assert(max === 255);

    // These throw TypeError:
    expect(() => asUint8(256)).toThrow(TypeError); // Exceeds maximum
    expect(() => asUint8(-1)).toThrow(TypeError); // Negative value
    expect(() => asUint8(1.5)).toThrow(TypeError); // Not an integer
  });

  test('JSDoc example 3', () => {
    Uint8.min(asUint8(50), asUint8(30), asUint8(100)); // Uint8 (30)
    Uint8.min(asUint8(0), asUint8(255)); // Uint8 (0)
  });
});

describe('asUint8', () => {
  test('JSDoc example', () => {
    const x = asUint8(255); // Uint8
    const y = asUint8(0); // Uint8

    assert(x === 255);
    assert(y === 0);

    // These throw TypeError:
    expect(() => asUint8(-1)).toThrow(TypeError);
    expect(() => asUint8(256)).toThrow(TypeError);
    expect(() => asUint8(1.5)).toThrow(TypeError);
  });
});

describe('Uint8', () => {
  test('JSDoc example', () => {
    const a = asUint8(200);
    const b = asUint8(100);

    assert(a === 200);
    assert(b === 100);

    // Arithmetic operations with automatic clamping
    const sum = Uint8.add(a, b); // Uint8 (255 - clamped to MAX_VALUE)
    const diff = Uint8.sub(a, b); // Uint8 (100)
    const reverseDiff = Uint8.sub(b, a); // Uint8 (0 - clamped to MIN_VALUE)
    const product = Uint8.mul(a, b); // Uint8 (255 - clamped due to overflow)

    assert(sum === 255);
    assert(diff === 100);
    assert(reverseDiff === 0);
    assert(product === 255);

    // Range operations
    const clamped = Uint8.clamp(-10); // Uint8 (0)
    const minimum = Uint8.min(a, b); // Uint8 (100)
    const maximum = Uint8.max(a, b); // Uint8 (200)

    assert(clamped === 0);
    assert(minimum === 100);
    assert(maximum === 200);

    // Utility operations
    const random = Uint8.random(asUint8(50), asUint8(150)); // Uint8 (random value in [50, 150])
    const power = Uint8.pow(asUint8(2), asUint8(7)); // Uint8 (128)

    assert(random >= 50 && random <= 150);
    assert(power === 128);
  });
});
