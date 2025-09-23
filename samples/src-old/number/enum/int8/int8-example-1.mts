// Example: src/number/enum/int8.mts (Int8)
import { Int8 } from 'ts-data-forge';

// Basic usage
const a = 100 satisfies Int8;
const b = 50 satisfies Int8;

// Arithmetic with automatic clamping
const sum = Int8.add(a, b);
assert.strictEqual(sum, 127);
const diff = Int8.sub(a, b);
assert.strictEqual(diff, 50);
const product = Int8.mul(a, b);
assert.strictEqual(product, 127);
const quotient = Int8.div(a, b);
assert.strictEqual(quotient, 2);

// Boundary handling
const overflow = Int8.add(127, 10);
assert.strictEqual(overflow, 127);
const underflow = Int8.sub(-128, 10);
assert.strictEqual(underflow, -128);

// Utility operations
const clamped = Int8.clamp(200);
assert.strictEqual(clamped, 127);
const absolute = Int8.abs(-100);
assert.strictEqual(absolute, 100);
const minimum = Int8.min(a, b);
assert.strictEqual(minimum, 50);
const maximum = Int8.max(a, b);
assert.strictEqual(maximum, 100);

// Random generation
const die = Int8.random(1, 6);
assert.ok(die >= 1 && die <= 6);
const offset = Int8.random(-10, 10);
assert.ok(offset >= -10 && offset <= 10);
