import { Uint, asUint } from './uint.mjs';

describe('asUint', () => {
  test('JSDoc example', () => {
    const x = asUint(5); // Uint
    const y = asUint(0); // Uint

    assert(x === 5);
    assert(y === 0);

    expect(() => asUint(-1)).toThrow(TypeError); // Negative value
    expect(() => asUint(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('Uint', () => {
  test('JSDoc example', () => {
    const a = asUint(100);
    const b = asUint(150);

    // Arithmetic operations with non-negative clamping
    const sum = Uint.add(a, b); // Uint (250)
    const diff = Uint.sub(a, b); // Uint (0 - clamped to MIN_VALUE)
    const product = Uint.mul(a, b); // Uint (15000)
    const quotient = Uint.div(b, a); // Uint (1)

    assert(sum === 250);
    assert(diff === 0); // clamped to MIN_VALUE
    assert(product === 15000);
    assert(quotient === 1);

    // Range operations
    const clamped = Uint.clamp(-50); // Uint (0)
    const minimum = Uint.min(a, b); // Uint (100)
    const maximum = Uint.max(a, b); // Uint (150)

    assert(clamped === 0);
    assert(minimum === 100);
    assert(maximum === 150);

    // Utility operations
    const random = Uint.random(); // Uint (random non-negative integer)
    const power = Uint.pow(asUint(2), asUint(8)); // Uint (256)

    assert(random >= Uint.MIN_VALUE);
    assert(power === 256);
  });
});
