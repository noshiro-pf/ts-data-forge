// Example: src/number/branded-types/uint16.mts (uint16)
import { Uint16, asUint16 } from 'ts-data-forge';

const value = asUint16(1);
const other = asUint16(2);
const added = Uint16.add(value, other);
const isValue = Uint16.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
