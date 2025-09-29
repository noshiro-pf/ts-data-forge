// Example: src/others/map-nullable.mts (mapNullable)
// Working with optional object properties

import { mapNullable } from 'ts-data-forge';

type User = {
  id: number;
  name?: string;
  email?: string;
}

function formatUserDisplay(user: User): string {
  const displayName =
    mapNullable(user.name, (name) => name.toUpperCase()) ?? 'Anonymous';
  const emailDomain = mapNullable(user.email, (email) => email.split('@')[1]);

  return `${displayName} ${emailDomain ? `(${emailDomain})` : ''}`;
}

formatUserDisplay({ id: 1, name: 'John', email: 'john@example.com' }); // "JOHN (example.com)"
formatUserDisplay({ id: 2 }); // "Anonymous "

export { formatUserDisplay };
export type { User };
