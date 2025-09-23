// Example: src/guard/has-key.mts (hasKey)
import { hasKey } from 'ts-data-forge';

const maybeUser: { id?: number; name?: string } = { id: 42 };

if (hasKey(maybeUser, 'id')) {
  // `maybeUser` is now known to have an `id` property.
  assert.strictEqual(maybeUser.id, 42);
} else {
  assert.fail('Expected the object to contain the id key.');
}
