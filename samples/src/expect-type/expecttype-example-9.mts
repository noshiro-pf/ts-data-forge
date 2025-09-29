// Example: src/expect-type.mts (expectType)
import type { FiniteNumber, Int, PositiveInt } from 'ts-data-forge';

// Ensure proper type hierarchy
expectType<PositiveInt, Int>('<='); // positive is subset of int
expectType<Int, FiniteNumber>('<='); // int is subset of finite
expectType<FiniteNumber, number>('<='); // finite is subset of number

// Verify mutual exclusion
expectType<PositiveInt, NegativeInt>('!='); // different int types
expectType<PositiveInt, NegativeInt>('!<='); // neither extends the other
expectType<NegativeInt, PositiveInt>('!<=');
