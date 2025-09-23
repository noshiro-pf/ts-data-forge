// Example: src/collections/imap-mapped.mts
import { IMapMapped, Optional } from 'ts-data-forge';

type Key = Readonly<{ id: number }>;
const toKey = (val: Key) => val.id;
const fromKey = (id: number): Key => ({ id });

const map = IMapMapped.create(
  [
    [{ id: 1 }, 'Alice'],
    [{ id: 2 }, 'Bob'],
  ] as const,
  toKey,
  fromKey,
);

assert.strictEqual(map.has({ id: 1 }), true);
assert.strictEqual(map.size, 2);

const value = Optional.unwrapOr(map.get({ id: 1 }), 'Unknown');
assert.strictEqual(value, 'Alice');

assert.strictEqual(Optional.unwrapOr(map.get({ id: 3 }), 'Unknown'), 'Unknown');
