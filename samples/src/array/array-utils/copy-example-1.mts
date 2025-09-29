// Example: src/array/array-utils.mts (copy)
import { Arr } from 'ts-data-forge';

const mutableOriginal = [1, 2, 3];
const mutableCopy = Arr.copy(mutableOriginal);
mutableCopy[0] = 99;

const readonlyOriginal = ['alpha', 'beta'] as const;
const readonlyCopy = Arr.copy(readonlyOriginal);

const records = [{ id: 1, name: 'Ada' }, { id: 2, name: 'Bea' }] as const;
const copiedRecords = Arr.copy(records);
const copiedNames = copiedRecords.map(({ name }) => name);

const snapshot = {
  mutableOriginal,
  mutableCopy,
  readonlyCopy,
  copiedNames,
};

// embed-sample-code-ignore-below
export { snapshot };
