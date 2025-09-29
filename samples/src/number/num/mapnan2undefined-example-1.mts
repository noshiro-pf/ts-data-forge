// Example: src/number/num.mts (mapNaN2Undefined)
import { Num } from 'ts-data-forge';

const valid = Num.mapNaN2Undefined(42);
const missing = Num.mapNaN2Undefined(Number.NaN);

const summary = {
  missing,
  valid,
};

// embed-sample-code-ignore-below
export { summary };
