import { castDeepReadonly } from '../index.mjs';
import { castDeepMutable, castMutable } from './cast-mutable.mjs';

describe('castMutable', () => {
  test('Basic usage with arrays and objects', () => {
    const readonlyArr: readonly number[] = [1, 2, 3];
    const mutableArr = castMutable(readonlyArr);
    mutableArr.push(4); // Now allowed by TypeScript
    assert(mutableArr.length === 4);

    const readonlyObj: { readonly x: number } = { x: 1 };
    const mutableObj = castMutable(readonlyObj);
    mutableObj.x = 2; // Now allowed by TypeScript
    assert(mutableObj.x === 2);
  });

  test('When to use - Working with third-party APIs', () => {
    // Some APIs require mutable arrays but you have readonly data
    const readonlyData: readonly string[] = ['a', 'b', 'c'];
    const sortedData = castMutable([...readonlyData]); // Create a copy first!
    sortedData.sort(); // API mutates the array
    assert(sortedData[0] === 'a');
  });

  test('Anti-pattern - Avoid mutating shared data', () => {
    // ❌ Bad: Mutating data that other code expects to be immutable
    type Config = { readonly apiKey: string };
    const sharedConfig: Readonly<Config> = { apiKey: 'original-key' };
    const mutable = castMutable(sharedConfig);
    mutable.apiKey = 'new-key'; // Dangerous! Other code expects this to be immutable
    assert(mutable.apiKey === 'new-key');

    // ✅ Good: Create a copy if you need to mutate
    const configCopy = castMutable({ ...sharedConfig });
    configCopy.apiKey = 'newer-key'; // Safe - operating on a copy
    assert(configCopy.apiKey === 'newer-key');
  });
});

describe('castDeepMutable', () => {
  test('Basic usage with nested structures', () => {
    const readonlyNested: {
      readonly a: { readonly b: readonly number[] };
    } = { a: { b: [1, 2, 3] } };

    const mutableNested = castDeepMutable(readonlyNested);
    mutableNested.a.b.push(4); // Mutations allowed at all levels
    mutableNested.a = { b: [5, 6] }; // Can replace entire objects
    mutableNested.a.b[0] = 99; // Can mutate array elements
  });

  test('Practical use case - Working with immutable state updates', () => {
    // When you need to perform multiple mutations before creating new immutable state
    type AppState = {
      readonly users: readonly string[];
      readonly settings: { readonly theme: string };
    };
    const currentState: DeepReadonly<AppState> = {
      users: ['alice'],
      settings: { theme: 'light' },
    };
    const draft = castDeepMutable(structuredClone(currentState)); // Clone first!

    // Perform multiple mutations on the draft
    draft.users.push('bob');
    draft.settings.theme = 'dark';
    assert(draft.users.length === 2);
    assert(draft.settings.theme === 'dark');
  });

  test('Type complexity with generics', () => {
    type DeepReadonlyUser = DeepReadonly<{
      id: number;
      profile: {
        settings: {
          preferences: string[];
        };
      };
    }>;

    function updateUserPreferences(
      user: DeepReadonlyUser,
      newPref: string,
    ): DeepReadonlyUser {
      // Create a mutable copy to work with
      const mutableUser = castDeepMutable(structuredClone(user));
      mutableUser.profile.settings.preferences.push(newPref);
      return castDeepReadonly(mutableUser);
    }

    // Test the function
    const testUser: DeepReadonlyUser = {
      id: 1,
      profile: { settings: { preferences: ['dark-mode'] } },
    };
    const updatedUser = updateUserPreferences(testUser, 'notifications');
    assert(updatedUser.profile.settings.preferences.length === 2);
    assert(updatedUser.profile.settings.preferences[1] === 'notifications');
  });
});
