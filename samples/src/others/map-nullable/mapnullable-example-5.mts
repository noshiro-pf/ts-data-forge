// Example: src/others/map-nullable.mts
import { mapNullable } from 'ts-data-forge';

const upper = mapNullable('hello', (value) => value.toUpperCase());
const lengthOrUndefined = mapNullable((value: string) => value.length)(
  undefined,
);

const summary = {
  lengthOrUndefined,
  upper,
};

// embed-sample-code-ignore-below
export { summary };
