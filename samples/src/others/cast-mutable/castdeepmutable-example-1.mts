// Sample code extracted from src/others/cast-mutable.mts (castDeepMutable)
// Basic usage with nested structures

import { castDeepMutable } from 'ts-data-forge';

const readonlyNested: {
  readonly a: { readonly b: readonly number[] };
} = { a: { b: [1, 2, 3] } };

const mutableNested = castDeepMutable(readonlyNested);
mutableNested.a.b.push(4); // Mutations allowed at all levels
mutableNested.a = { b: [5, 6] }; // Can replace entire objects
mutableNested.a.b[0] = 99; // Can mutate array elements

export { mutableNested, readonlyNested };
