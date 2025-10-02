// Example: src/array/array-utils.mts (every)
import { Arr } from 'ts-data-forge';

const numbers = [2, 4, 6, 8] as const;
const allEven = Arr.every(numbers, (n) => n % 2 === 0);

const mixed: (string | number)[] = ['hello', 'world'];
const areAllStrings = Arr.every(
  mixed,
  (value): value is string => typeof value === 'string',
);
const uppercase = Arr.filter(
  mixed,
  (value): value is string => typeof value === 'string',
).map((value) => value.toUpperCase());

const data: unknown[] = ['a', 'b', 3];
const joined = Arr.every(
  data,
  (value): value is string => typeof value === 'string',
)
  ? data.join('')
  : undefined;

const empty: number[] = [];
const result2 = Arr.every(empty, (n) => n > 0);

const summary = {
  allEven,
  areAllStrings,
  data,
  empty,
  joined,
  mixed,
  numbers,
  result2,
  uppercase,
};

// embed-sample-code-ignore-below
export { summary };
