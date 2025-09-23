// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const value = asPositiveInt(1);
const other = asPositiveInt(2);
const added = PositiveInt.add(value, other);
const isValue = PositiveInt.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
