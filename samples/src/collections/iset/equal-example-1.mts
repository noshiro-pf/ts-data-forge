// Example: src/collections/iset.mts (equal)
import { ISet } from 'ts-data-forge';

// Basic equality comparison
const permissions1 = ISet.create(['read', 'write', 'execute']);
const permissions2 = ISet.create(['execute', 'read', 'write']); // Order doesn't matter
const permissions3 = ISet.create(['read', 'write']);

console.log(ISet.equal(permissions1, permissions2)); // true
console.log(ISet.equal(permissions1, permissions3)); // false (different sizes)

// With different element types
const numbers1 = ISet.create([1, 2, 3]);
const numbers2 = ISet.create([3, 1, 2]);
const numbers3 = ISet.create([1, 2, 4]); // Different element

console.log(ISet.equal(numbers1, numbers2)); // true
console.log(ISet.equal(numbers1, numbers3)); // false

// Empty sets
const empty1 = ISet.create<string>([]);
const empty2 = ISet.create<string>([]);
console.log(ISet.equal(empty1, empty2)); // true

// Single element sets
const single1 = ISet.create(['unique']);
const single2 = ISet.create(['unique']);
const single3 = ISet.create(['different']);

console.log(ISet.equal(single1, single2)); // true
console.log(ISet.equal(single1, single3)); // false

export {
  empty1,
  empty2,
  numbers1,
  numbers2,
  numbers3,
  permissions1,
  permissions2,
  permissions3,
  single1,
  single2,
  single3,
};
