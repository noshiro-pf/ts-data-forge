// Example: src/collections/imap.mts (create)
import { IMap, range } from 'ts-data-forge';

// From array of tuples
const userScores = IMap.create<string, number>([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);
console.log(userScores.get('alice').unwrap()); // Output: 95

// From JavaScript Map
const jsMap = new Map([
  ['config', { debug: true }],
  ['env', 'production'],
]);
const config = IMap.create(jsMap);
console.log(config.get('env').unwrap()); // Output: "production"

// From another IMap (creates a copy)
const originalMap = IMap.create<string, boolean>([['enabled', true]]);
const copiedMap = IMap.create(originalMap);
console.log(copiedMap.get('enabled').unwrap()); // Output: true

// Empty map
const emptyMap = IMap.create<string, number>([]);
console.log(emptyMap.size); // Output: 0

// From custom iterable
function* generateEntries(): Generator<[string, number]> {
  for (const i of range(3)) {
    yield [`item${i}`, i * 10];
  }
}
const generatedMap = IMap.create(generateEntries());
console.log(generatedMap.size); // Output: 3

export {
  config,
  copiedMap,
  emptyMap,
  generatedMap,
  generateEntries,
  jsMap,
  originalMap,
  userScores,
};
