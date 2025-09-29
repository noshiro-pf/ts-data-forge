// Example: src/array/array-utils.mts (find)
import { Arr, Optional } from 'ts-data-forge';

const numbers = [1, 2, 3, 4, 5];
const firstEven = Arr.find(numbers, (x) => x % 2 === 0);
if (Optional.isSome(firstEven)) {
  console.log(firstEven.value); // 2
}

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];
const adult = Arr.find(users, (user) => user.age >= 30);
// Optional.Some({ id: 2, name: 'Bob', age: 30 })

export { adult, firstEven, numbers, users };
