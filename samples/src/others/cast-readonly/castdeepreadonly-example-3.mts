// Sample code extracted from src/others/cast-readonly.mts (castDeepReadonly)
// Creating immutable API responses

import { castDeepReadonly } from 'ts-data-forge';

async function fetchUserData(): Promise<DeepReadonly<UserData>> {
  const response = await api.get<UserData>('/user');

  // Process and validate data...

  // Return as deeply immutable to prevent accidental mutations
  return castDeepReadonly(response.data);
}

const userData = await fetchUserData();
// userData is fully protected from mutations at any depth
// userData.preferences.emails.push('new@email.com'); // ❌ TypeScript Error

export { fetchUserData, userData };
