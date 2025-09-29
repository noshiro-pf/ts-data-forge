// Example: src/array/array-utils.mts (at)
import { Arr, Optional } from 'ts-data-forge';

const fruits = ['apple', 'banana', 'cherry', 'date'] as const;
const empty: readonly string[] = [];

const first = Arr.at(fruits, 0);
const last = Arr.at(fruits, -1);
const missing = Arr.at(empty, 0);

const fallbackLast = Optional.unwrapOr(last, 'unknown');
const getSecond = Arr.at(1);
const second = Optional.unwrapOr(getSecond(fruits), 'unknown');

const summary = {
  fallbackLast,
  first,
  last,
  missing,
  second,
};

// embed-sample-code-ignore-below
export { fruits, summary };
