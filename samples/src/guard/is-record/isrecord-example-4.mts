// Sample code extracted from src/guard/is-record.mts (isRecord)
// Progressive validation of nested structures:

import { hasKey, isRecord, isString } from 'ts-data-forge';

interface User {
  id: string;
  profile: {
    name: string;
    email: string;
  };
}

function validateUser(data: unknown): User | null {
  if (!isRecord(data)) {
    return null;
  }

  // data is now UnknownRecord
  if (!hasKey(data, 'id') || !isString(data.id)) {
    return null;
  }

  if (!hasKey(data, 'profile') || !isRecord(data.profile)) {
    return null;
  }

  const profile = data.profile;
  if (
    !hasKey(profile, 'name') ||
    !isString(profile.name) ||
    !hasKey(profile, 'email') ||
    !isString(profile.email)
  ) {
    return null;
  }

  return {
    id: data.id,
    profile: {
      name: profile.name,
      email: profile.email,
    },
  };
}
