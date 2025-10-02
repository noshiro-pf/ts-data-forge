// Example: src/iterator/range.mts
import { range } from 'ts-data-forge';

const ascending = Array.from(range(0, 3));
const descending = Array.from(range(3, 0, -1));

const summary = {
  ascending,
  descending,
};

// embed-sample-code-ignore-below
export { summary };
