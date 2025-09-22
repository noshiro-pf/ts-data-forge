// Sample code extracted from src/array/array-utils.mts (maxBy)
import { Arr } from 'ts-data-forge';

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
Arr.maxBy([], (p) => p.age); // Optional.none

export { people };
