// Example: src/collections/imap-mapped.mts
import { IMapMapped, Optional } from 'ts-data-forge';

type Key = { id: number };
const toKey = (value: Key) => value.id;
const fromKey = (id: number): Key => ({ id });

const map = IMapMapped.create(
  [
    [{ id: 1 }, 'Alice'],
    [{ id: 2 }, 'Bob'],
  ],
  toKey,
  fromKey,
);

const summary = {
  hasAlice: map.has({ id: 1 }),
  names: map.toValuesArray(),
  size: map.size,
  value: Optional.unwrapOr(map.get({ id: 2 }), 'Unknown'),
};

// embed-sample-code-ignore-below
export { summary };
