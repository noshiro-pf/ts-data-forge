// Sample code extracted from src/collections/iset.mts (diff)
import { ISet } from 'ts-data-forge';

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

export { newPermissions, newTags, noDiff, oldPermissions, oldTags, permissionDiff, tagDiff, unchanged1, unchanged2 };
