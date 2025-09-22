// Sample code extracted from src/functional/match.mts (match)
// Complex discriminated union handling:

import { match } from 'ts-data-forge';

type ApiResponse =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string };

const handleResponse = (response: ApiResponse) =>
  match(response.status, {
    loading: 'Please wait...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data',
  });

export { handleResponse };
export type { ApiResponse };
