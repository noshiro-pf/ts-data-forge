// Example: src/number/branded-types/int.mts (asInt)
import { Int, asInt } from 'ts-data-forge';

const branded = asInt(42);

assert.strictEqual(branded, 42);
assert.strictEqual(Int.is(branded), true);
