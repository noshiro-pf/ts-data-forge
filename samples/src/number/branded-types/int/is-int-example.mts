// Example: src/number/branded-types/int.mts (isInt)
import { Int, isInt } from 'ts-data-forge';

assert.strictEqual(isInt(5), true);
assert.strictEqual(isInt(5.25), false);
assert.strictEqual(Int.is(-10), true);
