// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

const tuple = [1, 'two', true] as const;
expectType<typeof tuple, readonly [1, 'two', true]>('=');

assert.deepStrictEqual(tuple, [1, 'two', true]);
