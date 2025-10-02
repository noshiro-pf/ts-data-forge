// Example: src/others/unknown-to-string.mts
import { unknownToString } from 'ts-data-forge';

const numberText = unknownToString(42);
const objectText = unknownToString(
  { id: 1, name: 'Ada' },
  { prettyPrintObject: true },
);

const summary = {
  numberText,
  objectText,
};

// embed-sample-code-ignore-below
export { summary };
