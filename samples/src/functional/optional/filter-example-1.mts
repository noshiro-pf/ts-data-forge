// Sample code extracted from src/functional/optional.mts (filter)
import { Optional } from 'ts-data-forge';

const someEven = Optional.some(4);
const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
console.log(Optional.unwrap(filtered)); // 4
