// Example: src/number/branded-types/positive-int.mts (asPositiveInt)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const branded = asPositiveInt(7);

assert.strictEqual(branded, 7);
assert.strictEqual(PositiveInt.is(branded), true);
