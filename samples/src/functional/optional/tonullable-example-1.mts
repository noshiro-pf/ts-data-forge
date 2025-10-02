// Example: src/functional/optional.mts
import { Optional } from 'ts-data-forge';

const someNumber = Optional.some(5);
const empty = Optional.none;
const doubled = Optional.map(someNumber, (n) => n * 2);
const flatMapped = Optional.flatMap(someNumber, (n) =>
  Optional.some(n.toString()),
);
const filtered = Optional.filter(someNumber, (n) => n > 3);
const fallback = Optional.unwrapOr(empty, 0);
const zipped = Optional.zip(Optional.some('left'), Optional.some('right'));

const summary = {
  doubled,
  fallback,
  filtered,
  flatMapped,
  someNumber,
  zipped,
};

// embed-sample-code-ignore-below
export { summary };
