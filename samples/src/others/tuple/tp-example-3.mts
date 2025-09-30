// Example: src/others/tuple.mts
import { tp } from 'ts-data-forge';

const point = tp(10, 20);
const labels = tp('alpha', 'beta', 'gamma');

const summary = {
  labels,
  point,
};

// embed-sample-code-ignore-below
export { summary };
