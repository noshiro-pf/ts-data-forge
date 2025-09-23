// Example: src/number/branded-types/positive-int.mts (PositiveInt.min)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const smallest = PositiveInt.min(
  asPositiveInt(9),
  asPositiveInt(3),
  asPositiveInt(12),
);

assert.strictEqual(smallest, 3);
