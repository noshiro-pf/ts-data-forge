// Example: src/functional/match.mts
import { match } from 'ts-data-forge';

const status = match('success' as 'loading' | 'success' | 'error', {
  loading: 'Loading…',
  success: 'Completed',
  error: 'Failed',
});

assert.strictEqual(status, 'Completed');
