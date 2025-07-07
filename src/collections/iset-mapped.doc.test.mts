import { ISetMapped } from '../index.mjs';

describe('create', () => {
  test('JSDoc example 1', () => {
    // Example with complex object elements
    type User = Readonly<{
      id: number;
      department: string;
      email: string;
    }>;

    // Define transformation functions
    const userToKey = (u: User): string => `${u.department}:${u.id}`;
    const keyToUser = (key: string): User => {
      const [department, idStr] = key.split(':');
      // In practice, you might fetch from a cache or reconstruct more robustly
      return {
        id: Number(idStr),
        department,
        email: `user${idStr}@${department}.com`,
      };
    };

    const activeUsers = ISetMapped.create<User, string>(
      [{ id: 123, department: 'engineering', email: 'alice@engineering.com' }],
      userToKey,
      keyToUser,
    );

    // All operations work with the complex element type
    const user: User = {
      id: 123,
      department: 'engineering',
      email: 'alice@engineering.com',
    };
    const hasUser = activeUsers.has(user); // O(1)
    const withNewUser = activeUsers.add(user); // O(1) - returns new ISetMapped
    const withoutUser = activeUsers.delete(user); // O(1) - returns new ISetMapped

    // Use the variables to demonstrate functionality
    assert(typeof hasUser === 'boolean');
    assert(withNewUser.size >= activeUsers.size);
    assert(withoutUser.size <= activeUsers.size);
    console.log('Key transform:', userToKey(user));
    console.log('Reverse transform:', keyToUser('engineering:123').department);
  });

  test('JSDoc example 2', () => {
    // Example: User management with composite identity
    type User = Readonly<{
      id: number;
      department: string;
      username: string;
      email: string;
    }>;

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

    // Use the variables to demonstrate functionality
    assert(allUsers.size === 3);
    assert(updatedUsers.size === activeUsers.size);
  });

  test('JSDoc example 3', () => {
    // Example 1: Product catalog with SKU-based identity
    type Product = Readonly<{
      sku: string;
      name: string;
      price: number;
      category: string;
    }>;

    const productToKey = (product: Product): string => product.sku;
    // In practice, this might fetch from a product service or cache
    const keyToProduct = (sku: string): Product => ({
      sku,
      name: `Product ${sku}`,
      price: 0,
      category: 'unknown',
    });

    const productSet = ISetMapped.create<Product, string>(
      [
        {
          sku: 'LAPTOP-001',
          name: 'Gaming Laptop',
          price: 1299,
          category: 'electronics',
        },
        {
          sku: 'MOUSE-002',
          name: 'Wireless Mouse',
          price: 49,
          category: 'accessories',
        },
        {
          sku: 'LAPTOP-001',
          name: 'Gaming Laptop',
          price: 1299,
          category: 'electronics',
        }, // Duplicate SKU
      ],
      productToKey,
      keyToProduct,
    );

    console.log(productSet.size); // Output: 2 (duplicate removed)
    console.log(
      productSet.has({
        sku: 'LAPTOP-001',
        name: 'Gaming Laptop',
        price: 1299,
        category: 'electronics',
      }),
    ); // true

    // Example 2: Geographic locations with coordinate-based identity
    type Location = Readonly<{
      name: string;
      lat: number;
      lng: number;
      type: string;
    }>;

    const locationToKey = (loc: Location): string =>
      `${loc.lat.toFixed(6)},${loc.lng.toFixed(6)}`;
    const keyToLocation = (key: string): Location => {
      const [latStr, lngStr] = key.split(',');
      return {
        name: 'Unknown Location',
        lat: Number(latStr),
        lng: Number(lngStr),
        type: 'point',
      };
    };

    const locationSet = ISetMapped.create<Location, string>(
      [
        {
          name: 'Statue of Liberty',
          lat: 40.689247,
          lng: -74.044502,
          type: 'monument',
        },
        {
          name: 'Empire State Building',
          lat: 40.748817,
          lng: -73.985428,
          type: 'building',
        },
      ],
      locationToKey,
      keyToLocation,
    );
    assert(locationSet.size === 2);

    // Example 3: User entities with multi-part identity
    type User = Readonly<{
      id: number;
      tenant: string;
      email: string;
      active: boolean;
    }>;

    const userToKey = (user: User): string => `${user.tenant}:${user.id}`;
    const keyToUser = (key: string): User => {
      const [tenant, idStr] = key.split(':');
      return {
        id: Number(idStr),
        tenant,
        email: `user${idStr}@${tenant}.com`,
        active: true,
      };
    };

    const userSet = ISetMapped.create<User, string>([], userToKey, keyToUser)
      .add({ id: 1, tenant: 'acme', email: 'alice@acme.com', active: true })
      .add({ id: 2, tenant: 'acme', email: 'bob@acme.com', active: false });

    console.log(userSet.size); // Output: 2

    // Example 4: Empty set with type specification
    const emptyProductSet = ISetMapped.create<Product, string>(
      [],
      productToKey,
      keyToProduct,
    );
    console.log(emptyProductSet.isEmpty); // Output: true
  });
});

