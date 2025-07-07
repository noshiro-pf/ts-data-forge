/**
 * Compile-time type assertion utility for TypeScript type testing.
 *
 * This function performs static type relationship checking at compile-time and has no runtime effect.
 * It is primarily used in test files to verify that TypeScript's type inference and type relationships
 * work as expected. The function will cause TypeScript compilation errors if the specified type
 * relationship does not hold.
 *
 * ## Supported Type Relations
 *
 * ### Equality Relations
 * - **`"="` (strict equality)**: Asserts that types `A` and `B` are exactly the same type.
 *   Uses TypeScript's internal type equality checking.
 * - **`"!="` (strict inequality)**: Asserts that types `A` and `B` are not exactly the same type.
 *
 * ### Assignability Relations
 * - **`"~="` (mutual assignability)**: Asserts that `A` extends `B` AND `B` extends `A`.
 *   Types are structurally equivalent and mutually assignable.
 * - **`"<="` (subtype relation)**: Asserts that type `A` extends (is assignable to) type `B`.
 *   Type `A` is a subtype of `B`.
 * - **`">="` (supertype relation)**: Asserts that type `B` extends (is assignable to) type `A`.
 *   Type `A` is a supertype of `B`.
 *
 * ### Negative Assignability Relations
 * - **`"!<="` (not subtype)**: Asserts that type `A` does NOT extend type `B`.
 * - **`"!>="` (not supertype)**: Asserts that type `B` does NOT extend type `A`.
 *
 * ## Type Parameter Constraints
 *
 * @template A - The first type for comparison. Can be any TypeScript type including:
 *   - Primitive types (string, number, boolean, etc.)
 *   - Object types and interfaces
 *   - Union and intersection types
 *   - Generic types and type parameters
 *   - Literal types and branded types
 *   - Function types and return types
 * @template B - The second type for comparison. Same constraints as type `A`.
 *
 * @param _relation - A string literal representing the expected type relationship.
 *   TypeScript's type system automatically infers and restricts the available operators
 *   based on the actual relationship between types `A` and `B`. If an invalid relationship
 *   is specified, TypeScript will show a compilation error.
 *
 * ## Usage Patterns
 *
 * ### Basic Type Testing
 *
 * @example
 * ```ts
 * // Primitive type equality
 * expectType<string, string>('='); // ✓ exact match
 * expectType<number, string>('!='); // ✓ different types
 * expectType<42, number>('<='); // ✓ literal extends primitive
 * expectType<number, 42>('>='); // ✓ primitive is supertype
 *
 * // Type assertions will cause compilation errors for wrong relationships:
 * // expectType<string, number>("=");        // ❌ TypeScript error
 * // expectType<number, string>("<=");       // ❌ TypeScript error
 * ```
 *
 * @example
 * ```ts
 * // Testing array utility function return types (simulated)
 * const zeros = [0, 0, 0] as const;
 * expectType<typeof zeros, readonly [0, 0, 0]>('=');
 *
 * const sequence = [0, 1, 2, 3, 4] as const;
 * expectType<typeof sequence, readonly [0, 1, 2, 3, 4]>('=');
 *
 * // Dynamic length arrays
 * const dynamicArray: readonly 0[] = [0, 0, 0];
 * expectType<typeof dynamicArray, readonly 0[]>('=');
 * ```
 *
 * @example
 * ```ts
 * // Testing function return types
 * const createUser = () => ({ id: 1, name: 'John' });
 * expectType<ReturnType<typeof createUser>, { id: number; name: string }>(
 *   '~=',
 * );
 *
 * // Generic function type inference
 * const identity = <T,>(x: T): T => x;
 * const result = identity('hello');
 * expectType<typeof result, string>('=');
 * ```
 *
 * @example
 * ```ts
 * // Union type relationships
 * expectType<string, string | number>('<='); // string extends union
 * expectType<string | number, string>('>='); // union contains string
 * expectType<string | number, number>('>='); // union contains number
 *
 * // Intersection type relationships
 * type A = { a: number };
 * type B = { b: string };
 * expectType<A & B, A>('>='); // intersection extends component
 * expectType<A, A & B>('<='); // component extends intersection
 * ```
 *
 * @example
 * ```ts
 * // Testing branded number types - example with simulated types
 * expectType<PositiveInt, number>('<='); // branded type extends base
 * expectType<number, PositiveInt>('>='); // base type is supertype
 * expectType<PositiveInt, NegativeInt>('!='); // different branded types
 * ```
 *
 * @example
 * ```ts
 * // Type narrowing examples (requires external types)
 * type OptionalNumber = { tag: 'some'; value: number } | { tag: 'none' };
 * const optional: OptionalNumber = { tag: 'some', value: 42 };
 * if (optional.tag === 'some') {
 *   expectType<typeof optional, { tag: 'some'; value: number }>('<=');
 * }
 * ```
 *
 * @example
 * ```ts
 * // Testing compile-time type predicates
 * const obj = { key: 'value' };
 * expectType<typeof obj.key, string>('=');
 * ```
 *
 * @example
 * ```ts
 * // Example with simulated Arr.zeros function
 * const result = [0, 0, 0] as const;
 *
 * // Compile-time type assertion
 * expectType<typeof result, readonly [0, 0, 0]>('=');
 *
 * // Runtime behavior assertion
 * assert(result.length === 3);
 * assert(result[0] === 0);
 * ```
 *
 * @example
 * ```ts
 * // Type relationship validation - example with simulated types
 * expectType<PositiveInt, Int>('<='); // positive is subset of int
 * expectType<Int, FiniteNumber>('<='); // int is subset of finite
 * expectType<FiniteNumber, number>('<='); // finite is subset of number
 *
 * // Verify mutual exclusion
 * expectType<PositiveInt, NegativeInt>('!='); // different int types
 * expectType<PositiveInt, NegativeInt>('!<='); // neither extends the other
 * expectType<NegativeInt, PositiveInt>('!<=');
 * ```
 *
 */
export const expectType = <A, B>(
  _relation: TypeEq<A, B> extends true
    ? '<=' | '=' | '>=' | '~='
    :
        | '!='
        | (TypeExtends<A, B> extends true
            ? '<=' | (TypeExtends<B, A> extends true ? '>=' | '~=' : '!>=')
            : '!<=' | (TypeExtends<B, A> extends true ? '>=' : '!>=')),
): void => undefined;
