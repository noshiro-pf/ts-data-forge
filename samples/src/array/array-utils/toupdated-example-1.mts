// Example: src/array/array-utils.mts (toUpdated)
import { Arr } from 'ts-data-forge';

const numbers = [10, 20, 30] as const;
const doubled = Arr.toUpdated(numbers, 1, (value) => value * 2);
const labels = Arr.toUpdated(numbers, 2, (value) => `value: ${value}`);

const users = [
  { id: 1, active: false },
  { id: 2, active: false },
] as const;

const activated = Arr.toUpdated(users, 1, (user) => ({ ...user, active: true }));

const summary = {
  activated,
  doubled,
  labels,
  numbers,
  users,
};

// embed-sample-code-ignore-below
export { summary };
