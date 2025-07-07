import { Uint16, asUint16 } from './uint16.mjs';

describe('asUint16', () => {
  test('JSDoc example', () => {
    const x = asUint16(1000); // Uint16
    const y = asUint16(0); // Uint16

    assert(x === 1000);
    assert(y === 0);

    expect(() => asUint16(-1)).toThrow(TypeError); // Negative value
    expect(() => asUint16(70000)).toThrow(TypeError); // Exceeds range
  });
});

describe('Uint16', () => {
  test('JSDoc example', () => {
    const a = asUint16(60000);
    const b = asUint16(10000);

    assert(a === 60000);
    assert(b === 10000);

    // Arithmetic operations with automatic clamping
    const sum = Uint16.add(a, b); // Uint16 (65535 - clamped to MAX_VALUE)
    const diff = Uint16.sub(b, a); // Uint16 (0 - clamped to MIN_VALUE)
    const product = Uint16.mul(a, b); // Uint16 (65535 - clamped due to overflow)

    assert(sum === 65535); // clamped to MAX_VALUE
    assert(diff === 0); // clamped to MIN_VALUE
    assert(product === 65535); // clamped due to overflow

    // Range operations
    const clamped = Uint16.clamp(-100); // Uint16 (0)
    const minimum = Uint16.min(a, b); // Uint16 (10000)
    const maximum = Uint16.max(a, b); // Uint16 (60000)

    assert(clamped === 0);
    assert(minimum === 10000);
    assert(maximum === 60000);

    // Utility operations
    const random = Uint16.random(); // Uint16 (random value in [0, 65535])
    const power = Uint16.pow(asUint16(2), asUint16(10)); // Uint16 (1024)

    assert(random >= 0 && random <= 65535);
    assert(power === 1024);
  });
});
