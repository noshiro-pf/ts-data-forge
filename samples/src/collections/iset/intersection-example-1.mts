// Example: src/collections/iset.mts (intersection)
import { ISet } from 'ts-data-forge';

// Finding common permissions between user and role
const userPermissions = ISet.create(['read', 'write', 'delete', 'admin']);
const rolePermissions = ISet.create(['read', 'write', 'execute']);

const commonPermissions = ISet.intersection(userPermissions, rolePermissions);
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

export {
  commonPermissions,
  completeOverlap,
  empty,
  identical1,
  identical2,
  noCommon,
  nonEmpty,
  rolePermissions,
  setA,
  setB,
  userPermissions,
  withEmpty,
};
