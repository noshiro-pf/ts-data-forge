// Example: src/collections/imap.mts (has)
import { IMap } from 'ts-data-forge';

const map = IMap.create<'id' | 'enabled', number | boolean>([
  ['id', 42],
  ['enabled', true],
]);

assert.strictEqual(map.has('id'), true);
assert.strictEqual(map.has('missing'), false);
