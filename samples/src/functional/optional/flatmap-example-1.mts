// Sample code extracted from src/functional/optional.mts (flatMap)
import { Optional } from 'ts-data-forge';

const parseNumber = (s: string): Optional<number> => {
  const n = Number(s);
  return isNaN(n) ? Optional.none : Optional.some(n);
};

const result = Optional.flatMap(Optional.some('42'), parseNumber);
console.log(Optional.unwrap(result)); // 42

export { parseNumber, result };
