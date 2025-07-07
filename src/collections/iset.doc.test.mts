import { ISet } from '../index.mjs';

describe('create', () => {
  test('JSDoc example', () => {
    // From array (duplicates automatically removed)
    const uniqueIds = ISet.create([1, 2, 3, 2, 1]); // Contains: 1, 2, 3
    console.log(uniqueIds.size); // Output: 3

    // From JavaScript Set
    const jsSet = new Set(['red', 'green', 'blue']);
    const colors = ISet.create(jsSet);
    console.log(colors.has('red')); // Output: true

    // From another ISet (creates a copy)
    const originalTags = ISet.create(['typescript', 'immutable']);
    const copiedTags = ISet.create(originalTags);
    console.log(copiedTags.size); // Output: 2

    // Empty set
    const emptyPermissions = ISet.create<string>([]);
    console.log(emptyPermissions.isEmpty); // Output: true

    // Fluent operations
    const processedNumbers = ISet.create([1, 2, 3, 4, 5])
      .filter((x) => x % 2 === 0) // Keep even numbers: 2, 4
      .add(6) // Add 6: 2, 4, 6
      .delete(2); // Remove 2: 4, 6
    console.log(processedNumbers.toArray().sort()); // Output: [4, 6]

    // From generator function
    function* generatePrimes(): Generator<number> {
      yield 2;
      yield 3;
      yield 5;
      yield 7;
    }
    const primes = ISet.create(generatePrimes());
    console.log(primes.size); // Output: 4
  });
});

describe('equal', () => {
  test('JSDoc example', () => {
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
  });
});

describe('diff', () => {
  test('JSDoc example', () => {
    // User permission changes
    const oldPermissions = ISet.create(['read', 'write', 'delete']);
    const newPermissions = ISet.create(['read', 'write', 'execute', 'admin']);

    const permissionDiff = ISet.diff(oldPermissions, newPermissions);

    console.log('Permissions removed:', permissionDiff.deleted.toArray());
    // Output: ["delete"]

    console.log('Permissions added:', permissionDiff.added.toArray());
    // Output: ["execute", "admin"]

    // No changes
    const unchanged1 = ISet.create(['a', 'b', 'c']);
    const unchanged2 = ISet.create(['a', 'b', 'c']);
    const noDiff = ISet.diff(unchanged1, unchanged2);

    console.log(noDiff.added.isEmpty); // true
    console.log(noDiff.deleted.isEmpty); // true

    // Complete replacement
    const oldTags = ISet.create(['javascript', 'react']);
    const newTags = ISet.create(['typescript', 'vue']);
    const tagDiff = ISet.diff(oldTags, newTags);

    console.log(tagDiff.deleted.toArray()); // ["javascript", "react"]
    console.log(tagDiff.added.toArray()); // ["typescript", "vue"]
  });
});

describe('intersection', () => {
  test('JSDoc example', () => {
    // Finding common permissions between user and role
    const userPermissions = ISet.create(['read', 'write', 'delete', 'admin']);
    const rolePermissions = ISet.create(['read', 'write', 'execute']);

    const commonPermissions = ISet.intersection(
      userPermissions,
      rolePermissions,
    );
    console.log(commonPermissions.toArray()); // ["read", "write"]

    // No common elements
    const setA = ISet.create([1, 2, 3]);
    const setB = ISet.create([4, 5, 6]);
    const noCommon = ISet.intersection(setA, setB);
    console.log(noCommon.isEmpty); // true

    // Complete overlap
    const identical1 = ISet.create(['a', 'b', 'c']);
    const identical2 = ISet.create(['a', 'b', 'c']);
    const completeOverlap = ISet.intersection(identical1, identical2);
    console.log(ISet.equal(completeOverlap, identical1)); // true

    // Intersection with empty set
    const nonEmpty = ISet.create([1, 2, 3]);
    const empty = ISet.create<number>([]);
    const withEmpty = ISet.intersection(nonEmpty, empty);
    console.log(withEmpty.isEmpty); // true
  });
});

describe('union', () => {
  test('JSDoc example', () => {
    // Combining permissions from multiple sources
    const userPermissions = ISet.create(['read', 'write']);
    const rolePermissions = ISet.create(['write', 'execute', 'admin']);

    const allPermissions = ISet.union(userPermissions, rolePermissions);
    console.log(allPermissions.toArray().sort((a, b) => a.localeCompare(b)));
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
  });
});
