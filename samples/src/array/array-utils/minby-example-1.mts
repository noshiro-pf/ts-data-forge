// Example: src/array/array-utils.mts (minBy)
import { Arr, Optional } from 'ts-data-forge';

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
] as const;

const youngest = Arr.minBy(people, (person) => person.age);
const youngestName = Optional.unwrapOr(youngest, { name: 'Unknown', age: 0 }).name;

const summary = {
  people,
  youngest,
  youngestName,
};

// embed-sample-code-ignore-below
export { summary };
