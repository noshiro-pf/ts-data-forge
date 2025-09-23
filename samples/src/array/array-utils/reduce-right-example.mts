// Example: src/array/array-utils.mts (reduceRight)
import { Arr } from 'ts-data-forge';

const words = ['one', 'two', 'three'] as const;

const concatenated = Arr.reduceRight(
  words,
  (acc, value) => `${acc}:${value}`,
  'end',
);

assert.strictEqual(concatenated, 'one:two:three:end');
