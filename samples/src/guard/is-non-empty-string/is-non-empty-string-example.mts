// Example: src/guard/is-non-empty-string.mts (isNonEmptyString)
import { isNonEmptyString } from 'ts-data-forge';

const words: readonly (string | undefined)[] = [
  'Ada',
  undefined,
  '',
  'Lovelace',
] as const;

const nonEmpty = words.filter(isNonEmptyString);

assert.deepStrictEqual(nonEmpty, ['Ada', 'Lovelace']);
