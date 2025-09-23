// Example: src/number/branded-types/safe-int.mts (SafeInt.random)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const min = asSafeInt(-10);
const max = asSafeInt(10);
const randomValue = SafeInt.random(min, max);

assert.strictEqual(SafeInt.is(randomValue), true);
assert.ok(randomValue >= -10 && randomValue <= 10);
