// Sample code extracted from src/functional/optional.mts (orElse)
import { Optional } from 'ts-data-forge';

const primary = Optional.none;
const fallback = Optional.some('default');
const result = Optional.orElse(primary, fallback);
console.log(Optional.unwrap(result)); // "default"
