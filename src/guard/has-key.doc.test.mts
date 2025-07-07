import { hasKey } from './has-key.mjs';

describe('hasKey', () => {
  test('Basic usage with known object structure:', () => {
    const obj = { a: 1, b: 'hello' };

    if (hasKey(obj, 'a')) {
      // obj is narrowed to guarantee 'a' exists
      assert(obj.a === 1); // TypeScript knows 'a' exists and is type number
    }

    if (hasKey(obj, 'c')) {
      assert(false); // This block won't execute at runtime
    } else {
      assert(true); // 'c' does not exist
    }

    assert(hasKey(obj, 'a') === true);
    assert(hasKey(obj, 'b') === true);
    assert(hasKey(obj, 'c') === false);
  });

  test('Working with dynamic objects and unknown keys:', () => {
    const dynamicObj: Record<string, unknown> = { x: 10, y: 20 };
    const userInput: string = 'x';

    if (hasKey(dynamicObj, userInput)) {
      // Safe to access the dynamic key
      const value = dynamicObj[userInput]; // Type: unknown
      assert(value === 10);
    } else {
      assert(false); // should not reach here
    }

    assert(hasKey(dynamicObj, 'x') === true);
    assert(hasKey(dynamicObj, 'z') === false);
  });

  test('Type narrowing with union types:', () => {
    type UserPreferences =
      | { theme: 'dark'; notifications: boolean }
      | { theme: 'light' }
      | { autoSave: true; interval: number };

    const preferences: UserPreferences = { theme: 'dark', notifications: true };

    if (hasKey(preferences, 'theme')) {
      // preferences is narrowed to the first two union members
      assert(preferences.theme === 'dark' || preferences.theme === 'light');
    }

    if (hasKey(preferences, 'autoSave')) {
      assert(false); // This won't execute for this example
    }
  });

  test('Basic usage with isRecord for progressive narrowing:', () => {
    const data: unknown = { user: { name: 'John', age: 30 } };

    // This example requires isRecord import - simplified for doctest
    if (typeof data === 'object' && data !== null && hasKey(data, 'user')) {
      // data is now Record<string, unknown> with guaranteed 'user' key
      const user = data.user;

      if (typeof user === 'object' && user !== null && hasKey(user, 'name')) {
        // Safely access nested properties
        assert(user.name === 'John');
      }
    }
  });
});
