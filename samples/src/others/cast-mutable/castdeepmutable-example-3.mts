// Example: src/others/cast-mutable.mts (castDeepMutable)
// Type complexity with generics

import { castDeepMutable, castDeepReadonly } from 'ts-data-forge';

type DeepReadonlyUser = DeepReadonly<{
  id: number;
  profile: {
    settings: {
      preferences: string[];
    };
  };
}>;

function updateUserPreferences(user: DeepReadonlyUser, newPref: string) {
  // Create a mutable copy to work with
  const mutableUser = castDeepMutable(structuredClone(user));
  mutableUser.profile.settings.preferences.push(newPref);
  return castDeepReadonly(mutableUser);
}

export { updateUserPreferences };
export type { DeepReadonlyUser };
