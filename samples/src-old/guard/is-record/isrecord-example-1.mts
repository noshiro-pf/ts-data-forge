// Example: src/guard/is-record.mts
import { isRecord } from 'ts-data-forge';

const value: unknown = { id: 1 };
const record = isRecord(value) ? value : undefined;

assert.strictEqual(isRecord(value), true);
assert.deepStrictEqual(record, { id: 1 });
assert.strictEqual(isRecord('not-record'), false);
assert.strictEqual(isRecord(null), false);
assert.strictEqual(isRecord(undefined), false);
assert.strictEqual(isRecord(42), false);
