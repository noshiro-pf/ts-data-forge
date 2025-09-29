// Example: src/others/memoize-function.mts (memoizeFunction)
// Object arguments with selective memoization

import { memoizeFunction } from 'ts-data-forge';

interface User {
  id: number;
  name: string;
  email: string;
  metadata?: Record<string, unknown>;
}

const fetchUserPermissions = async (user: User): Promise<string[]> => {
  console.log(`Fetching permissions for user ${user.id}`);
  const response = await api.get(`/permissions/${user.id}`);
  return response.data;
};

// Memoize based only on user ID, ignoring other fields
const memoizedFetchPermissions = memoizeFunction(
  fetchUserPermissions,
  (user) => user.id, // Only cache by ID
);

// For multiple identifying fields
const processUserData = (user: User, orgId: number): ProcessedData => {
  // Complex processing...
};

const memoizedProcess = memoizeFunction(
  processUserData,
  (user, orgId) => `${user.id}:${orgId}`, // Composite key with separator
);

export {
  fetchUserPermissions,
  memoizedFetchPermissions,
  memoizedProcess,
  processUserData,
};
export type { User };
