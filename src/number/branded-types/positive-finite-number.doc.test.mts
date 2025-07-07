import {
  PositiveFiniteNumber,
  asPositiveFiniteNumber,
} from './positive-finite-number.mjs';

describe('asPositiveFiniteNumber', () => {
  test('JSDoc example', () => {
    const x = asPositiveFiniteNumber(5.5); // PositiveFiniteNumber
    const y = asPositiveFiniteNumber(0.001); // PositiveFiniteNumber

    assert(x === 5.5);
    assert(y === 0.001);

    expect(() => asPositiveFiniteNumber(0)).toThrow(TypeError); // Zero is not a positive value
    expect(() => asPositiveFiniteNumber(-1)).toThrow(TypeError); // Negative values are not allowed
  });
});

describe('PositiveFiniteNumber', () => {
  test('JSDoc example', () => {
    const probability = asPositiveFiniteNumber(0.75);
    const rate = asPositiveFiniteNumber(1.25);

    // Arithmetic operations with positive clamping
    const combined = PositiveFiniteNumber.add(probability, rate); // PositiveFiniteNumber (2.0)
    const difference = PositiveFiniteNumber.sub(rate, probability); // PositiveFiniteNumber (0.5)
    const scaled = PositiveFiniteNumber.mul(probability, rate); // PositiveFiniteNumber (0.9375)
    const ratio = PositiveFiniteNumber.div(rate, probability); // PositiveFiniteNumber (1.666...)

    assert(combined === 2.0);
    assert(difference === 0.5);
    assert(scaled === 0.9375);
    assert(Math.abs(ratio - 1.6666666666666667) < 0.0000000000000001);

    // Range operations
    const clamped = PositiveFiniteNumber.clamp(-10.5); // PositiveFiniteNumber (MIN_VALUE)
    const minimum = PositiveFiniteNumber.min(probability, rate); // PositiveFiniteNumber (0.75)
    const maximum = PositiveFiniteNumber.max(probability, rate); // PositiveFiniteNumber (1.25)

    assert(clamped === PositiveFiniteNumber.MIN_VALUE);
    assert(minimum === 0.75);
    assert(maximum === 1.25);

    // Rounding operations (different return types based on operation)
    const ceiled = PositiveFiniteNumber.ceil(probability); // PositiveInt (1)
    const floored = PositiveFiniteNumber.floor(rate); // Uint (1)
    const rounded = PositiveFiniteNumber.round(rate); // Uint (1)

    assert(ceiled === 1);
    assert(floored === 1);
    assert(rounded === 1);

    // Utility operations
    const random = PositiveFiniteNumber.random(); // PositiveFiniteNumber (random positive value)
    const power = PositiveFiniteNumber.pow(rate, probability); // PositiveFiniteNumber (1.18...)

    assert(random > 0 && Number.isFinite(random));
    assert(Math.abs(power - 1.25 ** 0.75) < 0.0000000000000001);
  });
});
