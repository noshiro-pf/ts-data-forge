// Example: src/number/enum/uint8.mts (Uint8.min)
import { Uint8 } from 'ts-data-forge';

const smallest = Uint8.min(50, 30, 100);
const withBounds = Uint8.min(0, Uint8.MAX_VALUE);

// embed-sample-code-ignore-below
export { smallest, withBounds };
