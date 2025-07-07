import { PositiveInt, asPositiveInt, isPositiveInt } from './positive-int.mjs';

describe('isPositiveInt', () => {
  test('JSDoc example', () => {
    isPositiveInt(5); // true
    isPositiveInt(1); // true
    isPositiveInt(0); // false (zero is not positive)
    isPositiveInt(-1); // false (negative)
    isPositiveInt(5.5); // false (not an integer)
    isPositiveInt(Number.NaN); // false
  });
});

describe('asPositiveInt', () => {
  test('JSDoc example', () => {
    const count = asPositiveInt(5); // PositiveInt
    const length = asPositiveInt(100); // PositiveInt
    const one = asPositiveInt(1); // PositiveInt (minimum valid)

    assert(count === 5);
    assert(length === 100);
    assert(one === 1);

    // These throw TypeError:
    expect(() => asPositiveInt(0)).toThrow(TypeError); // Zero is not positive
    expect(() => asPositiveInt(-1)).toThrow(TypeError); // Negative numbers not allowed
    expect(() => asPositiveInt(5.5)).toThrow(TypeError); // Not an integer
    expect(() => asPositiveInt(Number.POSITIVE_INFINITY)).toThrow(TypeError); // Not finite
  });
});

describe('PositiveInt', () => {
  test('JSDoc example', () => {
    // Type validation
    const isValid1 = PositiveInt.is(5); // true
    const isValid2 = PositiveInt.is(1); // true (minimum value)
    const isValid3 = PositiveInt.is(0); // false
    const isValid4 = PositiveInt.is(-1); // false

    assert(isValid1);
    assert(isValid2);
    assert(!isValid3);
    assert(!isValid4);

    // Automatic clamping in operations
    const a = asPositiveInt(10);
    const b = asPositiveInt(3);

    const sum = PositiveInt.add(a, b); // PositiveInt (13)
    const diff1 = PositiveInt.sub(a, b); // PositiveInt (7)
    const diff2 = PositiveInt.sub(b, a); // PositiveInt (1) - clamped!
    const product = PositiveInt.mul(a, b); // PositiveInt (30)
    const quotient = PositiveInt.div(a, b); // PositiveInt (3)

    assert(sum === 13);
    assert(diff1 === 7);
    assert(diff2 === 1);
    assert(product === 30);
    assert(quotient === 3);

    // Edge case: division that would be < 1
    const small = PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1)

    assert(small === 1);

    // Range operations
    const minimum = PositiveInt.min(a, b); // PositiveInt (3)
    const maximum = PositiveInt.max(a, b); // PositiveInt (10)

    assert(minimum === 3);
    assert(maximum === 10);

    // Random generation
    const dice = PositiveInt.random(asPositiveInt(1), asPositiveInt(6)); // 1-6
    const id = PositiveInt.random(asPositiveInt(1000), asPositiveInt(9999)); // 4-digit ID

    assert(dice >= 1 && dice <= 6);
    assert(id >= 1000 && id <= 9999);
  });
});
