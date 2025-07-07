import { asPositiveUint32 } from '../../index.mjs';
import { Uint32, asUint32 } from './uint32.mjs';

describe('asUint32', () => {
  test('JSDoc example', () => {
    const x = asUint32(1000000); // Uint32
    const y = asUint32(0); // Uint32

    assert(x === 1000000);
    assert(y === 0);

    expect(() => asUint32(-1)).toThrow(TypeError); // Negative value
    expect(() => asUint32(5000000000)).toThrow(TypeError); // Exceeds range
  });
});

describe('Uint32', () => {
  test('JSDoc example', () => {
    // Type checking
    assert(Uint32.is(1000000));
    assert(!Uint32.is(-1));
    assert(!Uint32.is(5000000000)); // exceeds 2^32

    // Constants
    assert(Uint32.MIN_VALUE === 0);
    assert(Uint32.MAX_VALUE === 4294967295); // 2^32 - 1

    // Arithmetic operations (all results clamped to [0, 2^32))
    const a = asUint32(1000000);
    const b = asPositiveUint32(500000);

    assert(a === 1000000);
    assert(b === 500000);

    const sum = Uint32.add(a, b); // Uint32 (1500000)
    const diff = Uint32.sub(a, b); // Uint32 (500000)
    const product = Uint32.mul(a, b); // Uint32 (clamped if overflow)
    const quotient = Uint32.div(a, b); // Uint32 (2)
    const power = Uint32.pow(asUint32(2), asUint32(10)); // Uint32 (1024)

    assert(sum === 1500000);
    assert(diff === 500000);
    assert(product === Uint32.MAX_VALUE);
    assert(quotient === 2);
    assert(power === 1024);

    // Utility functions
    const minimum = Uint32.min(a, b); // Uint32 (500000)
    const maximum = Uint32.max(a, b); // Uint32 (1000000)
    const clamped = Uint32.clamp(2000000000); // Uint32 (2000000000)
    const random = Uint32.random(); // Random Uint32

    assert(minimum === 500000);
    assert(maximum === 1000000);
    assert(clamped === 2000000000);
    assert(random >= 0 && random <= Uint32.MAX_VALUE);
  });
});
