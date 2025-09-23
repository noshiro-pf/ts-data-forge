// Example: src/number/branded-types/positive-uint16.mts (positive-uint16)
import { PositiveUint16, asPositiveUint16 } from 'ts-data-forge';

const value = asPositiveUint16(1);
const other = asPositiveUint16(2);
const added = PositiveUint16.add(value, other);
const isValue = PositiveUint16.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
