// Example: src/guard/is-type.mts (isNotSymbol)
import { isNotSymbol } from 'ts-data-forge';

type PropertyKey = string | number | symbol;
const key: PropertyKey = getPropertyKey();

if (isNotSymbol(key)) {
  // key is now string | number
  console.log('Non-symbol key:', key);
}

export { key };
export type { PropertyKey };
