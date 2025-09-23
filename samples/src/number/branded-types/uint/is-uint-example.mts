// Example: src/number/branded-types/uint.mts (isUint)
import { Uint, isUint } from 'ts-data-forge';

assert.strictEqual(isUint(4), true);
assert.strictEqual(isUint(-1), false);
assert.strictEqual(Uint.is(0), true);
