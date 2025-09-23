// Example: src/number/enum/int8.mts (asInt8)
import { asInt8 } from 'ts-data-forge';

const byte = asInt8(100);
assert.strictEqual(byte, 100);
const max = asInt8(127);
assert.strictEqual(max, 127);
const min = asInt8(-128);
assert.strictEqual(min, -128);
const zero = asInt8(0);
assert.strictEqual(zero, 0);

// These throw TypeError:
assert.throws(() => asInt8(128)); // Exceeds maximum (127)
assert.throws(() => asInt8(-129)); // Below minimum (-128)
assert.throws(() => asInt8(1.5)); // Not an integer
assert.throws(() => asInt8(Number.NaN)); // Not a number
