// Example: src/array/array-utils.mts (takeLast)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]

// Curried usage for pipe composition
const takeLast2 = Arr.takeLast(2);
const result = pipe([1, 2, 3, 4, 5]).map(takeLast2).value;
console.log(result); // [4, 5]

export { result, takeLast2 };
