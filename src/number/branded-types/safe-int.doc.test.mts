import { SafeInt, asSafeInt, isSafeInt } from './safe-int.mjs';

describe('isSafeInt', () => {
  test('JSDoc example', () => {
    isSafeInt(42); // true
    isSafeInt(Number.MAX_SAFE_INTEGER); // true
    isSafeInt(Number.MAX_SAFE_INTEGER + 1); // false
    isSafeInt(3.14); // false
    isSafeInt(Number.NaN); // false
  });
});

describe('asSafeInt', () => {
  test('JSDoc example', () => {
    const x = asSafeInt(5); // SafeInt
    const y = asSafeInt(-1000); // SafeInt
    const z = asSafeInt(2 ** 50); // SafeInt (within range)

    assert(x === 5);
    assert(y === -1000);
    assert(z === 2 ** 50);

    // These throw TypeError:
    expect(() => asSafeInt(1.5)).toThrow(TypeError); // Not an integer
    expect(() => asSafeInt(Number.MAX_SAFE_INTEGER + 1)).toThrow(TypeError); // Exceeds safe range
    expect(() => asSafeInt(2 ** 53)).toThrow(TypeError); // Loss of precision
  });
});

describe('SafeInt', () => {
  test('JSDoc example', () => {
    // Near the boundary
    const nearMax = asSafeInt(9007199254740990);
    const increment = asSafeInt(10);

    // Automatic clamping prevents precision loss
    const sum = SafeInt.add(nearMax, increment); // Clamped to MAX_SAFE_INTEGER
    const product = SafeInt.mul(nearMax, increment); // Clamped to MAX_SAFE_INTEGER

    assert(sum === SafeInt.MAX_SAFE_INTEGER);
    assert(product === SafeInt.MAX_SAFE_INTEGER);

    // Safe operations
    const a = asSafeInt(1000000);
    const b = asSafeInt(500);

    const diff = SafeInt.sub(a, b); // SafeInt (999500)
    const quotient = SafeInt.div(a, b); // SafeInt (2000)
    const power = SafeInt.pow(b, asSafeInt(2)); // SafeInt (250000)

    assert(diff === 999500);
    assert(quotient === 2000);
    assert(power === 250000);

    // Utility operations
    const absolute = SafeInt.abs(asSafeInt(-42)); // SafeInt (42)
    const clamped = SafeInt.clamp(2 ** 60); // SafeInt (MAX_SAFE_INTEGER)

    assert(absolute === 42);
    assert(clamped === SafeInt.MAX_SAFE_INTEGER);

    // Random generation
    const die = SafeInt.random(asSafeInt(1), asSafeInt(6)); // Random 1-6

    assert(die >= 1 && die <= 6);
  });
});
