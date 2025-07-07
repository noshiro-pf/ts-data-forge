import { Int, asInt, isInt } from './int.mjs';

describe('isInt', () => {
  test('JSDoc example', () => {
    assert(isInt(5));
    assert(isInt(-10));
    assert(isInt(0));
    assert(!isInt(5.5));
    assert(!isInt(Number.NaN));
    assert(!isInt(Number.POSITIVE_INFINITY));
  });
});

describe('asInt', () => {
  test('JSDoc example', () => {
    const x = asInt(5); // Int
    const y = asInt(-10); // Int
    const z = asInt(0); // Int

    assert(x === 5);
    assert(y === -10);
    assert(z === 0);

    // These throw TypeError:
    // asInt(5.5);         // Not an integer
    // asInt(Number.NaN);         // Not a number
    // asInt(Number.POSITIVE_INFINITY);    // Not finite
  });
});

describe('Int', () => {
  test('JSDoc example', () => {
    // Type validation
    assert(Int.is(42));
    assert(!Int.is(3.14));
    assert(Int.is(-0)); // negative zero is an integer

    // Basic arithmetic
    const a = asInt(10);
    const b = asInt(3);

    assert(a === 10);
    assert(b === 3);

    const sum = Int.add(a, b); // Int (13)
    const diff = Int.sub(a, b); // Int (7)
    const product = Int.mul(a, b); // Int (30)
    const quotient = Int.div(a, b); // Int (3) - floor division
    const power = Int.pow(a, b); // Int (1000)

    assert(sum === 13);
    assert(diff === 7);
    assert(product === 30);
    assert(quotient === 3);
    assert(power === 1000);

    // Utility operations
    const absolute = Int.abs(asInt(-42)); // Int (42)
    const minimum = Int.min(a, b, asInt(5)); // Int (3)
    const maximum = Int.max(a, b, asInt(5)); // Int (10)

    assert(absolute === 42);
    assert(minimum === 3);
    assert(maximum === 10);

    // Random generation
    const die = Int.random(asInt(1), asInt(6)); // Random Int in [1, 6]
    assert(die >= 1 && die <= 6);
  });
});
