// Example: src/functional/optional.mts (Optional.flatMap)
import { Optional } from 'ts-data-forge';

const parseNumber = (input: string): Optional<number> => {
  const parsed = Number.parseInt(input, 10);
  return Number.isNaN(parsed) ? Optional.none : Optional.some(parsed);
};

const parsed = Optional.flatMap(Optional.some('10'), parseNumber);

assert.deepStrictEqual(parsed, Optional.some(10));

const flatMapParse = Optional.flatMap(parseNumber);

assert.deepStrictEqual(flatMapParse(Optional.some('5')), Optional.some(5));
assert.deepStrictEqual(flatMapParse(Optional.some('invalid')), Optional.none);
