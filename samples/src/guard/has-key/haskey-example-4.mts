// Sample code extracted from src/guard/has-key.mts (hasKey)
// Basic usage with isRecord for progressive narrowing:

import { hasKey, isRecord } from 'ts-data-forge';

const data: unknown = parseApiResponse();

if (isRecord(data) && hasKey(data, 'user')) {
  // data is now Record<string, unknown> with guaranteed 'user' key
  const user = data.user;

  if (isRecord(user) && hasKey(user, 'name')) {
    // Safely access nested properties
    console.log('User name:', user.name);
  }
}
