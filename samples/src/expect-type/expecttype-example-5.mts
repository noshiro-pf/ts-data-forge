// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type Id = { id: number };
type User = Id & { name: string };

expectType<User, Id>('<=');

const summary = {
  example: true,
};

// embed-sample-code-ignore-below
export { summary };
