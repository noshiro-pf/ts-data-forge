// Sample code extracted from src/functional/optional.mts (fromNullable)
import { Optional } from 'ts-data-forge';

const value: string | null = 'hello';
const optional = Optional.fromNullable(value);
console.log(Optional.unwrap(optional)); // "hello"

const nullValue: string | null = null;
const noneOptional = Optional.fromNullable(nullValue);
console.log(Optional.isNone(noneOptional)); // true
