// Sample code extracted from src/functional/match.mts (match)
// Exhaustive matching (no default needed):

import { match } from 'ts-data-forge';

type Status = 'loading' | 'success' | 'error';
const status: Status = 'loading';

const message = match(status, {
  loading: 'Please wait...',
  success: 'Operation completed!',
  error: 'Something went wrong',
});
// Type: string
// Result: 'Please wait...'

export { message, status };
export type { Status };
