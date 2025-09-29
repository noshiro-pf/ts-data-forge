// Example: src/array/array-utils.mts (isNonEmpty)
import { Arr } from 'ts-data-forge';

const numbers: readonly number[] = [1, 2, 3];
const empty: readonly number[] = [];

const numbersAreNonEmpty = Arr.isNonEmpty(numbers);
const emptyIsNonEmpty = Arr.isNonEmpty(empty);

const average = (values: readonly number[]) =>
  Arr.isNonEmpty(values) ? Arr.sum(values) / Arr.size(values) : 0;

const grouped = [[1, 2], [], [3, 4]] as const;
const nonEmptyGroups = grouped.filter(Arr.isNonEmpty);
const firstValues = nonEmptyGroups.map((group) => group[0]);

const summary = {
  averageOfNumbers: average(numbers),
  emptyIsNonEmpty,
  firstValues,
  nonEmptyGroups,
  numbersAreNonEmpty,
};

// embed-sample-code-ignore-below
export { summary };
