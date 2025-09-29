// Example: src/others/cast-readonly.mts (castDeepReadonly)
// Protecting complex state objects

import { castDeepReadonly } from 'ts-data-forge';

type AppState = {
  user: {
    id: number;
    profile: {
      name: string;
      settings: {
        theme: string;
        notifications: boolean[];
      };
    };
  };
  data: {
    items: { id: number; value: string }[];
  };
}

class StateManager {
  private readonly state: AppState = initialState;

  getState(): DeepReadonly<AppState> {
    return castDeepReadonly(this.state);
  }

  // Mutations only allowed through specific methods
  updateTheme(theme: string) {
    this.state.user.profile.settings.theme = theme;
  }
}

export { StateManager };
export type { AppState };
