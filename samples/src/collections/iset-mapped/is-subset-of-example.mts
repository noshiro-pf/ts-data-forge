// Example: src/collections/iset-mapped.mts (isSubsetOf)
import { ISetMapped } from 'ts-data-forge';

// embed-sample-code-ignore-above
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

assert.ok(subset.isSubsetOf(superset));
assert.notOk(superset.isSubsetOf(subset));
