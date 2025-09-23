// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.add)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const sum = PositiveSafeInt.add(
  asPositiveSafeInt(1000),
  asPositiveSafeInt(2048),
);

assert.strictEqual(sum, 3048);
assert.strictEqual(PositiveSafeInt.is(sum), true);
