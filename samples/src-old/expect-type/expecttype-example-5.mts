// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type Id = { id: number };
type User = Id & { name: string };

expectType<User, Id>('<=');

assert.strictEqual(true, true);
