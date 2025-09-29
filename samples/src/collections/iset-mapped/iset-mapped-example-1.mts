// Example: src/collections/iset-mapped.mts (iset-mapped)
import { type ISetMapped } from 'ts-data-forge';

// Example with complex object elements
type User = { id: number; department: string; email: string };

// Define transformation functions
const userToKey = (user: User): string => `${user.department}:${user.id}`;
const keyToUser = (key: string): User => {
  const [department, idStr] = key.split(':');
  // In practice, you might fetch from a cache or reconstruct more robustly
  return {
    id: Number(idStr),
    department,
    email: `user${idStr}@${department}.com`,
  };
};

declare const activeUsers: ISetMapped<User, string>;

// All operations work with the complex element type
const user: User = {
  id: 123,
  department: 'engineering',
  email: 'alice@engineering.com',
};
const hasUser = activeUsers.has(user); // O(1)
const withNewUser = activeUsers.add(user); // O(1) - returns new ISetMapped
const withoutUser = activeUsers.delete(user); // O(1) - returns new ISetMapped

export {
  activeUsers,
  hasUser,
  keyToUser,
  user,
  userToKey,
  withNewUser,
  withoutUser,
};
export type { User };
