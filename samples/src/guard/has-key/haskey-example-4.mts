// Example: src/guard/has-key.mts
import { hasKey } from 'ts-data-forge';

const record = { a: 1, b: 2 } as const;
const hasA = hasKey(record, 'a');
const value = hasA ? record.a : undefined;

const summary = {
  hasA,
  value,
};

// embed-sample-code-ignore-below
export { summary };

