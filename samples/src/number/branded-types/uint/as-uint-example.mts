// Example: src/number/branded-types/uint.mts (asUint)
import { Uint, asUint } from 'ts-data-forge';

const branded = asUint(12);

assert.strictEqual(branded, 12);
assert.strictEqual(Uint.is(branded), true);
