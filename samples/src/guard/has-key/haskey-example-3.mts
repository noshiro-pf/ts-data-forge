// Sample code extracted from src/guard/has-key.mts (hasKey)
// Type narrowing with union types:

import { hasKey } from 'ts-data-forge';

type UserPreferences =
  | { theme: 'dark'; notifications: boolean }
  | { theme: 'light' }
  | { autoSave: true; interval: number };

const preferences: UserPreferences = getPreferences();

if (hasKey(preferences, 'theme')) {
  // preferences is narrowed to the first two union members
  console.log(preferences.theme); // 'dark' | 'light'
}

if (hasKey(preferences, 'autoSave')) {
  // preferences is narrowed to the third union member
  console.log(preferences.interval); // number (we know this exists)
}

export { preferences };
export type { UserPreferences };
