import { NonZeroInt, asNonZeroInt } from './non-zero-int.mjs';

describe('asNonZeroInt', () => {
  test('JSDoc example', () => {
    const x = asNonZeroInt(5); // NonZeroInt
    const y = asNonZeroInt(-3); // NonZeroInt

    assert(x === 5);
    assert(y === -3);

    expect(() => asNonZeroInt(0)).toThrow(TypeError); // Zero value
    expect(() => asNonZeroInt(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('NonZeroInt', () => {
  test('JSDoc example', () => {
    const a = asNonZeroInt(10);
    const b = asNonZeroInt(-5);

    // Arithmetic operations
    const sum = NonZeroInt.add(a, b); // NonZeroInt (5)
    const diff = NonZeroInt.sub(a, b); // NonZeroInt (15)
    const product = NonZeroInt.mul(a, b); // NonZeroInt (-50)
    const quotient = NonZeroInt.div(a, b); // NonZeroInt (-2)

    assert(sum === 5);
    assert(diff === 15);
    assert(product === -50);
    assert(quotient === -2);

    // Utility operations
    const absolute = NonZeroInt.abs(b); // NonZeroInt (5)
    const power = NonZeroInt.pow(a, asNonZeroInt(2)); // NonZeroInt (100)
    const minimum = NonZeroInt.min(a, b); // NonZeroInt (-5)
    const maximum = NonZeroInt.max(a, b); // NonZeroInt (10)

    assert(absolute === 5);
    assert(power === 100);
    assert(minimum === -5);
    assert(maximum === 10);

    // Random generation
    const randomInt = NonZeroInt.random(); // NonZeroInt (random non-zero integer)

    assert(randomInt !== 0 && Number.isInteger(randomInt));
  });
});
