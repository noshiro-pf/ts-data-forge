// Example: src/collections/imap.mts (get)
import { IMap, Optional } from 'ts-data-forge';

const map = IMap.create([['user', { id: 1 }]]);

assert.deepStrictEqual(map.get('user'), Optional.some({ id: 1 }));
assert.deepStrictEqual(map.get('missing'), Optional.none);
