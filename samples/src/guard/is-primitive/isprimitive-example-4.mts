// Example: src/guard/is-primitive.mts
import { isPrimitive } from 'ts-data-forge';

const primitives = ['text', 123, null, true];
const checks = primitives.map((item) => isPrimitive(item));

const summary = {
  checks,
  primitives,
};

// embed-sample-code-ignore-below
export { summary };
