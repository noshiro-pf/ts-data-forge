// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const userResult: Result<{ id: number; name: string }> = {
  ok: true,
  value: { id: 1, name: 'John' },
};

expectType<typeof userResult, Result<{ id: number; name: string }>>('<=');

