// Example: src/collections/iset-mapped.mts (isEmpty)
import { ISetMapped } from 'ts-data-forge';

type Point = Readonly<{ x: number; tag: string }>;

const toKey = (point: Point) => JSON.stringify(point);

// eslint-disable-next-line total-functions/no-unsafe-type-assertion
const fromKey = (key: string) => JSON.parse(key) as Point;

const empty = ISetMapped.create<Point, string>([], toKey, fromKey);
const points = ISetMapped.create<Point, string>(
  [{ x: 1, tag: 'a' }],
  toKey,
  fromKey,
);

assert.strictEqual(empty.isEmpty, true);
assert.strictEqual(points.isEmpty, false);
