// Sample code extracted from src/collections/iset-mapped.mts (ISetMapped)
import { ISetMapped } from 'ts-data-forge';

// Example: User management with composite identity
type User = { id: number; department: string; username: string; email: string };

// Define bidirectional transformation functions
const userToKey = (user: User): string => `${user.department}:${user.id}`;
const keyToUser = (key: string): User => {
  const [department, idStr] = key.split(':');
  const id = Number(idStr);
  // In practice, this might fetch from a user service or cache
  return {
    id,
    department,
    username: `user${id}`,
    email: `user${id}@${department}.company.com`,
  };
};

// Create a set with complex elements
let activeUsers = ISetMapped.create<User, string>([], userToKey, keyToUser);

// Use complex objects as elements naturally
const alice: User = {
  id: 1,
  department: 'engineering',
  username: 'alice',
  email: 'alice@engineering.company.com',
};
const bob: User = {
  id: 2,
  department: 'marketing',
  username: 'bob',
  email: 'bob@marketing.company.com',
};
const charlie: User = {
  id: 3,
  department: 'engineering',
  username: 'charlie',
  email: 'charlie@engineering.company.com',
};

activeUsers = activeUsers.add(alice).add(bob).add(charlie);

// All operations work with the original element type
console.log(activeUsers.has(alice)); // Output: true
console.log(activeUsers.size); // Output: 3

// Set operations preserve element types
const engineeringUsers = ISetMapped.create<User, string>(
  [alice, charlie],
  userToKey,
  keyToUser,
);
const marketingUsers = ISetMapped.create<User, string>(
  [bob],
  userToKey,
  keyToUser,
);

const allUsers = ISetMapped.union(engineeringUsers, marketingUsers);
const engineeringOnly = activeUsers.intersect(engineeringUsers);

// Iteration preserves original element types
for (const user of engineeringOnly) {
  console.log(`${user.username} works in ${user.department}`);
}
// Output:
// alice works in engineering
// charlie works in engineering

// Functional transformations work seamlessly
const updatedUsers = activeUsers.map((user) => ({
  ...user,
  email: user.email.replace('.company.com', '.example.com'),
}));

export { activeUsers, alice, allUsers, bob, charlie, engineeringOnly, engineeringUsers, keyToUser, marketingUsers, updatedUsers, userToKey };
export type { User };
