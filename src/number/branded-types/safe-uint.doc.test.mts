import { SafeUint, asSafeUint } from './safe-uint.mjs';

describe('asSafeUint', () => {
  test('JSDoc example', () => {
    const x = asSafeUint(5); // SafeUint
    const y = asSafeUint(0); // SafeUint

    assert(x === 5);
    assert(y === 0);

    expect(() => asSafeUint(-1)).toThrow(TypeError); // Negative value
    expect(() => asSafeUint(1.5)).toThrow(TypeError); // Not an integer
  });
});

describe('SafeUint', () => {
  test('JSDoc example', () => {
    const a = asSafeUint(9007199254740000); // Near MAX_SAFE_INTEGER
    const b = asSafeUint(1000);

    // Arithmetic operations with safe unsigned range clamping
    const sum = SafeUint.add(a, b); // SafeUint (clamped to MAX_SAFE_INTEGER)
    const diff = SafeUint.sub(b, a); // SafeUint (0 - clamped to MIN_VALUE)
    const product = SafeUint.mul(a, b); // SafeUint (clamped to MAX_SAFE_INTEGER)

    assert(sum === 9007199254740991); // clamped to MAX_SAFE_INTEGER
    assert(diff === 0); // clamped to MIN_VALUE
    assert(product === 9007199254740991); // clamped to MAX_SAFE_INTEGER

    // Range operations
    const clamped = SafeUint.clamp(-100); // SafeUint (0)
    const minimum = SafeUint.min(a, b); // SafeUint (1000)
    const maximum = SafeUint.max(a, b); // SafeUint (a)

    assert(clamped === 0);
    assert(minimum === 1000);
    assert(maximum === 9007199254740000);

    // Utility operations
    const random = SafeUint.random(); // SafeUint (random safe unsigned integer)
    const power = SafeUint.pow(asSafeUint(2), asSafeUint(20)); // SafeUint (1048576)

    assert(random >= SafeUint.MIN_VALUE && random <= SafeUint.MAX_VALUE);
    assert(power === 1048576);
  });
});
