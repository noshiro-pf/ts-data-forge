// Example: src/array/array-utils.mts (generateAsync)
import { strict as assert } from 'node:assert/strict';

import { Arr } from 'ts-data-forge';

const nums: readonly number[] = await Arr.generateAsync<number>(
  async function* () {
    yield 1;
    await new Promise((resolve) => setTimeout(resolve, 10));
    yield* [2, 3];
  },
);

assert.deepStrictEqual(nums, [1, 2, 3]);

// Type safety - prevents incorrect returns:
const nums2 = await Arr.generateAsync<number>(async function* () {
  yield 1;
  if (someCondition) {
    return; // OK - returning is allowed, but must be void
  }
  yield* [2, 3];
  // return 1; // NG - TypeScript error, cannot return T
});

export { nums, nums2 };
