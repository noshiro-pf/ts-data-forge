// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.sub)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const difference = PositiveSafeInt.sub(
  asPositiveSafeInt(10),
  asPositiveSafeInt(20),
);

assert.strictEqual(difference, 1);
assert.strictEqual(PositiveSafeInt.is(difference), true);
