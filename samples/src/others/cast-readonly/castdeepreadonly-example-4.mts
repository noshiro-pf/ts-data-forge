// Sample code extracted from src/others/cast-readonly.mts (castDeepReadonly)
// Working with Redux or state management

import { castDeepReadonly } from 'ts-data-forge';

// Redux reducer example
type State = DeepReadonly<AppState>;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      // Must create new objects, can't mutate
      return castDeepReadonly({
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            name: action.payload,
          },
        },
      });
    default:
      return state;
  }
}

export { reducer };
export type { State };
