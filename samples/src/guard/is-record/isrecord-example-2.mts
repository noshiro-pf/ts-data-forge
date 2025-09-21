// Sample code extracted from src/guard/is-record.mts (isRecord)
// Type guard usage for safe property access:

import { hasKey, isRecord, isString } from 'ts-data-forge';

const apiResponse: unknown = await fetchUserData();

if (isRecord(apiResponse)) {
  // apiResponse is now typed as UnknownRecord
  console.log('Response keys:', Object.keys(apiResponse));

  // Safe to access properties (though values are still unknown)
  const userId = apiResponse.id; // Type: unknown
  const userName = apiResponse.name; // Type: unknown

  // You can combine with other type guards for further narrowing
  if (hasKey(apiResponse, 'id') && isString(apiResponse.id)) {
    console.log('User ID:', apiResponse.id); // Now safely typed as string
  }
} else {
  console.log('API response is not a valid object');
}
