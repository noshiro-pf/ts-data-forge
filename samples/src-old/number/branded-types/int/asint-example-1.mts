// Example: src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

const value = asInt(1);
const other = asInt(2);
const added = Int.add(value, other);
const isValue = Int.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
