// Example: src/guard/is-type.mts (isNullish)
import { isNullish } from 'ts-data-forge';

const values: (string | null | undefined)[] = ['Ada', null, undefined];

const nullishValues = values.filter(isNullish);

assert.deepStrictEqual(nullishValues, [null, undefined]);
