import { keyIsIn } from './key-is-in.mjs';

describe('keyIsIn', () => {
  test('Basic usage with known object structure:', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const userInput: string = 'a'; // Could be any string

    if (keyIsIn(userInput, obj)) {
      // userInput is now narrowed to 'a' | 'b' | 'c'
      const value = obj[userInput]; // Type-safe access, value is number
      assert(value === 1);
    } else {
      assert(false); // should not reach here
    }

    assert(keyIsIn('a', obj) === true);
    assert(keyIsIn('invalid', obj) === false);
  });

  test('Dynamic key validation for safe property access:', () => {
    const config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3,
    } as const;

    function getConfigValue(key: string): unknown {
      if (keyIsIn(key, config)) {
        // key is now narrowed to 'apiUrl' | 'timeout' | 'retries'
        return config[key]; // Safe access with proper typing
      }

      throw new Error(`Invalid config key: ${key}`);
    }

    // Usage
    const apiUrl = getConfigValue('apiUrl'); // Returns string
    const timeout = getConfigValue('timeout'); // Returns number
    // getConfigValue('invalid') would throw an error
  });

  test('Form field validation:', () => {
    interface FormData {
      name: string;
      email: string;
      age: number;
    }

    const formData: FormData = {
      name: 'John',
      email: 'john@example.com',
      age: 30,
    };
    const requiredFields: readonly string[] = ['name', 'email'] as const;

    function validateRequiredFields(data: FormData): string[] {
      const errors: string[] = [];

      for (const field of requiredFields) {
        if (keyIsIn(field, data)) {
          // field is now narrowed to keyof FormData
          const value = data[field];

          if (typeof value === 'string' && value.trim() === '') {
            errors.push(`${field} is required`);
          }
        }
      }

      return errors;
    }
  });

  test('Safe object property iteration:', () => {
    const userPreferences = {
      theme: 'dark',
      language: 'en',
      notifications: true,
    };

    const settingsToUpdate: string[] = ['theme', 'language'];

    function updatePreferences(updates: Record<string, unknown>) {
      const validUpdates: Partial<typeof userPreferences> = {};

      for (const [key, value] of Object.entries(updates)) {
        if (keyIsIn(key, userPreferences)) {
          // key is now narrowed to valid preference keys
          validUpdates[key] = value as (typeof userPreferences)[typeof key];
        } else {
          console.warn(`Unknown preference key: ${key}`);
        }
      }

      return { ...userPreferences, ...validUpdates };
    }
  });

  test('Comparison with hasKey() - different narrowing behavior:', () => {
    const obj = { x: 10, y: 20 };
    const key: string = 'x';

    // Using keyIsIn - narrows the key type
    if (keyIsIn(key, obj)) {
      // key is now 'x' | 'y'
      const value = obj[key]; // Safe access
    }

    // For comparison: hasKey would narrow the object type
    // if (hasKey(obj, key)) {
    //   // obj type is narrowed to guarantee the key exists
    //   const value = obj.x; // Direct access
    // }
  });

  test('Working with union types:', () => {
    type Config = Readonly<
      | { type: 'database'; host: string; port: number }
      | { type: 'file'; path: string }
      | { type: 'memory'; maxSize: number }
    >;

    function getConfigProperty(config: Config, propName: string): unknown {
      if (keyIsIn(propName, config)) {
        // propName is narrowed to valid keys for the specific config type
        return config[propName];
      }

      return undefined;
    }

    const dbConfig: Config = {
      type: 'database',
      host: 'localhost',
      port: 5432,
    };
    assert(getConfigProperty(dbConfig, 'host') === 'localhost');
    assert(getConfigProperty(dbConfig, 'invalid') === undefined);
  });
});
