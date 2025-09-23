// Example: src/collections/iset-mapped.mts (isSubsetOf)
import { ISetMapped } from 'ts-data-forge';

type Point = Readonly<{ x: number; tag: string }>;

const toKey = (point: Point) => JSON.stringify(point);

// eslint-disable-next-line total-functions/no-unsafe-type-assertion
const fromKey = (key: string) => JSON.parse(key) as Point;

const subset = ISetMapped.create<Point, string>(
  [{ x: 1, tag: 'a' }],
  toKey,
  fromKey,
);
const superset = ISetMapped.create<Point, string>(
  [
    { x: 1, tag: 'a' },
    { x: 2, tag: 'b' },
  ],
  toKey,
  fromKey,
);

assert.strictEqual(subset.isSubsetOf(superset), true);
assert.strictEqual(superset.isSubsetOf(subset), false);
