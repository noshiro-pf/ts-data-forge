// Example: src/functional/optional.mts (Optional.isOptional)
import { Optional } from 'ts-data-forge';

const maybeOptional = Optional.some('value');
const notOptional = { $$tag: 'ts-data-forge::Optional.some' };

assert.strictEqual(Optional.isOptional(maybeOptional), true);
assert.strictEqual(Optional.isOptional(notOptional), false);
