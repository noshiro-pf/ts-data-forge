// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.mul)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const product = PositiveSafeInt.mul(
  asPositiveSafeInt(50),
  asPositiveSafeInt(20),
);

assert.strictEqual(product, 1000);
assert.strictEqual(PositiveSafeInt.is(product), true);