describe('equal', () => {
  test('JSDoc example', () => {
    // Example with coordinate-based elements
    type Point = Readonly<{ x: number; y: number; label?: string }>;
    const pointToKey = (p: Point): string => `${p.x},${p.y}`;
    const keyToPoint = (s: string): Point => {
      const [x, y] = s.split(',').map(Number);
      return { x, y };
    };

    const set1 = ISetMapped.create<Point, string>(
      [
        { x: 1, y: 2, label: 'A' },
        { x: 3, y: 4, label: 'B' },
      ],
      pointToKey,
      keyToPoint,
    );

    const set2 = ISetMapped.create<Point, string>(
      [
        { x: 3, y: 4, label: 'Different' },
        { x: 1, y: 2, label: 'Labels' },
      ], // Order doesn't matter
      pointToKey,
      keyToPoint,
    );

    const set3 = ISetMapped.create<Point, string>(
      [
        { x: 1, y: 2 },
        { x: 5, y: 6 },
      ], // Different point
      pointToKey,
      keyToPoint,
    );

    console.log(ISetMapped.equal(set1, set2)); // true (same coordinates, labels don't affect equality)
    console.log(ISetMapped.equal(set1, set3)); // false (different coordinates)

    // Example with user entities
    type User = Readonly<{
      id: number;
      department: string;
      name: string;
    }>;
    const userToKey = (u: User): string => `${u.department}:${u.id}`;
    const keyToUser = (k: string): User => {
      const [department, idStr] = k.split(':');
      return { id: Number(idStr), department, name: '' };
    };

    const users1 = ISetMapped.create<User, string>(
      [
        { id: 1, department: 'eng', name: 'Alice' },
        { id: 2, department: 'sales', name: 'Bob' },
      ],
      userToKey,
      keyToUser,
    );

    const users2 = ISetMapped.create<User, string>(
      [
        { id: 2, department: 'sales', name: 'Robert' }, // Different name, same identity
        { id: 1, department: 'eng', name: 'Alicia' }, // Different name, same identity
      ],
      userToKey,
      keyToUser,
    );

    console.log(ISetMapped.equal(users1, users2)); // true (same department:id combinations)

    // Empty sets
    const empty1 = ISetMapped.create<Point, string>([], pointToKey, keyToPoint);
    const empty2 = ISetMapped.create<Point, string>([], pointToKey, keyToPoint);
    console.log(ISetMapped.equal(empty1, empty2)); // true

    // Sets with different transformation functions but same logical content
    const alternativePointToKey = (p: Point): string => `(${p.x},${p.y})`; // Different format
    const alternativeKeyToPoint = (s: string): Point => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const match = /\((\d+),(\d+)\)/u.exec(s)!;
      return { x: Number(match[1]), y: Number(match[2]) };
    };

    const set4 = ISetMapped.create<Point, string>(
      [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      alternativePointToKey,
      alternativeKeyToPoint,
    );

    // This would be false because the underlying mapped keys are different
    console.log(ISetMapped.equal(set1, set4)); // false
  });
});

describe('diff', () => {
  test('JSDoc example', () => {
    type Tag = Readonly<{ name: string }>;
    const tagToKey = (t: Tag): string => t.name;
    const keyToTag = (name: string): Tag => ({ name });

    const oldTags = ISetMapped.create<Tag, string>(
      [{ name: 'typescript' }, { name: 'javascript' }],
      tagToKey,
      keyToTag,
    );
    const newTags = ISetMapped.create<Tag, string>(
      [{ name: 'javascript' }, { name: 'react' }, { name: 'nextjs' }],
      tagToKey,
      keyToTag,
    );

    const diffResult = ISetMapped.diff(oldTags, newTags);

    console.log(
      'Deleted tags:',
      diffResult.deleted.toArray().map((t) => t.name),
    );
    // Output: Deleted tags: ["typescript"]

    console.log(
      'Added tags:',
      diffResult.added.toArray().map((t) => t.name),
    );
    // Output: Added tags: ["react", "nextjs"]
  });
});

describe('intersection', () => {
  test('JSDoc example', () => {
    type Permission = Readonly<{ id: string }>;
    const permToKey = (p: Permission): string => p.id;
    const keyToPerm = (id: string): Permission => ({ id });

    const userPermissions = ISetMapped.create<Permission, string>(
      [{ id: 'read' }, { id: 'write' }, { id: 'delete' }],
      permToKey,
      keyToPerm,
    );
    const rolePermissions = ISetMapped.create<Permission, string>(
      [{ id: 'read' }, { id: 'comment' }, { id: 'write' }],
      permToKey,
      keyToPerm,
    );

    const commonPermissions = ISetMapped.intersection(
      userPermissions,
      rolePermissions,
    );
    console.log(commonPermissions.toArray().map((p) => p.id)); // Output: ["read", "write"]
  });
});

describe('union', () => {
  test('JSDoc example', () => {
    type FeatureFlag = Readonly<{ flagName: string }>;
    const flagToKey = (f: FeatureFlag): string => f.flagName;
    const keyToFlag = (name: string): FeatureFlag => ({ flagName: name });

    const setA = ISetMapped.create<FeatureFlag, string>(
      [{ flagName: 'newUI' }, { flagName: 'betaFeature' }],
      flagToKey,
      keyToFlag,
    );
    const setB = ISetMapped.create<FeatureFlag, string>(
      [{ flagName: 'betaFeature' }, { flagName: 'darkMode' }],
      flagToKey,
      keyToFlag,
    );

    const combinedFlags = ISetMapped.union(setA, setB);
    // The order might vary as sets are unordered internally.
    console.log(
      combinedFlags
        .toArray()
        .map((f) => f.flagName)
        .sort(),
    );
    // Output: ["betaFeature", "darkMode", "newUI"]
  });
});
