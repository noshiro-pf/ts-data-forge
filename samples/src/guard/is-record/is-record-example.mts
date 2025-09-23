// Example: src/guard/is-record.mts (isRecord)
import { isRecord } from 'ts-data-forge';

const entries: unknown[] = [{ id: 1 }, ['tuple']];

const records = entries.filter(isRecord);

assert.deepStrictEqual(records, [{ id: 1 }]);
