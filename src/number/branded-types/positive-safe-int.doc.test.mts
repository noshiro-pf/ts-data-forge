import { PositiveSafeInt, asPositiveSafeInt } from './positive-safe-int.mjs';

describe('asPositiveSafeInt', () => {
  test('JSDoc example', () => {
    const x = asPositiveSafeInt(5); // PositiveSafeInt
    const y = asPositiveSafeInt(1000); // PositiveSafeInt

    assert(x === 5);
    assert(y === 1000);

    expect(() => asPositiveSafeInt(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveSafeInt(-1)).toThrow(TypeError); // Negative values are not allowed
  });
});

describe('PositiveSafeInt', () => {
  test('JSDoc example', () => {
    const a = asPositiveSafeInt(1000000);
    const b = asPositiveSafeInt(2000000);

    // Arithmetic operations with positive safe range clamping
    const sum = PositiveSafeInt.add(a, b); // PositiveSafeInt (3000000)
    const diff = PositiveSafeInt.sub(a, b); // PositiveSafeInt (1 - clamped to MIN_VALUE)
    const product = PositiveSafeInt.mul(a, b); // PositiveSafeInt (2000000000000)

    assert(sum === 3000000);
    assert(diff === 1); // clamped to MIN_VALUE
    assert(product === 2000000000000);

    // Range operations
    const clamped = PositiveSafeInt.clamp(0); // PositiveSafeInt (1)
    const minimum = PositiveSafeInt.min(a, b); // PositiveSafeInt (1000000)
    const maximum = PositiveSafeInt.max(a, b); // PositiveSafeInt (2000000)

    assert(clamped === 1);
    assert(minimum === 1000000);
    assert(maximum === 2000000);

    // Utility operations
    const random = PositiveSafeInt.random(); // PositiveSafeInt (random positive safe integer)
    const power = PositiveSafeInt.pow(
      asPositiveSafeInt(2),
      asPositiveSafeInt(10),
    ); // PositiveSafeInt (1024)

    assert(
      random >= PositiveSafeInt.MIN_VALUE &&
        random <= PositiveSafeInt.MAX_VALUE,
    );
    assert(power === 1024);
  });
});
