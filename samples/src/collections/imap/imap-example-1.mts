// Sample code extracted from src/collections/imap.mts (imap)
import { IMap } from 'ts-data-forge';

// This is a type alias describing an interface, so it's not directly instantiated.
// See IMap.create for examples of creating IMap instances that conform to this interface.

// Example of how you might use a variable that implements this structure:
declare const userMap: IMap<string, User>;

// Immutable operations - original map is never modified
const hasUser = userMap.has('alice'); // O(1)
const user = userMap.get('alice').unwrapOr(defaultUser); // O(1)
const newMap = userMap.set('bob', newUser); // O(1) - returns new IMap
const updated = userMap.update('alice', (u) => ({ ...u, active: true })); // O(1)

// Functional transformations
const activeUsers = userMap.map((user, id) => ({
  ...user,
  lastSeen: Date.now(),
})); // O(n)

export { activeUsers, hasUser, newMap, updated, user, userMap };
