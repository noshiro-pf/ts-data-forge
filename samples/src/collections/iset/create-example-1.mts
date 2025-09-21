// Sample code extracted from src/collections/iset.mts (create)
import { ISet } from 'ts-data-forge';

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
console.log(processedNumbers.toArray().toSorted()); // Output: [4, 6]

// From generator function
function* generatePrimes(): Generator<number> {
  yield 2;
  yield 3;
  yield 5;
  yield 7;
}
const primes = ISet.create(generatePrimes());
console.log(primes.size); // Output: 4
