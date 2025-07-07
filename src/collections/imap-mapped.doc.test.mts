import { IMapMapped, Optional } from '../index.mjs';

describe('create', () => {
  test('JSDoc example 1', () => {
    // Example with complex object keys
    type UserId = { department: string; employeeId: number };
    type UserProfile = Readonly<{ name: string; role: string }>;
    declare const defaultProfile: UserProfile;
    declare const newProfile: UserProfile;

    // Define transformation functions
    const userIdToKey = (id: UserId): string =>
      `${id.department}:${id.employeeId}`;
    const keyToUserId = (key: string): UserId => {
      const [department, employeeId] = key.split(':');
      return { department, employeeId: Number(employeeId) };
    };

    const userMap = IMapMapped.create<UserId, UserProfile, string>(
      [
        [
          { department: 'engineering', employeeId: 123 },
          { name: 'Alice', role: 'Admin' },
        ],
      ],
      userIdToKey,
      keyToUserId,
    );

    // All operations work with the complex key type
    const userId: UserId = { department: 'engineering', employeeId: 123 };
    const hasUser = userMap.has(userId); // O(1)
    const profile = Optional.unwrapOr(userMap.get(userId), defaultProfile); // O(1)
    const updated = userMap.set(userId, newProfile); // O(1) - returns new IMapMapped

    // Use the variables to demonstrate functionality
    assert(typeof hasUser === 'boolean');
    assert(profile.name !== undefined);
    assert(updated.size >= userMap.size);
    console.log('Key transform:', userIdToKey(userId));
    console.log(
      'Reverse transform:',
      keyToUserId('engineering:123').department,
    );
  });

  test('JSDoc example 2', () => {
    // Example: Product catalog with composite keys
    type ProductKey = Readonly<{ brand: string; model: string; year: number }>;
    type Product = Readonly<{ name: string; price: number; inStock: boolean }>;
    const notFound: Product = { name: 'Not Found', price: 0, inStock: false };

    // Define bidirectional transformation functions
    const productKeyToString = (key: ProductKey): string =>
      `${key.brand}|${key.model}|${key.year}`;

    const stringToProductKey = (str: string): ProductKey => {
      const [brand, model, yearStr] = str.split('|');
      return { brand, model, year: Number(yearStr) };
    };

    // Create a map with complex keys
    let catalog = IMapMapped.create<ProductKey, Product, string>(
      [],
      productKeyToString,
      stringToProductKey,
    );

    // Use complex objects as keys naturally
    const toyotaCamry2023: ProductKey = {
      brand: 'Toyota',
      model: 'Camry',
      year: 2023,
    };
    const hondaAccord2022: ProductKey = {
      brand: 'Honda',
      model: 'Accord',
      year: 2022,
    };

    catalog = catalog
      .set(toyotaCamry2023, {
        name: 'Toyota Camry 2023',
        price: 28000,
        inStock: true,
      })
      .set(hondaAccord2022, {
        name: 'Honda Accord 2022',
        price: 26500,
        inStock: false,
      });

    // All operations work with the original key type
    console.log(Optional.unwrapOr(catalog.get(toyotaCamry2023), notFound).name);
    // Output: "Toyota Camry 2023"

    console.log(catalog.has(hondaAccord2022)); // Output: true
    console.log(catalog.size); // Output: 2

    // Iteration preserves original key types
    for (const [productKey, product] of catalog) {
      console.log(
        `${productKey.brand} ${productKey.model} (${productKey.year}): $${product.price}`,
      );
    }
    // Output:
    // Toyota Camry (2023): $28000
    // Honda Accord (2022): $26500

    // Functional transformations work seamlessly
    const discountedCatalog = catalog.map((product, key) => ({
      ...product,
      price: Math.round(product.price * 0.9), // 10% discount
    }));

    // Use the discounted catalog
    assert(discountedCatalog.size === 2);
  });

  test('JSDoc example 3', () => {
    // Example 1: Geographic coordinates as keys
    type Coordinate = { lat: number; lng: number };
    type LocationInfo = { name: string; population: number };

    const coordToString = (coord: Coordinate): string =>
      `${coord.lat},${coord.lng}`;
    const stringToCoord = (str: string): Coordinate => {
      const [lat, lng] = str.split(',').map(Number);
      return { lat, lng };
    };

    const locationMap = IMapMapped.create<Coordinate, LocationInfo, string>(
      [
        [
          { lat: 40.7128, lng: -74.006 },
          { name: 'New York', population: 8000000 },
        ],
        [
          { lat: 34.0522, lng: -118.2437 },
          { name: 'Los Angeles', population: 4000000 },
        ],
      ],
      coordToString,
      stringToCoord,
    );

    const nyCoord = { lat: 40.7128, lng: -74.006 };
    console.log(Optional.unwrap(locationMap.get(nyCoord)).name); // Output: "New York"

    // Example 2: Multi-part business keys
    type OrderId = Readonly<{
      customerId: string;
      year: number;
      orderNumber: number;
    }>;
    type Order = Readonly<{ amount: number; status: string }>;

    const orderIdToKey = (id: OrderId): string =>
      `${id.customerId}:${id.year}:${id.orderNumber}`;

    const keyToOrderId = (key: string): OrderId => {
      const [customerId, yearStr, orderNumStr] = key.split(':');
      return {
        customerId,
        year: Number(yearStr),
        orderNumber: Number(orderNumStr),
      };
    };

    const orderMap = IMapMapped.create<OrderId, Order, string>(
      [],
      orderIdToKey,
      keyToOrderId,
    );
    assert(orderMap.size === 0);

    // Example 3: Simple case with string keys (identity transformation)
    const simpleMap = IMapMapped.create<string, number, string>(
      [
        ['key1', 100],
        ['key2', 200],
      ],
      (s) => s, // identity function
      (s) => s, // identity function
    );
    assert(simpleMap.size === 2);

    // Example 4: From existing data structures
    const existingEntries = new Map([
      [
        { id: 1, type: 'user' },
        { name: 'Alice', active: true },
      ],
      [
        { id: 2, type: 'user' },
        { name: 'Bob', active: false },
      ],
    ]);

    type EntityKey = Readonly<{ id: number; type: string }>;
    type Entity = Readonly<{ name: string; active: boolean }>;
    const entityKeyToString = (key: EntityKey): string =>
      `${key.type}_${key.id}`;
    const stringToEntityKey = (str: string): EntityKey => {
      const [type, idStr] = str.split('_');
      return { type, id: Number(idStr) };
    };

    const entityMap = IMapMapped.create<EntityKey, Entity, string>(
      existingEntries,
      entityKeyToString,
      stringToEntityKey,
    );
    assert(entityMap.size === 2);
  });
});

