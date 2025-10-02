// Example: src/array/array-utils.mts (countBy)
import { Arr } from 'ts-data-forge';

const values = [
  { type: 'fruit' },
  { type: 'fruit' },
  { type: 'vegetable' },
] as const;

const counted = Arr.countBy(values, ({ type }) => type);

const summary = {
  counted,
  values,
};

// embed-sample-code-ignore-below
export { summary };
