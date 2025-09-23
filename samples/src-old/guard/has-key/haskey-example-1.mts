// Example: src/guard/has-key.mts
import { hasKey } from 'ts-data-forge';

const record = { a: 1, b: 2 } as const;
const hasA = hasKey(record, 'a');
const value = hasA ? record.a : undefined;

assert.strictEqual(hasA, true);
assert.strictEqual(value, 1);
assert.strictEqual(hasKey(record, 'c'), false);
