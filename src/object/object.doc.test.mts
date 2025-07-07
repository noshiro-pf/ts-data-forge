import { pipe } from '../index.mjs';

describe('shallowEq', () => {
  test('JSDoc example', () => {
    // Basic usage with default Object.is equality
    Obj.shallowEq({ x: 1, y: 2 }, { x: 1, y: 2 }); // true
    Obj.shallowEq({ x: 1 }, { x: 1, y: 2 }); // false (different number of keys)
    Obj.shallowEq({ x: 1 }, { x: 2 }); // false (different values)
    Obj.shallowEq({}, {}); // true (both empty)

    // String comparisons
    Obj.shallowEq({ a: 'hello' }, { a: 'hello' }); // true
    Obj.shallowEq({ a: 'hello' }, { a: 'world' }); // false

    // Using custom equality function
    const caseInsensitiveEq = (a: unknown, b: unknown) =>
      typeof a === 'string' && typeof b === 'string'
        ? a.toLowerCase() === b.toLowerCase()
        : a === b;

    Obj.shallowEq({ name: 'ALICE' }, { name: 'alice' }, caseInsensitiveEq); // true

    // Handling special values
    Obj.shallowEq({ x: NaN }, { x: NaN }); // true (Object.is treats NaN === NaN)
    Obj.shallowEq({ x: +0 }, { x: -0 }); // false (Object.is distinguishes +0 and -0)
  });
});

describe('pick', () => {
  test('JSDoc example', () => {
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
    const users = [
      user,
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 },
    ];
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
  });
});

describe('omit', () => {
  test('JSDoc example', () => {
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

    assert.deepStrictEqual(publicProfile, {
      id: 1,
      name: 'Alice',
      email: '...',
      lastLogin: user.lastLogin,
      displayName: 'ALICE',
    });

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
  });
});

describe('fromEntries', () => {
  test('JSDoc example', () => {
    // Fixed entries with precise typing
    const fixedEntries = [
      ['name', 'Alice'],
      ['age', 30],
      ['active', true],
    ] as const;

    const user = Obj.fromEntries(fixedEntries);
    // Type: { readonly name: "Alice"; readonly age: 30; readonly active: true }
    // Value: { name: "Alice", age: 30, active: true }

    // Simple coordinate example
    const coordEntries = [
      ['x', 1],
      ['y', 3],
    ] as const;
    const point = Obj.fromEntries(coordEntries);
    // Type: { readonly x: 1; readonly y: 3 }
    // Value: { x: 1, y: 3 }

    // Dynamic entries with union keys
    const dynamicEntries: Array<['name' | 'email', string]> = [
      ['name', 'Alice'],
      // email might or might not be present
    ];
    const partialUser = Obj.fromEntries(dynamicEntries);
    // Type: Partial<{ name: string; email: string }>
    // This prevents assuming both 'name' and 'email' are always present

    // Creating configuration objects
    const configEntries = [
      ['apiUrl', 'https://api.example.com'],
      ['timeout', 5000],
      ['retries', 3],
      ['debug', false],
    ] as const;
    const config = Obj.fromEntries(configEntries);
    // Precise types for each configuration value

    // Converting Maps to objects
    const settingsMap = new Map([
      ['theme', 'dark'],
      ['language', 'en'],
      ['notifications', true],
    ] as const);
    const settings = Obj.fromEntries([...settingsMap]);

    // Building objects from computed entries
    const keys = ['a', 'b', 'c'] as const;
    const values = [1, 2, 3] as const;
    const computedEntries = keys.map((k, i) => [k, values[i]] as const);
    const computed = Obj.fromEntries(computedEntries);
    // Type reflects the specific key-value associations

    // Error handling with validation
    function createUserFromEntries(
      entries: ReadonlyArray<readonly [string, unknown]>,
    ) {
      const user = Obj.fromEntries(entries);
      // Type is Partial<Record<string, unknown>> - safe for dynamic data

      if ('name' in user && typeof user.name === 'string') {
        // Type narrowing works correctly
        return { name: user.name, ...user };
      }
      throw new Error('Invalid user data');
    }
  });
});
