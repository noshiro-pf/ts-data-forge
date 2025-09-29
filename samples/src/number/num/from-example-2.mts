// Example: src/number/num.mts (from)
import { Num } from 'ts-data-forge';

const parsed = Num.from('123.45');
const invalid = Num.from('hello');

const summary = {
  invalid,
  parsed,
};

// embed-sample-code-ignore-below
export { summary };
