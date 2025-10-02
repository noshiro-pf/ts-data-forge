// Example: src/collections/iset.mts
import { ISet } from 'ts-data-forge';

const set = ISet.create(['a', 'b', 'c']);
const removedB = set.delete('b');

const summary = {
  hasA: removedB.has('a'),
  size: removedB.size,
  values: removedB.toArray(),
};

// embed-sample-code-ignore-below
export { summary };
