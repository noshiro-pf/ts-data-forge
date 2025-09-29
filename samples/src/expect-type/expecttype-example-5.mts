// Example: src/expect-type.mts (expectType)
import { expectType } from 'ts-data-forge';

import type { PositiveInt } from 'ts-data-forge';
import { isPositiveInt } from 'ts-data-forge';

// Testing branded number types
expectType<PositiveInt, number>('<='); // branded type extends base
expectType<number, PositiveInt>('>='); // base type is supertype
expectType<PositiveInt, NegativeInt>('!='); // different branded types

// Type guard function validation
if (isPositiveInt(value)) {
  expectType<typeof value, PositiveInt>('<=');
}
