// Example: src/collections/imap-mapped.mts
import { IMapMapped, Optional } from 'ts-data-forge';

type Key = Readonly<{ id: number }>;
const toKey = (value: Key) => value.id;
const fromKey = (id: number): Key => ({ id });

const map = IMapMapped.create(
  [
    [{ id: 1 }, 'Alice'],
    [{ id: 2 }, 'Bob'],
  ] as const,
  toKey,
  fromKey,
);

const summary = {
  hasOne: map.has({ id: 1 }),
  size: map.size,
  value: Optional.unwrapOr(map.get({ id: 1 }), 'Unknown'),
};

// embed-sample-code-ignore-below
export { summary };
