// Sample code extracted from src/functional/optional.mts (none)
import { Optional } from 'ts-data-forge';

const emptyValue = Optional.none;
console.log(Optional.isNone(emptyValue)); // true
console.log(Optional.unwrapOr(emptyValue, 'default')); // "default"
