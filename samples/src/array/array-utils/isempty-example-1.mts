// Example: src/array/array-utils.mts (isEmpty)
import { Arr } from 'ts-data-forge';

const emptyArray: readonly number[] = [];
const numbers = [1, 2, 3] as const;

const emptyCheck = Arr.isEmpty(emptyArray);
const nonEmptyCheck = Arr.isEmpty(numbers);

const describe = (values: readonly number[]) =>
  Arr.isEmpty(values) ? 'empty' : `size=${values.length}`;

const summary = {
  describeEmpty: describe(emptyArray),
  describeNumbers: describe(numbers),
  emptyArray,
  emptyCheck,
  nonEmptyCheck,
};

// embed-sample-code-ignore-below
export { summary };
