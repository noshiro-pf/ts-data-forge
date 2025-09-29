// Example: src/collections/imap-mapped.mts (equal)
import { IMapMapped } from 'ts-data-forge';

// Example with coordinate keys
type Point = { x: number; y: number };
const pointToString = (p: Point): string => `${p.x},${p.y}`;
const stringToPoint = (s: string): Point => {
  const [x, y] = s.split(',').map(Number);
  return { x, y };
};

const map1 = IMapMapped.create<Point, string, string>(
  [
    [{ x: 1, y: 2 }, 'point1'],
    [{ x: 3, y: 4 }, 'point2'],
  ],
  pointToString,
  stringToPoint,
);

const map2 = IMapMapped.create<Point, string, string>(
  [
    [{ x: 1, y: 2 }, 'point1'],
    [{ x: 3, y: 4 }, 'point2'],
  ], // Same content
  pointToString,
  stringToPoint,
);

const map3 = IMapMapped.create<Point, string, string>(
  [
    [{ x: 1, y: 2 }, 'point1'],
    [{ x: 3, y: 4 }, 'different'],
  ], // Different value
  pointToString,
  stringToPoint,
);

console.log(IMapMapped.equal(map1, map2)); // true
console.log(IMapMapped.equal(map1, map3)); // false (different value)

// Order doesn't matter for equality
const map4 = IMapMapped.create<Point, string, string>(
  [
    [{ x: 3, y: 4 }, 'point2'],
    [{ x: 1, y: 2 }, 'point1'],
  ], // Different order
  pointToString,
  stringToPoint,
);

console.log(IMapMapped.equal(map1, map4)); // true

// Different transformation functions but same logical content
const alternativePointToString = (p: Point): string => `(${p.x},${p.y})`; // Different format
const alternativeStringToPoint = (s: string): Point => {
  const match = /\((\d+),(\d+)\)/.exec(s);
  return { x: Number(match![1]), y: Number(match![2]) };
};

const map5 = IMapMapped.create<Point, string, string>(
  [
    [{ x: 1, y: 2 }, 'point1'],
    [{ x: 3, y: 4 }, 'point2'],
  ],
  alternativePointToString,
  alternativeStringToPoint,
);

// This would be false because the underlying mapped keys are different
// even though the logical content is the same
console.log(IMapMapped.equal(map1, map5)); // false

// Empty maps
const empty1 = IMapMapped.create<Point, string, string>(
  [],
  pointToString,
  stringToPoint,
);
const empty2 = IMapMapped.create<Point, string, string>(
  [],
  pointToString,
  stringToPoint,
);
console.log(IMapMapped.equal(empty1, empty2)); // true

export {
  alternativePointToString,
  alternativeStringToPoint,
  empty1,
  empty2,
  map1,
  map2,
  map3,
  map4,
  map5,
  pointToString,
  stringToPoint,
};
export type { Point };
