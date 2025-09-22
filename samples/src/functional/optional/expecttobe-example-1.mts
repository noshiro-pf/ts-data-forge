// Sample code extracted from src/functional/optional.mts (expectToBe)
import { Optional } from 'ts-data-forge';

const some = Optional.some(42);
const value = Optional.expectToBe(some, 'Value must exist');
console.log(value); // 42

export { some, value };
