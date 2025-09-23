// Example: src/number/branded-types/positive-int.mts (isPositiveInt)
import { PositiveInt, isPositiveInt } from 'ts-data-forge';

assert.strictEqual(isPositiveInt(5), true);
assert.strictEqual(isPositiveInt(0), false);
assert.strictEqual(PositiveInt.is(10), true);
