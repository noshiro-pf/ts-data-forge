// Sample code extracted from src/others/cast-mutable.mts (castDeepMutable)
// Practical use case - Working with immutable state updates

import { castDeepMutable, castDeepReadonly } from 'ts-data-forge';

// When you need to perform multiple mutations before creating new immutable state
const currentState: DeepReadonly<AppState> = getState();
const draft = castDeepMutable(structuredClone(currentState)); // Clone first!

// Perform multiple mutations on the draft
draft.users.push(newUser);
draft.settings.theme = 'dark';
draft.data.items[0].completed = true;

// Create new immutable state from the mutated draft
const newState = castDeepReadonly(draft);
setState(newState);
