// Example: src/number/branded-types/positive-int32.mts (positive-int32)
import { PositiveInt32, asPositiveInt32 } from 'ts-data-forge';

const value = asPositiveInt32(1);
const other = asPositiveInt32(2);
const added = PositiveInt32.add(value, other);
const isValue = PositiveInt32.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
