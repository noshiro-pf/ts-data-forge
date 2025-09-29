// Example: src/expect-type.mts (expectType)
import { Optional, Result } from 'ts-data-forge';

// Optional type narrowing
const optional: Optional<number> = Optional.some(42);
if (Optional.isSome(optional)) {
  expectType<typeof optional, Optional.Some<number>>('<=');
}
if (Optional.isNone(optional)) {
  expectType<typeof optional, Optional.None>('<=');
}

// Result type validation
const result: Result<string, Error> = Result.ok('success');
expectType<typeof result, Result<string, Error>>('<=');

export { optional, result };
