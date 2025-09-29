// Example: src/object/object.mts (shallowEq)
import { Obj } from 'ts-data-forge';

// Basic usage with default Object.is equality
Obj.shallowEq({ x: 1, y: 2 }, { x: 1, y: 2 }); // true
Obj.shallowEq({ x: 1 }, { x: 1, y: 2 }); // false (different number of keys)
Obj.shallowEq({ x: 1 }, { x: 2 }); // false (different values)
Obj.shallowEq({}, {}); // true (both empty)

// String comparisons
Obj.shallowEq({ a: 'hello' }, { a: 'hello' }); // true
Obj.shallowEq({ a: 'hello' }, { a: 'world' }); // false

// Using custom equality function
const caseInsensitiveEq = (a: unknown, b: unknown) =>
  typeof a === 'string' && typeof b === 'string'
    ? a.toLowerCase() === b.toLowerCase()
    : a === b;

Obj.shallowEq({ name: 'ALICE' }, { name: 'alice' }, caseInsensitiveEq); // true

// Handling special values
Obj.shallowEq({ x: NaN }, { x: NaN }); // true (Object.is treats NaN === NaN)
Obj.shallowEq({ x: +0 }, { x: -0 }); // false (Object.is distinguishes +0 and -0)

export { caseInsensitiveEq };
