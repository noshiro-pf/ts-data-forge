// Example: src/collections/iset-mapped.mts
import { ISetMapped } from 'ts-data-forge';

type Key = { id: number };
const toKey = (value: Key) => value.id;
const fromKey = (id: number): Key => ({ id });

const set = ISetMapped.create(
  [{ id: 1 }, { id: 2 }],
  toKey,
  fromKey,
);
const withThree = set.add({ id: 3 });

const summary = {
  hasTwo: withThree.has({ id: 2 }),
  size: withThree.size,
  values: withThree.toArray(),
};

// embed-sample-code-ignore-below
export { summary };
