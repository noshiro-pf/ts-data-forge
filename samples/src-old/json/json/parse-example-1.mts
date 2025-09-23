// Example: src/json/json.mts
import { expectType, Json, Result } from 'ts-data-forge';

const parsed = Json.parse('{"id":1,"name":"Ada"}');
assert(Result.isOk(parsed));
expectType<typeof parsed.value, JsonValue>('=');

assert.deepStrictEqual(parsed.value, {
  id: 1,
  name: 'Ada',
});

const stringified = Json.stringify({ id: 1, name: 'Ada' });
expectType<typeof stringified.value, string>('=');
assert(Result.isOk(stringified));
assert.strictEqual(stringified.value, '{"id":1,"name":"Ada"}');

const selected = Json.stringifySelected({ id: 1, name: 'Ada', role: 'admin' }, [
  'name',
]);
expectType<typeof selected.value, string>('=');
assert(Result.isOk(selected));
assert.strictEqual(selected.value, '{"name":"Ada"}');
