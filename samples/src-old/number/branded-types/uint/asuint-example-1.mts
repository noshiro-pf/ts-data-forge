// Example: src/number/branded-types/uint.mts (uint)
import { Uint, asUint } from 'ts-data-forge';

const value = asUint(1);
const other = asUint(2);
const added = Uint.add(value, other);
const isValue = Uint.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
