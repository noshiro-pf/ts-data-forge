// Example: src/collections/imap.mts (equal)
import { IMap } from 'ts-data-forge';

// Basic equality comparison
const preferences1 = IMap.create<string, boolean>([
  ['darkMode', true],
  ['notifications', false],
]);
const preferences2 = IMap.create<string, boolean>([
  ['darkMode', true],
  ['notifications', false],
]);
const preferences3 = IMap.create<string, boolean>([
  ['notifications', false],
  ['darkMode', true], // Order doesn't matter
]);

console.log(IMap.equal(preferences1, preferences2)); // true
console.log(IMap.equal(preferences1, preferences3)); // true (order doesn't matter)

// Different values
const preferences4 = IMap.create<string, boolean>([
  ['darkMode', false], // Different value
  ['notifications', false],
]);
console.log(IMap.equal(preferences1, preferences4)); // false

// Different keys
const preferences5 = IMap.create<string, boolean>([
  ['darkMode', true],
  ['sounds', false], // Different key
]);
console.log(IMap.equal(preferences1, preferences5)); // false

// Empty maps
const empty1 = IMap.create<string, number>([]);
const empty2 = IMap.create<string, number>([]);
console.log(IMap.equal(empty1, empty2)); // true

// Note: For deep equality of object values, use a custom comparison
const users1 = IMap.create<string, User>([['1', { name: 'Alice' }]]);
const users2 = IMap.create<string, User>([['1', { name: 'Alice' }]]);
console.log(IMap.equal(users1, users2)); // false (different object references)

export {
  empty1,
  empty2,
  preferences1,
  preferences2,
  preferences3,
  preferences4,
  preferences5,
  users1,
  users2,
};
