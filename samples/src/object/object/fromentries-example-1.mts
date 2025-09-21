// Sample code extracted from src/object/object.mts (fromEntries)
import { Obj } from 'ts-data-forge';

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
