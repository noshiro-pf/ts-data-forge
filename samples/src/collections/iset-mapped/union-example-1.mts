// Example: src/collections/iset-mapped.mts
import { ISetMapped } from 'ts-data-forge';

type Key = Readonly<{ id: number }>;
const toKey = (value: Key) => value.id;
const fromKey = (id: number): Key => ({ id });

const set = ISetMapped.create(
  [{ id: 1 }, { id: 2 }, { id: 3 }] as const,
  toKey,
  fromKey,
);
const withoutTwo = set.delete({ id: 2 });

const summary = {
  hasThree: withoutTwo.has({ id: 3 }),
  size: withoutTwo.size,
  values: withoutTwo.toArray(),
};

// embed-sample-code-ignore-below
export { summary };
