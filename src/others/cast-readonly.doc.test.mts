import { castDeepReadonly, castReadonly } from './cast-readonly.mjs';

describe('castReadonly', () => {
  test('Basic usage with arrays and objects', () => {
    const mutableArr: number[] = [1, 2, 3];
    const readonlyArr = castReadonly(mutableArr);
    // readonlyArr.push(4); // ❌ TypeScript Error: no 'push' on readonly array
    assert(readonlyArr.length === 3);

    const mutableObj = { x: 1, y: 2 };
    const readonlyObj = castReadonly(mutableObj);
    // readonlyObj.x = 5; // ❌ TypeScript Error: cannot assign to readonly property
    assert(readonlyObj.x === 1);
  });

  test('Protecting function return values', () => {
    // Prevent callers from mutating internal state
    const internalUsers = [{ id: 1, name: 'John' }];
    const getUsers = (): readonly typeof internalUsers => {
      return castReadonly(internalUsers); // Callers can't mutate the array
    };

    const users = getUsers();
    // users.push(newUser); // ❌ TypeScript prevents this
    assert(users.length === 1);
  });

  test('Creating immutable configurations', () => {
    // Start with mutable object for initialization
    const config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3,
    };

    // Validate and process config...

    // Export as readonly to prevent modifications
    const APP_CONFIG = castReadonly(config);
    // APP_CONFIG.timeout = 10000; // ❌ TypeScript Error
    assert(APP_CONFIG.timeout === 5000);
  });

  test('Working with array methods', () => {
    const numbers: number[] = [1, 2, 3, 4, 5];
    const readonlyNumbers = castReadonly(numbers);

    // Read operations still work
    const doubled = readonlyNumbers.map((n) => n * 2); // ✅ Returns new array
    const sum = readonlyNumbers.reduce((a, b) => a + b, 0); // ✅ Works
    const first = readonlyNumbers[0]; // ✅ Reading is allowed

    // Test the computed values
    assert(doubled.length === 5);
    assert(doubled[0] === 2);
    assert(sum === 15);
    assert(first === 1);

    // Mutations are prevented
    // readonlyNumbers[0] = 10; // ❌ TypeScript Error
    // readonlyNumbers.sort(); // ❌ TypeScript Error (sort mutates)
  });
});

describe('castDeepReadonly', () => {
  test('Basic usage with nested structures', () => {
    const mutableNested = {
      a: { b: [1, 2, 3] },
      c: { d: { e: 'value' } },
    };

    const readonlyNested = castDeepReadonly(mutableNested);
    // readonlyNested.a.b.push(4); // ❌ Error: readonly at all levels
    // readonlyNested.c.d.e = 'new'; // ❌ Error: readonly at all levels
    // readonlyNested.a = {}; // ❌ Error: cannot reassign readonly property
  });

  test('Protecting complex state objects', () => {
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
  });

  test('Creating immutable API responses', async () => {
    async function fetchUserData(): Promise<DeepReadonly<UserData>> {
      const response = await api.get<UserData>('/user');

      // Process and validate data...

      // Return as deeply immutable to prevent accidental mutations
      return castDeepReadonly(response.data);
    }

    const userData = await fetchUserData();
    // userData is fully protected from mutations at any depth
    // userData.preferences.emails.push('new@email.com'); // ❌ TypeScript Error
  });

  test('Working with Redux or state management', () => {
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
  });

  test('Type inference with generics', () => {
    function processData<T>(data: T): DeepReadonly<T> {
      // Perform processing...
      console.log('Processing:', data);

      // Return immutable version
      return castDeepReadonly(data);
    }

    const result = processData({ nested: { value: [1, 2, 3] } });
    // Type of result is DeepReadonly<{ nested: { value: number[] } }>
    assert(result.nested.value.length === 3);
    assert(result.nested.value[0] === 1);
  });
});
