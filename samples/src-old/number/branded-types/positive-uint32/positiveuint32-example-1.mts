// Example: src/number/branded-types/positive-uint32.mts (positive-uint32)
import { PositiveUint32, asPositiveUint32 } from 'ts-data-forge';

const value = asPositiveUint32(1);
const other = asPositiveUint32(2);
const added = PositiveUint32.add(value, other);
const isValue = PositiveUint32.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
