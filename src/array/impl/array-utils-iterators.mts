import { asUint32 } from '../../number/index.mjs';

export const entries = function* <E>(
  array: readonly E[],
): ArrayIterator<readonly [SizeType.Arr, E]> {
  for (const [index, value] of array.entries()) {
    yield [asUint32(index), value] as const;
  }
};

export const values = function* <E>(array: readonly E[]): ArrayIterator<E> {
  for (const value of array.values()) {
    yield value;
  }
};

export const indices = function* <E>(
  array: readonly E[],
): ArrayIterator<SizeType.Arr> {
  for (const key of array.keys()) {
    yield asUint32(key);
  }
};

export const keys = indices;
