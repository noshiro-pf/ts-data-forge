// Example: src/array/impl/array-utils-search.mts (lastIndexOf)
import { Arr } from 'ts-data-forge';

// embed-sample-code-ignore-above
const fruits = ['apple', 'banana', 'orange', 'banana'];

const lastBanana = Arr.lastIndexOf(fruits, 'banana');
const lastApple = Arr.lastIndexOf(fruits, 'apple');
const notFound = Arr.lastIndexOf(fruits, 'grape');

// Curried version
const findLastBanana = Arr.lastIndexOf('banana');
const index = findLastBanana(fruits);

console.log(lastBanana); // => 3
console.log(lastApple); // => 0
console.log(notFound); // => -1
console.log(index); // => 3
