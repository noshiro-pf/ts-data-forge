/**
 * Implements the logical implication (if-then) operator.
 *
 * Returns `true` if the antecedent is `false` or the consequent is `true`.
 * In logical terms: `antecedent → consequent` is equivalent to `¬antecedent ∨ consequent`.
 *
 * **Truth table:**
 * - `true → true` = `true` (valid implication)
 * - `true → false` = `false` (invalid implication)
 * - `false → true` = `true` (vacuously true)
 * - `false → false` = `true` (vacuously true)
 *
 * @param antecedent - The condition (if part)
 * @param consequent - The result that should hold if the condition is true (then part)
 * @returns `true` if the implication holds, `false` otherwise
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-2.mts|Sample code 2}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-3.mts|Sample code 3}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-4.mts|Sample code 4}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-5.mts|Sample code 5}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/if-then/ifthen-example-6.mts|Sample code 6}.
 */
export const ifThen = (antecedent: boolean, consequent: boolean): boolean =>
  !antecedent || consequent;
