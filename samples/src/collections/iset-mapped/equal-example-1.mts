// Sample code extracted from src/collections/iset-mapped.mts (equal)
import { ISetMapped } from 'ts-data-forge';

// Example with coordinate-based elements
type Point = { x: number; y: number; label?: string };
const pointToKey = (p: Point): string => `${p.x},${p.y}`;
const keyToPoint = (s: string): Point => {
  const [x, y] = s.split(',').map(Number);
  return { x, y };
};

const set1 = ISetMapped.create<Point, string>(
  [
    { x: 1, y: 2, label: 'A' },
    { x: 3, y: 4, label: 'B' },
  ],
  pointToKey,
  keyToPoint,
);

const set2 = ISetMapped.create<Point, string>(
  [
    { x: 3, y: 4, label: 'Different' },
    { x: 1, y: 2, label: 'Labels' },
  ], // Order doesn't matter
  pointToKey,
  keyToPoint,
);

const set3 = ISetMapped.create<Point, string>(
  [
    { x: 1, y: 2 },
    { x: 5, y: 6 },
  ], // Different point
  pointToKey,
  keyToPoint,
);

console.log(ISetMapped.equal(set1, set2)); // true (same coordinates, labels don't affect equality)
console.log(ISetMapped.equal(set1, set3)); // false (different coordinates)

// Example with user entities
type User = { id: number; department: string; name: string };
const userToKey = (u: User): string => `${u.department}:${u.id}`;
const keyToUser = (k: string): User => {
  const [department, idStr] = k.split(':');
  return { id: Number(idStr), department, name: '' };
};

const users1 = ISetMapped.create<User, string>(
  [
    { id: 1, department: 'eng', name: 'Alice' },
    { id: 2, department: 'sales', name: 'Bob' },
  ],
  userToKey,
  keyToUser,
);

const users2 = ISetMapped.create<User, string>(
  [
    { id: 2, department: 'sales', name: 'Robert' }, // Different name, same identity
    { id: 1, department: 'eng', name: 'Alicia' }, // Different name, same identity
  ],
  userToKey,
  keyToUser,
);

console.log(ISetMapped.equal(users1, users2)); // true (same department:id combinations)

// Empty sets
const empty1 = ISetMapped.create<Point, string>([], pointToKey, keyToPoint);
const empty2 = ISetMapped.create<Point, string>([], pointToKey, keyToPoint);
console.log(ISetMapped.equal(empty1, empty2)); // true

// Sets with different transformation functions but same logical content
const alternativePointToKey = (p: Point): string => `(${p.x},${p.y})`; // Different format
const alternativeKeyToPoint = (s: string): Point => {
  const match = s.match(/\((\d+),(\d+)\)/)!;
  return { x: Number(match[1]), y: Number(match[2]) };
};

const set4 = ISetMapped.create<Point, string>(
  [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
  ],
  alternativePointToKey,
  alternativeKeyToPoint,
);

// This would be false because the underlying mapped keys are different
console.log(ISetMapped.equal(set1, set4)); // false

export { alternativeKeyToPoint, alternativePointToKey, empty1, empty2, keyToPoint, keyToUser, pointToKey, set1, set2, set3, set4, userToKey, users1, users2 };
export type { Point, User };
