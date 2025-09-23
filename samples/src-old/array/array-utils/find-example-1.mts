// Example: src/array/array-utils.mts (find)
import { Arr, Optional } from 'ts-data-forge';

const numbers = [1, 2, 3, 4, 5];
const firstEven = Arr.find(numbers, (x) => x % 2 === 0);
assert.ok(Optional.isSome(firstEven));
if (Optional.isSome(firstEven)) {
  assert.strictEqual(firstEven.value, 2);
}

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
] as const;

const adult = Arr.find(users, (user) => user.age >= 30);

assert.ok(Optional.isSome(adult));
if (Optional.isSome(adult)) {
  assert.strictEqual(adult.value.id, 2);
  assert.strictEqual(adult.value.name, 'Bob');
  assert.strictEqual(adult.value.age, 30);
}
