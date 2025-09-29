// Example: src/collections/imap-mapped.mts (imap-mapped)
import { type IMapMapped } from 'ts-data-forge';

// Example with complex object keys
type UserId = { department: string; employeeId: number };

// Define transformation functions
const userIdToKey = (id: UserId): string => `${id.department}:${id.employeeId}`;
const keyToUserId = (key: string): UserId => {
  const [department, employeeId] = key.split(':');
  return { department, employeeId: Number(employeeId) };
};

declare const userMap: IMapMapped<UserId, UserProfile, string>;

// All operations work with the complex key type
const userId: UserId = { department: 'engineering', employeeId: 123 };
const hasUser = userMap.has(userId); // O(1)
const profile = userMap.get(userId).unwrapOr(defaultProfile); // O(1)
const updated = userMap.set(userId, newProfile); // O(1) - returns new IMapMapped

export { hasUser, keyToUserId, profile, updated, userId, userIdToKey, userMap };
export type { UserId };
