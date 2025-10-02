// Example: src/collections/imap.mts
import { IMap, Optional } from 'ts-data-forge';

const map = IMap.create<string, number>([
  ['a', 1],
  ['b', 2],
]);

const updated = map.set('b', 3);
const value = Optional.unwrapOr(updated.get('a'), 0);

const summary = {
  hasA: updated.has('a'),
  size: updated.size,
  value,
  values: updated.toValuesArray(),
};

// embed-sample-code-ignore-below
export { summary };
