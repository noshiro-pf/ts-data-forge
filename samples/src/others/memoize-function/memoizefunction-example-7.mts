// Example: src/others/memoize-function.mts (memoizeFunction)
// Anti-patterns to avoid

import { memoizeFunction } from 'ts-data-forge';

// ❌ Bad: Memoizing impure functions
const memoizedRandom = memoizeFunction(
  () => Math.random(),
  () => 'key', // Always returns cached random value!
);

// ❌ Bad: Memoizing functions with side effects
const memoizedLog = memoizeFunction(
  (msg: string) => {
    console.log(msg);
    return msg;
  },
  (msg) => msg, // Logs only on first call!
);

// ❌ Bad: Non-unique cache keys
const memoizedProcess = memoizeFunction(
  (user: User) => processUser(user),
  (user) => user.name, // Multiple users can have same name!
);

export { memoizedLog, memoizedProcess, memoizedRandom };
