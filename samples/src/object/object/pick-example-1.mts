// Sample code extracted from src/object/object.mts (pick)
import { Obj, pipe } from 'ts-data-forge';

// Direct usage
const original = { a: 1, b: 2, c: 3, d: 4 };
Obj.pick(original, ['a', 'c']); // { a: 1, c: 3 }
Obj.pick(original, ['b']); // { b: 2 }
Obj.pick(original, []); // {} (empty result)

// Real-world example with user data
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret123',
  age: 30,
};

// Extract public user information
const publicUser = Obj.pick(user, ['id', 'name', 'email']);
// Result: { id: 1, name: "Alice", email: "alice@example.com" }

// Curried usage for functional composition
const pickIdAndName = Obj.pick(['id', 'name'] as const);
const users = [user, { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 }];
const publicUsers = users.map(pickIdAndName);
// Result: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]

// Using with pipe for data transformation
const result = pipe(user)
  .map(Obj.pick(['id', 'name']))
  .map((u) => ({ ...u, displayName: u.name.toUpperCase() })).value;
// Result: { id: 1, name: "Alice", displayName: "ALICE" }

// Type safety prevents invalid keys
// Obj.pick(user, ['invalidKey']); // ❌ TypeScript error
// Obj.pick(user, ['id', 'nonExistentField']); // ❌ TypeScript error

// Partial key selection (when some keys might not exist)
const partialUser = { id: 1, name: 'Alice' } as const;
const pickVisible = Obj.pick(['name', 'age']); // age might not exist
const visible = pickVisible(partialUser); // { name: "Alice" } (age omitted)

export { original, partialUser, pickIdAndName, pickVisible, publicUser, publicUsers, result, user, users, visible };
