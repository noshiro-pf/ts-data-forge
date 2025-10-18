// Example: src/collections/iset-mapped.mts (filterNot)
import { ISetMapped } from 'ts-data-forge';

// embed-sample-code-ignore-above
type Point = Readonly<{ x: number; tag: string }>;

const toKey = (point: Point) => JSON.stringify(point);

// eslint-disable-next-line total-functions/no-unsafe-type-assertion
const fromKey = (key: string) => JSON.parse(key) as Point;

const set = ISetMapped.create<Point, string>(
  [
    { x: 1, tag: 'a' },
    { x: 2, tag: 'b' },
  ],
  toKey,
  fromKey,
);

const withoutEven = set.filterNot((point) => point.x % 2 === 0);

assert.deepStrictEqual(Array.from(withoutEven), [{ x: 1, tag: 'a' }]);
