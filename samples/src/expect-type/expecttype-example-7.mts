// Sample code extracted from src/expect-type.mts (expectType)
import { hasKey, isRecord } from 'ts-data-forge';

// Testing type guard functions
if (isRecord(value)) {
  expectType<typeof value, UnknownRecord>('<=');
}

// Testing compile-time type predicates
const obj = { key: 'value' };
if (hasKey(obj, 'key')) {
  expectType<typeof obj.key, unknown>('<=');
}
