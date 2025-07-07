import { expectType } from './expect-type.mjs';

describe('expectType', () => {
  test('JSDoc example 1', () => {
    // Primitive type equality
    expectType<string, string>('='); // ✓ exact match
    expectType<number, string>('!='); // ✓ different types
    expectType<42, number>('<='); // ✓ literal extends primitive
    expectType<number, 42>('>='); // ✓ primitive is supertype

    // Type assertions will cause compilation errors for wrong relationships:
    // expectType<string, number>("=");        // ❌ TypeScript error
    // expectType<number, string>("<=");       // ❌ TypeScript error
  });

  test('JSDoc example 2', () => {
    // Testing array utility function return types (simulated)
    const zeros = [0, 0, 0] as const;
    expectType<typeof zeros, readonly [0, 0, 0]>('=');

    const sequence = [0, 1, 2, 3, 4] as const;
    expectType<typeof sequence, readonly [0, 1, 2, 3, 4]>('=');

    // Dynamic length arrays
    const dynamicArray: readonly 0[] = [0, 0, 0];
    expectType<typeof dynamicArray, readonly 0[]>('=');
  });

  test('JSDoc example 3', () => {
    // Testing function return types
    const createUser = () => ({ id: 1, name: 'John' });
    expectType<ReturnType<typeof createUser>, { id: number; name: string }>(
      '~=',
    );

    // Generic function type inference
    const identity = <T,>(x: T): T => x;
    const result = identity('hello');
    expectType<typeof result, string>('=');
  });

  test('JSDoc example 4', () => {
    // Union type relationships
    expectType<string, string | number>('<='); // string extends union
    expectType<string | number, string>('>='); // union contains string
    expectType<string | number, number>('>='); // union contains number

    // Intersection type relationships
    type A = { a: number };
    type B = { b: string };
    expectType<A & B, A>('>='); // intersection extends component
    expectType<A, A & B>('<='); // component extends intersection
  });

  test('JSDoc example 5', () => {
    // Testing branded number types - example with simulated types
    expectType<PositiveInt, number>('<='); // branded type extends base
    expectType<number, PositiveInt>('>='); // base type is supertype
    expectType<PositiveInt, NegativeInt>('!='); // different branded types
  });

  test('JSDoc example 6', () => {
    // Type narrowing examples (requires external types)
    type OptionalNumber = { tag: 'some'; value: number } | { tag: 'none' };
    const optional: OptionalNumber = { tag: 'some', value: 42 };
    if (optional.tag === 'some') {
      expectType<typeof optional, { tag: 'some'; value: number }>('<=');
    }
  });

  test('JSDoc example 7', () => {
    // Testing compile-time type predicates
    const obj = { key: 'value' };
    expectType<typeof obj.key, string>('=');
  });

  test('JSDoc example 8', () => {
    // Example with simulated Arr.zeros function
    const result = [0, 0, 0] as const;

    // Compile-time type assertion
    expectType<typeof result, readonly [0, 0, 0]>('=');

    // Runtime behavior assertion
    assert(result.length === 3);
    assert(result[0] === 0);
  });

  test('JSDoc example 9', () => {
    // Type relationship validation - example with simulated types
    expectType<PositiveInt, Int>('<='); // positive is subset of int
    expectType<Int, FiniteNumber>('<='); // int is subset of finite
    expectType<FiniteNumber, number>('<='); // finite is subset of number

    // Verify mutual exclusion
    expectType<PositiveInt, NegativeInt>('!='); // different int types
    expectType<PositiveInt, NegativeInt>('!<='); // neither extends the other
    expectType<NegativeInt, PositiveInt>('!<=');
  });
});
