// Example: src/guard/key-is-in.mts
import { keyIsIn } from 'ts-data-forge';

const record = { a: 1, b: 2 } as const;
const key: string = 'a';
const isKey = keyIsIn(key, record);
const value = isKey ? record[key] : undefined;

const summary = {
  isKey,
  value,
};

// embed-sample-code-ignore-below
export { summary };
