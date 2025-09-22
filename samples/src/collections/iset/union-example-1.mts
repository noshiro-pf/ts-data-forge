// Sample code extracted from src/collections/iset.mts (union)
import { ISet } from 'ts-data-forge';

// Combining permissions from multiple sources
const userPermissions = ISet.create(['read', 'write']);
const rolePermissions = ISet.create(['write', 'execute', 'admin']);

const allPermissions = ISet.union(userPermissions, rolePermissions);
console.log(allPermissions.toArray().toSorted());
// Output: ["admin", "execute", "read", "write"]

// Union with different types (type widening)
const numbers = ISet.create([1, 2, 3]);
const strings = ISet.create(['a', 'b']);
const mixed = ISet.union(numbers, strings); // ISet<number | string>
console.log(mixed.size); // 5

// Union with empty set
const nonEmpty = ISet.create(['item1', 'item2']);
const empty = ISet.create<string>([]);
const withEmpty = ISet.union(nonEmpty, empty);
console.log(ISet.equal(withEmpty, nonEmpty)); // true

// Overlapping sets
const featuresA = ISet.create(['feature1', 'feature2', 'feature3']);
const featuresB = ISet.create(['feature2', 'feature3', 'feature4']);
const allFeatures = ISet.union(featuresA, featuresB);
console.log(allFeatures.size); // 4 (duplicates removed)

export { allFeatures, allPermissions, empty, featuresA, featuresB, mixed, nonEmpty, numbers, rolePermissions, strings, userPermissions, withEmpty };
