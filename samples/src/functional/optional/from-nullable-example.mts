// Example: src/functional/optional.mts (Optional.fromNullable)
import { Optional } from 'ts-data-forge';

const present = Optional.fromNullable('hello');
const absent = Optional.fromNullable<string | null>(null);

assert.deepStrictEqual(present, Optional.some('hello'));
assert.deepStrictEqual(absent, Optional.none);
