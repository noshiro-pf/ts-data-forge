// Example: src/number/branded-types/int16.mts (int16)
import { Int16, asInt16 } from 'ts-data-forge';

const value = asInt16(1);
const other = asInt16(2);
const added = Int16.add(value, other);
const isValue = Int16.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
