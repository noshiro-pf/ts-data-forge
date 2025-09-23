// Example: src/others/unknown-to-string.mts
import { unknownToString } from 'ts-data-forge';

const numberText = unknownToString(42);
const objectText = unknownToString(
  { id: 1, name: 'Ada' },
  { prettyPrintObject: true },
);

assert.strictEqual(numberText, '42');
assert.strictEqual(
  objectText,
  `{
  "id": 1,
  "name": "Ada"
}`,
);
