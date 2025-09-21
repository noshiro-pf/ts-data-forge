// Sample code extracted from src/others/cast-readonly.mts (castDeepReadonly)
// Protecting complex state objects

import { castDeepReadonly } from 'ts-data-forge';

interface AppState {
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
    items: Array<{ id: number; value: string }>;
  };
}

class StateManager {
  private state: AppState = initialState;

  getState(): DeepReadonly<AppState> {
    return castDeepReadonly(this.state);
  }

  // Mutations only allowed through specific methods
  updateTheme(theme: string) {
    this.state.user.profile.settings.theme = theme;
  }
}
