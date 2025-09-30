// Example: src/collections/imap.mts
import { IMap, Optional } from 'ts-data-forge';

const map = IMap.create<string, number>([
  ['a', 1],
  ['b', 2],
]);

const updated = map.set('c', 3);
const value = Optional.unwrapOr(updated.get('b'), 0);

const summary = {
  hasC: updated.has('c'),
  size: updated.size,
  value,
  values: updated.toValuesArray(),
};

// embed-sample-code-ignore-below
export { summary };
