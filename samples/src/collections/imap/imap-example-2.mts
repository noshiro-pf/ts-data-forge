// Sample code extracted from src/collections/imap.mts (IMap)
import { IMap } from 'ts-data-forge';

// Create an immutable map with initial data
let userPreferences = IMap.create<string, UserPreference>([
  ['theme', { value: 'dark', lastModified: Date.now() }],
  ['language', { value: 'en', lastModified: Date.now() }],
]);

console.log(userPreferences.get('theme').unwrapOr(defaultPreference));
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

// Type-safe operations with narrowing
const stringKeys = IMap.create<number | string, any>([
  [1, 'a'],
  ['b', 2],
]);
const onlyStringKeys = stringKeys.mapKeys((key) =>
  typeof key === 'string' ? key : key.toString(),
);

export { onlyStringKeys, stringKeys, updated, userPreferences, withTimestamps };
