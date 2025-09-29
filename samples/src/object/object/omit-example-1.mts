// Example: src/object/object.mts (omit)
import { Obj, pipe } from 'ts-data-forge';

// Direct usage
const original = { a: 1, b: 2, c: 3, d: 4 };
Obj.omit(original, ['a', 'c']); // { b: 2, d: 4 }
Obj.omit(original, ['b']); // { a: 1, c: 3, d: 4 }
Obj.omit(original, []); // { a: 1, b: 2, c: 3, d: 4 } (no keys omitted)

// Real-world example: removing sensitive data
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret123',
  apiKey: 'abc-def-ghi',
  lastLogin: new Date(),
};

// Create safe user object for client-side
const safeUser = Obj.omit(user, ['password', 'apiKey']);
// Result: { id: 1, name: "Alice", email: "alice@example.com", lastLogin: Date }

// Curried usage for data processing pipelines
const removeSensitive = Obj.omit(['password', 'apiKey', 'ssn'] as const);
const users = [user]; // array of user objects
const safeUsers = users.map(removeSensitive);

// Using with pipe for complex transformations
const publicProfile = pipe(user)
  .map(Obj.omit(['password', 'apiKey']))
  .map((u) => ({ ...u, displayName: u.name.toUpperCase() })).value;
// Result: { id: 1, name: "Alice", email: "...", lastLogin: Date, displayName: "ALICE" }

// Database queries: exclude computed fields
const dbUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  fullName: 'Alice Johnson', // computed field
  isActive: true, // computed field
};

const storableData = Obj.omit(dbUser, ['fullName', 'isActive']);
// Only data that should be persisted to database

// Type safety prevents invalid operations
// Obj.omit(user, ['invalidKey']); // ❌ TypeScript error
// Obj.omit(user, ['id', 'nonExistentField']); // ❌ TypeScript error

// Handling partial omission (when some keys might not exist)
const partialUser = { id: 1, name: 'Alice', password: 'secret' } as const;
const omitCredentials = Obj.omit(['password', 'apiKey']); // apiKey might not exist
const cleaned = omitCredentials(partialUser); // { id: 1, name: "Alice" }

export {
  cleaned,
  dbUser,
  omitCredentials,
  original,
  partialUser,
  publicProfile,
  removeSensitive,
  safeUser,
  safeUsers,
  storableData,
  user,
  users,
};
