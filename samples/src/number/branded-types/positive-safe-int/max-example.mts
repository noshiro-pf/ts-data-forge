// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.max)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const largest = PositiveSafeInt.max(
  asPositiveSafeInt(10),
  asPositiveSafeInt(5),
);

assert.strictEqual(largest, 10);
