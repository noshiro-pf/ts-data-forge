// Example: src/guard/is-type.mts (isNonNullish)
// Progressive validation with optional chaining alternative:

import { isNonNullish } from 'ts-data-forge';

type User = {
  profile?: {
    name?: string;
    email?: string;
  };
}

const user: User = getUser();

// Instead of optional chaining: user.profile?.name
if (isNonNullish(user.profile) && isNonNullish(user.profile.name)) {
  // user.profile.name is now guaranteed to be string
  console.log('User name:', user.profile.name.toUpperCase());
}

export { user };
export type { User };
