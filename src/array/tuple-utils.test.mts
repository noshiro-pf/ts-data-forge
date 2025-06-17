import { expectType } from '../expect-type.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr.map', () => {
  const mapped = Arr.map([1, 2, 3], (x, i): number => x * x * i);

  expectType<typeof mapped, ArrayOfLength<3, number>>('=');

  test('case 1', () => {
    expect(mapped).toStrictEqual([0, 4, 18]);
  });

  test('should work with empty tuple', () => {
    const empty = [] as const;
    const mappedEmpty = Arr.map(empty, (x) => String(x));
    expectType<typeof mappedEmpty, readonly []>('=');
    expect(mappedEmpty).toStrictEqual([]);
  });

  test('should preserve tuple length with different types', () => {
    const mixed = [1, 'hello', true] as const;
    const mappedMixed = Arr.map(mixed, (x) => typeof x);
    expectType<typeof mappedMixed, readonly [string, string, string]>('<=');
    expect(mappedMixed).toStrictEqual(['number', 'string', 'boolean']);
  });

  test('should work with index parameter', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const mappedWithIndex = Arr.map(tuple, (x, i) => `${i}:${x}`);
    expectType<typeof mappedWithIndex, readonly [string, string, string]>('<=');
    expect(mappedWithIndex).toStrictEqual(['0:a', '1:b', '2:c']);
  });
});

describe('Arr.set', () => {
  const result = Arr.set([1, 2, 3], 1, 4);

  expectType<typeof result, readonly [1 | 4, 2 | 4, 3 | 4]>('=');

  test('case 1', () => {
    expect(result).toStrictEqual([1, 4, 3]);
  });

  test('should work with different value types', () => {
    const nums = [1, 2, 3] as const;
    const withString = Arr.set(nums, 1, 'two');
    expectType<typeof withString, readonly [1 | 'two', 2 | 'two', 3 | 'two']>(
      '=',
    );
    expect(withString).toStrictEqual([1, 'two', 3]);
  });

  test('should work at index 0', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const updated = Arr.set(tuple, 0, 'A');
    expect(updated).toStrictEqual(['A', 'b', 'c']);
  });

  test('should work at last index', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const updated = Arr.set(tuple, 2, 'C');
    expect(updated).toStrictEqual(['a', 'b', 'C']);
  });
});

describe('Arr.toReversed', () => {
  {
    const result = Arr.toReversed([1, 2, 3]);

    expectType<typeof result, readonly [3, 2, 1]>('=');

    test('case 1', () => {
      expect(result).toStrictEqual([3, 2, 1]);
    });
  }

  test('should work with empty tuple', () => {
    const empty = [] as const;
    const reversed = Arr.toReversed(empty);
    expectType<typeof reversed, readonly []>('=');
    expect(reversed).toStrictEqual([]);
  });

  test('should work with single element', () => {
    const single = [42] as const;
    const reversed = Arr.toReversed(single);
    expectType<typeof reversed, readonly [42]>('=');
    expect(reversed).toStrictEqual([42]);
  });

  test('should preserve mixed types in reverse order', () => {
    const mixed = [1, 'hello', true, null] as const;
    const reversed = Arr.toReversed(mixed);
    expectType<typeof reversed, readonly [null, true, 'hello', 1]>('=');
    expect(reversed).toStrictEqual([null, true, 'hello', 1]);
  });
});