describe('equal', () => {
  test('JSDoc example', () => {
    // Example with coordinate keys
    type Point = { x: number; y: number };
    const pointToString = (p: Point): string => `${p.x},${p.y}`;
    const stringToPoint = (s: string): Point => {
      const [x, y] = s.split(',').map(Number);
      return { x, y };
    };

    const map1 = IMapMapped.create<Point, string, string>(
      [
        [{ x: 1, y: 2 }, 'point1'],
        [{ x: 3, y: 4 }, 'point2'],
      ],
      pointToString,
      stringToPoint,
    );

    const map2 = IMapMapped.create<Point, string, string>(
      [
        [{ x: 1, y: 2 }, 'point1'],
        [{ x: 3, y: 4 }, 'point2'],
      ], // Same content
      pointToString,
      stringToPoint,
    );

    const map3 = IMapMapped.create<Point, string, string>(
      [
        [{ x: 1, y: 2 }, 'point1'],
        [{ x: 3, y: 4 }, 'different'],
      ], // Different value
      pointToString,
      stringToPoint,
    );

    console.log(IMapMapped.equal(map1, map2)); // true
    console.log(IMapMapped.equal(map1, map3)); // false (different value)

    // Order doesn't matter for equality
    const map4 = IMapMapped.create<Point, string, string>(
      [
        [{ x: 3, y: 4 }, 'point2'],
        [{ x: 1, y: 2 }, 'point1'],
      ], // Different order
      pointToString,
      stringToPoint,
    );

    console.log(IMapMapped.equal(map1, map4)); // true

    // Different transformation functions but same logical content
    const alternativePointToString = (p: Point): string => `(${p.x},${p.y})`; // Different format
    const alternativeStringToPoint = (s: string): Point => {
      const match = s.match(/\((\d+),(\d+)\)/);
      return { x: Number(match![1]), y: Number(match![2]) };
    };

    const map5 = IMapMapped.create<Point, string, string>(
      [
        [{ x: 1, y: 2 }, 'point1'],
        [{ x: 3, y: 4 }, 'point2'],
      ],
      alternativePointToString,
      alternativeStringToPoint,
    );

    // This would be false because the underlying mapped keys are different
    // even though the logical content is the same
    console.log(IMapMapped.equal(map1, map5)); // false

    // Empty maps
    const empty1 = IMapMapped.create<Point, string, string>(
      [],
      pointToString,
      stringToPoint,
    );
    const empty2 = IMapMapped.create<Point, string, string>(
      [],
      pointToString,
      stringToPoint,
    );
    console.log(IMapMapped.equal(empty1, empty2)); // true
  });
});
