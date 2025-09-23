// Example: src/collections/iset-mapped.mts
import { ISetMapped } from 'ts-data-forge';

type Key = Readonly<{ id: number }>;
const toKey = (value: Key) => value.id;
const fromKey = (id: number): Key => ({ id });

const set = ISetMapped.create(
  [{ id: 1 }, { id: 2 }, { id: 3 }] as const,
  toKey,
  fromKey,
);
const withoutTwo = set.delete({ id: 2 });

assert.strictEqual(withoutTwo.has({ id: 3 }), true);
assert.strictEqual(withoutTwo.size, 2);
assert.deepStrictEqual(withoutTwo.toArray(), [
  {
    id: 1,
  },
  {
    id: 3,
  },
]);
