// Example: src/guard/is-primitive.mts
import { isPrimitive } from 'ts-data-forge';

const primitives = ['text', 123, null, true];
const checks = primitives.map((item) => isPrimitive(item));

assert.deepStrictEqual(primitives, ['text', 123, null, true]);
assert.deepStrictEqual(checks, [true, true, true, true]);
assert.strictEqual(isPrimitive({}), false);
assert.strictEqual(isPrimitive(Symbol('id')), true);
assert.strictEqual(isPrimitive(undefined), true);
assert.strictEqual(isPrimitive(1n), true);
