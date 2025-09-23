// Example: src/others/map-nullable.mts
import { mapNullable } from 'ts-data-forge';

const upper = mapNullable('hello', (value) => value.toUpperCase());
const lengthOrUndefined = mapNullable((value: string) => value.length)(
  undefined,
);

assert.strictEqual(lengthOrUndefined, undefined);
assert.strictEqual(upper, 'HELLO');
