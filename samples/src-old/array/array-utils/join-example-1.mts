// Example: src/array/array-utils.mts (join)
import { Arr, Result } from 'ts-data-forge';

const phrases = ['Hello', 'World'] as const;
const joined = Arr.join(phrases, ' ');
const joinedValue = Result.isOk(joined) ? joined.value : '';

const joinWithComma = Arr.join(', ');
const letters = joinWithComma(['a', 'b', 'c']);
const lettersValue = Result.isOk(letters) ? letters.value : '';

const summary = {
  joined,
  joinedValue,
  letters,
  lettersValue,
  phrases,
};

// embed-sample-code-ignore-below
export { joinWithComma, summary };
