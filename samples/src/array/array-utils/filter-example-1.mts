// Example: src/array/array-utils.mts (filter)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3, 4, 5] as const;
const evens = Arr.filter(numbers, (n) => n % 2 === 0);

const mixed: (string | number | null)[] = ['hello', 42, null, 'world'];
const strings = Arr.filter(mixed, (x): x is string => typeof x === 'string');
const notNull = Arr.filter(mixed, (x): x is NonNullable<typeof x> => x != null);

const isString = (value: unknown): value is string => typeof value === 'string';
const stringValues = Arr.filter(['a', 1, 'b', 2], isString);

const processNumbers = (values: readonly number[]) =>
  Arr.map(Arr.filter(values, (n) => n > 0), (n) => n * 2);

const summary = {
  evens,
  mixed,
  notNull,
  numbers,
  processNumbers,
  stringValues,
  strings,
};

// embed-sample-code-ignore-below
export { isString, summary };
