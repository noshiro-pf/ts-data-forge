// Example: src/guard/is-non-null-object.mts
import { isNonNullObject } from 'ts-data-forge';

const value: unknown = { id: 1 };
const isObject = isNonNullObject(value);

const summary = {
  isObject,
};

// embed-sample-code-ignore-below
export { summary };

