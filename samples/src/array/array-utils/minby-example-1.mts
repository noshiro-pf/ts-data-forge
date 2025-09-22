// Sample code extracted from src/array/array-utils.mts (minBy)
import { Arr } from 'ts-data-forge';

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
Arr.minBy([], (p) => p.age); // Optional.none

export { people };
