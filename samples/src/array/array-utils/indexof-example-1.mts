// Example: src/array/array-utils.mts (indexOf)
import { Arr, Optional, pipe } from 'ts-data-forge';

// Regular usage
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.indexOf(arr, 'b');
if (Optional.isSome(result)) {
  console.log(result.value); // 1 (branded as SizeType.Arr)
}

// Curried usage for pipe composition
const findB = Arr.indexOf('b');
const result2 = pipe(['a', 'b', 'c']).map(findB).value;
console.log(Optional.unwrapOr(result2, -1)); // 1

export { arr, findB, result, result2 };
