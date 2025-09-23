// Example: src/number/branded-types/positive-safe-int.mts (positive-safe-int)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const value = asPositiveSafeInt(1);
const other = asPositiveSafeInt(2);
const added = PositiveSafeInt.add(value, other);
const isValue = PositiveSafeInt.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
