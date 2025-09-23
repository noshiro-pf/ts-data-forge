// Example: src/json/json.mts
import { Json, Result } from 'ts-data-forge';

const parsed = Json.parse('{"id":1,"name":"Ada"}');
const stringified = Json.stringify({ id: 1, name: 'Ada' });
const selected = Json.stringifySortedKey({ id: 1, name: 'Ada', role: 'admin' });

assert(Result.isOk(parsed));
assert.deepStrictEqual(parsed.value, { id: 1, name: 'Ada' });

assert(Result.isOk(stringified));
assert.strictEqual(stringified.value, '{"id":1,"name":"Ada"}');

assert(Result.isOk(selected));
assert.strictEqual(selected.value, '{"id":1,"name":"Ada","role":"admin"}');
