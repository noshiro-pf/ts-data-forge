// Sample code extracted from src/array/array-utils.mts (lastIndexOf)
import { Arr, Optional, pipe } from 'ts-data-forge';

// Regular usage
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.lastIndexOf(arr, 'b');
if (Optional.isSome(result)) {
  console.log(result.value); // 3 (branded as SizeType.Arr)
}

// Curried usage for pipe composition
const findLastB = Arr.lastIndexOf('b');
const result2 = pipe(['a', 'b', 'c', 'b']).map(findLastB).value;
console.log(Optional.unwrapOr(result2, -1)); // 3

export { arr, findLastB, result, result2 };
