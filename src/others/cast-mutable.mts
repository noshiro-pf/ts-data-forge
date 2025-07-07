/**
 * Casts a readonly type `T` to its `Mutable<T>` equivalent.
 *
 * **⚠️ Safety Warning**: This is a type assertion that bypasses TypeScript's immutability guarantees.
 * The runtime value remains unchanged - only the type system's view of it changes.
 * Use with caution as it can lead to unexpected mutations of data that was intended to be immutable.
 *
 * @template T - The type of the readonly value
 * @param readonlyValue - The readonly value to cast to mutable
 * @returns The same value with readonly modifiers removed from its type
 *
 * @example Basic usage with arrays and objects
 * ```ts
 * const readonlyArr: readonly number[] = [1, 2, 3];
 * const mutableArr = castMutable(readonlyArr);
 * mutableArr.push(4); // Now allowed by TypeScript
 * assert(mutableArr.length === 4);
 *
 * const readonlyObj: { readonly x: number } = { x: 1 };
 * const mutableObj = castMutable(readonlyObj);
 * mutableObj.x = 2; // Now allowed by TypeScript
 * assert(mutableObj.x === 2);
 * ```
 *
 * @example When to use - Working with third-party APIs
 * ```ts
 * // Some APIs require mutable arrays but you have readonly data
 * const readonlyData: readonly string[] = ['a', 'b', 'c'];
 * const sortedData = castMutable([...readonlyData]); // Create a copy first!
 * sortedData.sort(); // API mutates the array
 * assert(sortedData[0] === 'a');
 * ```
 *
 * @example Anti-pattern - Avoid mutating shared data
 * ```ts
 * // ❌ Bad: Mutating data that other code expects to be immutable
 * type Config = { readonly apiKey: string };
 * const sharedConfig: Readonly<Config> = { apiKey: 'original-key' };
 * const mutable = castMutable(sharedConfig);
 * mutable.apiKey = 'new-key'; // Dangerous! Other code expects this to be immutable
 * assert(mutable.apiKey === 'new-key');
 *
 * // ✅ Good: Create a copy if you need to mutate
 * const configCopy = castMutable({ ...sharedConfig });
 * configCopy.apiKey = 'newer-key'; // Safe - operating on a copy
 * assert(configCopy.apiKey === 'newer-key');
 * ```
 *
 * @see castDeepMutable - For deeply nested readonly structures
 * @see castReadonly - For the opposite operation
 */
export const castMutable = <T,>(readonlyValue: T): Mutable<T> =>
  readonlyValue as Mutable<T>;

/**
 * Casts a readonly type `T` to its `DeepMutable<T>` equivalent, recursively removing all readonly modifiers.
 *
 * **⚠️ Safety Warning**: This recursively bypasses ALL immutability guarantees in nested structures.
 * Extremely dangerous for complex data structures as it allows mutation at any depth.
 * The runtime value is unchanged - only TypeScript's type checking is affected.
 *
 * @template T - The type of the deeply readonly value
 * @param readonlyValue - The deeply readonly value to cast to deeply mutable
 * @returns The same value with all readonly modifiers recursively removed from its type
 *
 * @example Basic usage with nested structures
 * ```ts
 * const readonlyNested: {
 *   readonly a: { readonly b: readonly number[] }
 * } = { a: { b: [1, 2, 3] } };
 *
 * const mutableNested = castDeepMutable(readonlyNested);
 * mutableNested.a.b.push(4); // Mutations allowed at all levels
 * mutableNested.a = { b: [5, 6] }; // Can replace entire objects
 * mutableNested.a.b[0] = 99; // Can mutate array elements
 * ```
 *
 * @example Practical use case - Working with immutable state updates
 * ```ts
 * // When you need to perform multiple mutations before creating new immutable state
 * type AppState = { readonly users: readonly string[]; readonly settings: { readonly theme: string } };
 * const currentState: DeepReadonly<AppState> = { users: ['alice'], settings: { theme: 'light' } };
 * const draft = castDeepMutable(structuredClone(currentState)); // Clone first!
 *
 * // Perform multiple mutations on the draft
 * draft.users.push('bob');
 * draft.settings.theme = 'dark';
 * assert(draft.users.length === 2);
 * assert(draft.settings.theme === 'dark');
 * ```
 *
 * @example Type complexity with generics
 * ```ts
 * type DeepReadonlyUser = DeepReadonly<{
 *   id: number;
 *   profile: {
 *     settings: {
 *       preferences: string[];
 *     };
 *   };
 * }>;
 *
 * function updateUserPreferences(user: DeepReadonlyUser, newPref: string): DeepReadonlyUser {
 *   // Create a mutable copy to work with
 *   const mutableUser = castDeepMutable(structuredClone(user));
 *   mutableUser.profile.settings.preferences.push(newPref);
 *   return castDeepReadonly(mutableUser);
 * }
 *
 * // Test the function
 * const testUser: DeepReadonlyUser = {
 *   id: 1,
 *   profile: { settings: { preferences: ['dark-mode'] } }
 * };
 * const updatedUser = updateUserPreferences(testUser, 'notifications');
 * assert(updatedUser.profile.settings.preferences.length === 2);
 * assert(updatedUser.profile.settings.preferences[1] === 'notifications');
 * ```
 *
 * @see castMutable - For shallow mutability casting
 * @see castDeepReadonly - For the opposite operation
 * @see structuredClone - Recommended for creating safe copies before mutation
 */
export const castDeepMutable = <T,>(readonlyValue: T): DeepMutable<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  readonlyValue as DeepMutable<T>;
