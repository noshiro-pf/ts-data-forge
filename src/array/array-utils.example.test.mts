import { Arr } from './array-utils.mjs';

describe('Array utils JSDoc examples', () => {
  test('Arr.generate example', () => {
    const nums = Arr.generate<number>(function* () {
      yield 1;
      yield* [2, 3];
    });
    // nums: readonly [1, 2, 3]

    // Type safety - prevents incorrect returns:
    const nums2 = Arr.generate<number>(function* () {
      yield 1;
      const someCondition = true;
      if (someCondition) {
        return; // OK - returning void
      }
      yield* [2, 3];
      // return 1; // NG - TypeScript error, cannot return T
    });
  });
});