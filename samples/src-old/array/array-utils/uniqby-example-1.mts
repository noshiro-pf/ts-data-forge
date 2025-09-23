// Example: src/array/array-utils.mts (uniqBy)
import { Arr, expectType } from 'ts-data-forge';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alicia' }, // Duplicate id
] as const;

const uniqueUsers = Arr.uniqBy(users, (user) => user.id);

expectType<
  typeof uniqueUsers,
  NonEmptyArray<
    | Readonly<{ id: 1; name: 'Alice' }>
    | Readonly<{ id: 2; name: 'Bob' }>
    | Readonly<{ id: 1; name: 'Alicia' }>
  >
>('=');

assert.deepStrictEqual(uniqueUsers, [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);
