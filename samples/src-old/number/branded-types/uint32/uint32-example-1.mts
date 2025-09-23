// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

const value = asUint32(1);
const other = asUint32(2);
const added = Uint32.add(value, other);
const isValue = Uint32.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
