// Example: src/array/array-utils.mts (maxBy)
import { Arr, Optional } from 'ts-data-forge';

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
] as const;

const oldest = Arr.maxBy(people, (person) => person.age);
const oldestName = Optional.unwrapOr(oldest, { name: 'Unknown', age: 0 }).name;

const summary = {
  oldest,
  oldestName,
  people,
};

// embed-sample-code-ignore-below
export { summary };
