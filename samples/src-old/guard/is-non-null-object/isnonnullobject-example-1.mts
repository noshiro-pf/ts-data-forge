// Example: src/guard/is-non-null-object.mts
import { isNonNullObject } from 'ts-data-forge';

const value: unknown = { id: 1 };
const isObject = isNonNullObject(value);

assert.strictEqual(isObject, true);
assert.strictEqual(isNonNullObject(null), false);
assert.strictEqual(isNonNullObject(undefined), false);
assert.strictEqual(isNonNullObject(42), false);
