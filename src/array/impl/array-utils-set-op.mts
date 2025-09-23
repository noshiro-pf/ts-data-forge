/**
 * Checks if two arrays are equal by performing a shallow comparison of their
 * elements.
 *
 * @example
 *
 * ```ts
 * const subset = [1, 2] as const;
 * const superset = [1, 2, 3] as const;
 * const notSubset = [2, 4] as const;
 *
 * assert.ok(Arr.isSubset(subset, superset));
 * assert.notOk(Arr.isSubset(notSubset, superset));
 * ```
 *
 * @template E The type of elements in the arrays.
 * @param array1 The first array.
 * @param array2 The second array.
 * @param equality An optional function `(a: T, b: T) => boolean` to compare
 *   elements. Defaults to `Object.is`.
 * @returns `true` if the arrays have the same length and all corresponding
 *   elements are equal according to the `equality` function, `false`
 *   otherwise.
 */
export const eq = <E,>(
  array1: readonly E[],
  array2: readonly E[],
  equality: (a: E, b: E) => boolean = Object.is,
): boolean =>
  array1.length === array2.length &&
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  array1.every((v, i) => equality(v, array2[i]!));

/**
 * Alias for `eq`. Checks if two arrays are equal by performing a shallow
 * comparison of their elements.
 *
 * @see {@link eq}
 */
export const equal = eq;

/**
 * Checks if the first array (`array1`) is a subset of the second array
 * (`array2`). An array `A` is a subset of `B` if all elements of `A` are also
 * present in `B`. Elements must be primitive types for `includes` to work
 * reliably for comparison.
 *
 * @remarks
 *   `array1` ⊂ `array2`
 * @example
 *
 * ```ts
 * const potentialSuperset = ['a', 'b', 'c'] as const;
 * const subset = ['a', 'c'] as const;
 * const notSuperset = ['a', 'd'] as const;
 *
 * assert.ok(Arr.isSuperset(potentialSuperset, subset));
 * assert.notOk(Arr.isSuperset(subset, potentialSuperset));
 * assert.notOk(Arr.isSuperset(potentialSuperset, notSuperset));
 * ```
 *
 * @template E1 The type of elements in the first array (subset candidate),
 *   must be a primitive type.
 * @template E2 The type of elements in the second array (superset candidate),
 *   must be a primitive type.
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns `true` if `array1` is a subset of `array2`, `false` otherwise.
 */
export const isSubset = <E1 extends Primitive, E2 extends Primitive = E1>(
  array1: readonly E1[],
  array2: readonly E2[],
): boolean =>
  array1.every((a) =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array2.includes(a as E1 & E2),
  );

/**
 * Checks if the first array (`array1`) is a superset of the second array
 * (`array2`). An array `A` is a superset of `B` if all elements of `B` are
 * also present in `A`. Elements must be primitive types.
 *
 * @remarks
 *   `array1` ⊃ `array2`
 * @example
 *
 * ```ts
 * const refs = ['Ada', 'Alan', 'Grace'] as const;
 * const attendees = ['Grace', 'Alan', 'Barbara'] as const;
 *
 * const both = Arr.setIntersection(refs, attendees);
 *
 * assert.deepStrictEqual(both, ['Alan', 'Grace']);
 * ```
 *
 * @template E1 The type of elements in the first array (superset candidate),
 *   must be a primitive type.
 * @template E2 The type of elements in the second array (subset candidate),
 *   must be a primitive type.
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns `true` if `array1` is a superset of `array2`, `false` otherwise.
 */
export const isSuperset = <E1 extends Primitive, E2 extends Primitive = E1>(
  array1: readonly E1[],
  array2: readonly E2[],
): boolean => isSubset(array2, array1);

/**
 * Returns the intersection of two arrays of primitive types. The intersection
 * contains elements that are present in both arrays. Order is based on
 * `array1`.
 *
 * @example
 *
 * ```ts
 * const baseline = [1, 2, 3, 4] as const;
 * const removed = [2, 4] as const;
 *
 * const remaining = Arr.setDifference(baseline, removed);
 *
 * assert.deepStrictEqual(remaining, [1, 3]);
 * ```
 *
 * @template E1 The type of elements in the first array (must be a primitive
 *   type).
 * @template E2 The type of elements in the second array (must be a primitive
 *   type).
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns A new array containing elements that are in both `array1` and
 *   `array2`.
 */
export const setIntersection = <
  E1 extends Primitive,
  E2 extends Primitive = E1,
>(
  array1: readonly E1[],
  array2: readonly E2[],
): readonly (E1 & E2)[] =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  array1.filter((e) => array2.includes(e as E1 & E2)) as (E1 & E2)[];

/**
 * Returns the set difference of two arrays (`array1` - `array2`). The
 * difference contains elements that are in `array1` but not in `array2`.
 * Order is based on `array1`. Elements must be primitive types.
 *
 * @example
 *
 * ```ts
 * const upcoming = [1, 3, 5, 7, 9] as const;
 * const completed = [3, 4, 7] as const;
 *
 * const remaining = Arr.sortedNumSetDifference(upcoming, completed);
 *
 * const expected = [1, 5, 9] as const;
 *
 * assert.deepStrictEqual(remaining, expected);
 * ```
 *
 * @template E The type of elements in the arrays (must be a primitive type).
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns A new array containing elements from `array1` that are not in
 *   `array2`.
 */
export const setDifference = <E extends Primitive>(
  array1: readonly E[],
  array2: readonly E[],
): readonly E[] => array1.filter((e) => !array2.includes(e));

/**
 * Returns the set difference of two sorted arrays of numbers (`sortedList1` -
 * `sortedList2`). This operation is more efficient for sorted arrays than the
 * generic `setDifference`. The resulting array is also sorted.
 *
 * @example
 *
 * ```ts
 * const tags = ['alpha', 'beta', 'gamma'] as const;
 *
 * const entryList = Array.from(
 *   Arr.entries(tags),
 *   ([index, tag]) => [Number(index), tag] as const,
 * );
 *
 * assert.deepStrictEqual(
 *   entryList,
 *   Array.from([
 *     [0, 'alpha'],
 *     [1, 'beta'],
 *     [2, 'gamma'],
 *   ]),
 * );
 * ```
 *
 * @template E The type of numbers in the arrays (must extend `number`).
 * @param sortedList1 The first sorted array of numbers.
 * @param sortedList2 The second sorted array of numbers.
 * @returns A new sorted array containing numbers from `sortedList1` that are
 *   not in `sortedList2`.
 */
export const sortedNumSetDifference = <E extends number>(
  sortedList1: readonly E[],
  sortedList2: readonly E[],
): readonly E[] => {
  const mut_result: E[] = [];
  let mut_it1 = 0; // iterator for sortedList1
  let mut_it2 = 0; // iterator for sortedList2

  while (mut_it1 < sortedList1.length && mut_it2 < sortedList2.length) {
    // Non-null assertions are safe due to loop condition
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const val1 = sortedList1[mut_it1]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const val2 = sortedList2[mut_it2]!;

    if (val1 === val2) {
      mut_it1 += 1;
      mut_it2 += 1;
    } else if (val1 < val2) {
      mut_result.push(val1);
      mut_it1 += 1;
    } else {
      // val1 > val2
      mut_it2 += 1;
    }
  }
  // Add remaining elements from sortedList1
  for (; mut_it1 < sortedList1.length; mut_it1 += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    mut_result.push(sortedList1[mut_it1]!);
  }

  return mut_result;
};
