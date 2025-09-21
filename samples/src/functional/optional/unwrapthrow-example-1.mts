// Sample code extracted from src/functional/optional.mts (unwrapThrow)
import { Optional } from 'ts-data-forge';

const userInput = Optional.some(42);
console.log(Optional.unwrapThrow(userInput)); // 42

const empty = Optional.none;
try {
  Optional.unwrapThrow(empty); // throws Error
} catch (error) {
  console.log(error.message); // "`unwrapThrow()` has failed because it is `None`"
}
