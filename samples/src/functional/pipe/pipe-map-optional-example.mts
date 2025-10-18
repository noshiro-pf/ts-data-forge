// Example: src/functional/pipe.mts (pipe mapOptional)
import { Optional, pipe } from 'ts-data-forge';

// embed-sample-code-ignore-above
const result = pipe(Optional.some(10))
  .mapOptional((value) => value * 2)
  .mapOptional((value) => value + 5);

assert.deepStrictEqual(result.value, Optional.some(25));

const empty = pipe(Optional.none as Optional<number>).mapOptional(
  (value) => value * 2,
);

assert.ok(Optional.isNone(empty.value));
