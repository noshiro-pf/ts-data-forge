// Example: src/collections/iset-mapped.mts (has)
import { ISetMapped } from 'ts-data-forge';

type Point = Readonly<{ x: number; tag: string }>;

const toKey = (point: Point) => JSON.stringify(point);

// eslint-disable-next-line total-functions/no-unsafe-type-assertion
const fromKey = (key: string) => JSON.parse(key) as Point;

const set = ISetMapped.create<Point, string>(
  [{ x: 1, tag: 'a' }],
  toKey,
  fromKey,
);

assert.strictEqual(set.has({ x: 1, tag: 'a' }), true);
assert.strictEqual(set.has({ x: 2, tag: 'b' }), false);
