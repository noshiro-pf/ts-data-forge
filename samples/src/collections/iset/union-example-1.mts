// Example: src/collections/iset.mts
import { ISet } from 'ts-data-forge';

const set = ISet.create<string>(['a', 'b']);
const withC = set.add('c');

const summary = {
  hasA: withC.has('a'),
  size: withC.size,
  values: withC.toArray(),
};

// embed-sample-code-ignore-below
export { summary };
