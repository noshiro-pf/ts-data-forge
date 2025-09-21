// Sample code extracted from src/expect-type.mts (expectType)
import { expect } from 'vitest';

import { Arr } from 'ts-data-forge';

describe('Arr.zeros', () => {
  test('should create array of zeros with correct type', () => {
    const result = Arr.zeros(3);

    // Compile-time type assertion
    expectType<typeof result, readonly [0, 0, 0]>('=');

    // Runtime behavior assertion
    expect(result).toStrictEqual([0, 0, 0]);
  });
});
