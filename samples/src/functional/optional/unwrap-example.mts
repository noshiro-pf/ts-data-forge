// Example: src/functional/optional.mts (Optional.unwrap)
import { Optional } from 'ts-data-forge';

const someString = Optional.some('text');
const noneString = Optional.none as Optional<string>;

assert.strictEqual(Optional.unwrap(someString), 'text');
assert.strictEqual(Optional.unwrap(noneString), undefined);
