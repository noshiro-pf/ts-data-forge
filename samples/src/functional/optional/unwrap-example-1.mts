// Sample code extracted from src/functional/optional.mts (unwrap)
import { Optional } from 'ts-data-forge';

const some = Optional.some(42);
const value = Optional.unwrap(some); // 42

const none = Optional.none;
const result = Optional.unwrap(none); // undefined
