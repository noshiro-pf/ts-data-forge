// Example: src/number/enum/uint8.mts (Uint8)
import { Uint8 } from 'ts-data-forge';

const a = 200;
const b = 100;

// Arithmetic operations with automatic clamping

const sum = Uint8.add(a, b);
assert.strictEqual(sum, 255); // clamped to MAX_VALUE

const diff = Uint8.sub(a, b);
assert.strictEqual(diff, 100);

const reverseDiff = Uint8.sub(b, a);
assert.strictEqual(reverseDiff, 0); // clamped to MIN_VALUE

const product = Uint8.mul(a, b);
assert.strictEqual(product, 255); // clamped due to overflow

// Range operations

const clamped = Uint8.clamp(-10);
assert.strictEqual(clamped, 0);

const minimum = Uint8.min(a, b);
assert.strictEqual(minimum, 100);

const maximum = Uint8.max(a, b);
assert.strictEqual(maximum, 200);

// Utility operations

const random = Uint8.random(50, 150);
assert.ok(random >= 50 && random <= 150); // random value in [50, 150]

const power = Uint8.pow(2, 7);
assert.strictEqual(power, 128);
