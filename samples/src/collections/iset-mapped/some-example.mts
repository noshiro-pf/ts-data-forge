// Example: src/collections/iset-mapped.mts (some)
import { ISetMapped } from 'ts-data-forge';

type Point = Readonly<{ x: number; tag: string }>;

const toKey = (point: Point) => JSON.stringify(point);

// eslint-disable-next-line total-functions/no-unsafe-type-assertion
const fromKey = (key: string) => JSON.parse(key) as Point;

const set = ISetMapped.create<Point, string>(
  [
    { x: 1, tag: 'a' },
    { x: 5, tag: 'b' },
  ],
  toKey,
  fromKey,
);

assert.strictEqual(
  set.some((point) => point.x > 4),
  true,
);
assert.strictEqual(
  set.some((point) => point.x > 10),
  false,
);
