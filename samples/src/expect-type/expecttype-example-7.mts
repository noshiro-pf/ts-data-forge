// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type Guarded<T> = { value: T; success: true } | { success: false };

const result: Guarded<string> = { value: 'ok', success: true };
expectType<typeof result, Guarded<string>>('<=');

