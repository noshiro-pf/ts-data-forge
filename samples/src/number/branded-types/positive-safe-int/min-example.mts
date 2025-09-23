// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.min)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const smallest = PositiveSafeInt.min(
  asPositiveSafeInt(10),
  asPositiveSafeInt(5),
);

assert.strictEqual(smallest, 5);
