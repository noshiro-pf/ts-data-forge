// Example: src/guard/is-record.mts
import { isRecord } from 'ts-data-forge';

const value: unknown = { id: 1 };
const record = isRecord(value) ? value : undefined;

const summary = {
  record,
};

// embed-sample-code-ignore-below
export { summary };

