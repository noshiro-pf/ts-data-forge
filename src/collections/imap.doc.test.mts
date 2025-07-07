import { IMap, Optional } from '../index.mjs';

describe('create', () => {
  test('JSDoc example 1', () => {
    const userMap = IMap.create<string, { name: string }>([
      ['alice', { name: 'Alice' }],
      ['bob', { name: 'Bob' }],
    ]);

    assert(userMap.has('alice'));
    const user = Optional.unwrapOr(userMap.get('alice'), { name: 'Unknown' });
    assert(user.name === 'Alice');

    const newMap = userMap.set('charlie', { name: 'Charlie' });
    assert(newMap.size === 3);
  });

  test('JSDoc example 2', () => {
    // Create an immutable map with initial data
    type UserPreference = { value: string; lastModified: number };
    const userPreferences = IMap.create<string, UserPreference>([
      ['theme', { value: 'dark', lastModified: Date.now() }],
      ['language', { value: 'en', lastModified: Date.now() }],
    ]);
    const defaultPreference = { value: 'default', lastModified: 0 };

    console.log(
      Optional.unwrapOr(userPreferences.get('theme'), defaultPreference),
    );
    console.log(userPreferences.size); // Output: 2

    // All operations return new instances - original is unchanged
    const updated = userPreferences
      .set('notifications', { value: true, lastModified: Date.now() })
      .update('theme', (pref) => ({ ...pref, value: 'light' }));

    console.log(userPreferences.has('notifications')); // false (original unchanged)
    console.log(updated.has('notifications')); // true (new instance)

    // Efficient iteration and transformation
    for (const [key, preference] of updated) {
      console.log(`${key}: ${preference.value}`);
    }

    // Functional transformations
    const withTimestamps = updated.map((pref, key) => ({
      ...pref,
      accessedAt: Date.now(),
    }));
    assert(withTimestamps.size === updated.size);

    // Type-safe operations with narrowing
    const stringKeys = IMap.create<number | string, any>([
      [1, 'a'],
      ['b', 2],
    ]);
    const onlyStringKeys = stringKeys.mapKeys((key) =>
      typeof key === 'string' ? key : key.toString(),
    );
    assert(onlyStringKeys.size === stringKeys.size);
  });

  test('JSDoc example 3', () => {
    // From array of tuples
    const userScores = IMap.create<string, number>([
      ['alice', 95],
      ['bob', 87],
      ['charlie', 92],
    ]);
    console.log(Optional.unwrap(userScores.get('alice'))); // Output: 95

    // From JavaScript Map
    const jsMap = new Map([
      ['config', { debug: true }],
      ['env', 'production'],
    ]);
    const config = IMap.create(jsMap);
    console.log(Optional.unwrap(config.get('env'))); // Output: "production"

    // From another IMap (creates a copy)
    const originalMap = IMap.create<string, boolean>([['enabled', true]]);
    const copiedMap = IMap.create(originalMap);
    console.log(Optional.unwrap(copiedMap.get('enabled'))); // Output: true

    // Empty map
    const emptyMap = IMap.create<string, number>([]);
    console.log(emptyMap.size); // Output: 0

    // From custom iterable
    function* generateEntries(): Generator<[string, number]> {
      for (let i = 0; i < 3; i++) {
        yield [`item${i}`, i * 10];
      }
    }
    const generatedMap = IMap.create(generateEntries());
    console.log(generatedMap.size); // Output: 3
  });
});

describe('equal', () => {
  test('JSDoc example', () => {
    // Basic equality comparison
    const preferences1 = IMap.create<string, boolean>([
      ['darkMode', true],
      ['notifications', false],
    ]);
    const preferences2 = IMap.create<string, boolean>([
      ['darkMode', true],
      ['notifications', false],
    ]);
    const preferences3 = IMap.create<string, boolean>([
      ['notifications', false],
      ['darkMode', true], // Order doesn't matter
    ]);

    console.log(IMap.equal(preferences1, preferences2)); // true
    console.log(IMap.equal(preferences1, preferences3)); // true (order doesn't matter)

    // Different values
    const preferences4 = IMap.create<string, boolean>([
      ['darkMode', false], // Different value
      ['notifications', false],
    ]);
    console.log(IMap.equal(preferences1, preferences4)); // false

    // Different keys
    const preferences5 = IMap.create<string, boolean>([
      ['darkMode', true],
      ['sounds', false], // Different key
    ]);
    console.log(IMap.equal(preferences1, preferences5)); // false

    // Empty maps
    const empty1 = IMap.create<string, number>([]);
    const empty2 = IMap.create<string, number>([]);
    console.log(IMap.equal(empty1, empty2)); // true

    // Note: For deep equality of object values, use a custom comparison
    type User = Readonly<{ name: string }>;
    const users1 = IMap.create<string, User>([['1', { name: 'Alice' }]]);
    const users2 = IMap.create<string, User>([['1', { name: 'Alice' }]]);
    console.log(IMap.equal(users1, users2)); // false (different object references)
  });
});
