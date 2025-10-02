// Example: src/array/array-utils.mts (isArray)
import { Arr } from 'ts-data-forge';

const values = [1, 2, 3] as const;
const isArray = Arr.isArray(values);

const summary = {
  isArray,
  values,
};

// embed-sample-code-ignore-below
export { summary };
