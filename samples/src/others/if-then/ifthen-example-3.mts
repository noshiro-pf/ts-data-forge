// Example: src/others/if-then.mts (ifThen)
// Access control - "if admin then has all permissions"

import { ifThen } from 'ts-data-forge';

function checkPermission(user: User, permission: string): boolean {
  const isAdmin = user.role === 'admin';
  const hasPermission = user.permissions.includes(permission);

  // Admin must have all permissions
  return ifThen(isAdmin, hasPermission);
}

const adminUser = { role: 'admin', permissions: ['read', 'write'] };
checkPermission(adminUser, 'delete'); // false (admin without delete permission = invalid)

const regularUser = { role: 'user', permissions: ['read'] };
checkPermission(regularUser, 'delete'); // true (non-admin without permission is valid)

export { adminUser, checkPermission, regularUser };
