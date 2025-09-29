// Example: src/array/array-utils.mts (join)
import { Arr, Result, pipe } from 'ts-data-forge';

// Regular usage
const arr = ['Hello', 'World'];
const result = Arr.join(arr, ' ');
if (Result.isOk(result)) {
  console.log(result.value); // "Hello World"
}

// Curried usage for pipe composition
const joinWithComma = Arr.join(',');
const result2 = pipe(['a', 'b', 'c']).map(joinWithComma).value;
console.log(Result.unwrapOr(result2, '')); // "a,b,c"

export { arr, joinWithComma, result, result2 };
