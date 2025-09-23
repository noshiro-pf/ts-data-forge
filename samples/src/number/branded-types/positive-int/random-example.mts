// Example: src/number/branded-types/positive-int.mts (PositiveInt.random)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const min = asPositiveInt(3);
const max = asPositiveInt(6);
const randomValue = PositiveInt.random(min, max);

assert.strictEqual(PositiveInt.is(randomValue), true);
assert.ok(randomValue >= 3 && randomValue <= 6);
