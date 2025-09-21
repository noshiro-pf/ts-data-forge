// Sample code extracted from src/guard/is-non-null-object.mts (isNonNullObject)
// Basic usage with different value types:

import { isNonNullObject } from 'ts-data-forge';

isNonNullObject({}); // true (plain object)
isNonNullObject([]); // true (arrays are objects)
isNonNullObject(new Date()); // true (Date instance)
isNonNullObject(/regex/); // true (RegExp instance)
isNonNullObject(new Map()); // true (Map instance)
isNonNullObject(null); // false (null is not considered object here)
isNonNullObject(undefined); // false (primitive)
isNonNullObject('string'); // false (primitive)
isNonNullObject(42); // false (primitive)
isNonNullObject(true); // false (primitive)
isNonNullObject(() => {}); // false (functions are not objects in this context)
