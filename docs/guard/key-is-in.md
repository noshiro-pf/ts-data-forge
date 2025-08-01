[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/key-is-in

# guard/key-is-in

## Functions

### keyIsIn()

> **keyIsIn**\<`K`, `R`\>(`key`, `obj`): `key is K & keyof R`

Defined in: [src/guard/key-is-in.mts:157](https://github.com/noshiro-pf/ts-data-forge/blob/main/src/guard/key-is-in.mts#L157)

Type guard that checks if a key exists as an own property in an object.

This function is similar to `hasKey()` but with reversed parameter order and different
type narrowing behavior. While `hasKey()` narrows the object type, `keyIsIn()` narrows
the key type to be a valid key of the given object.

**Type Narrowing Behavior:**

- Narrows the key type to be a key that exists in the object (`K & keyof R`)
- Useful when you have a dynamic key and want to ensure it's valid for a specific object
- The object type remains unchanged

**Implementation:** Uses `Object.hasOwn()` to check for own properties (not inherited).

#### Type Parameters

##### K

`K` _extends_ `PropertyKey`

The type of the key to check, must extend PropertyKey (string | number | symbol)

##### R

`R` _extends_ `UnknownRecord`

The type of the record (object), must extend UnknownRecord

#### Parameters

##### key

`K`

The key to check for

##### obj

`R`

The object to check within

#### Returns

`key is K & keyof R`

`true` if `key` is an own property of `obj`, `false` otherwise.
When `true`, TypeScript narrows the key type to be a valid key of the object.

#### Examples

Basic usage with known object structure:

```typescript
const obj = { a: 1, b: 2, c: 3 };
const userInput: string = getUserInput(); // Could be any string

if (keyIsIn(userInput, obj)) {
    // userInput is now narrowed to 'a' | 'b' | 'c'
    const value = obj[userInput]; // Type-safe access, value is number
    console.log(`Value for ${userInput}:`, value);
} else {
    console.log(`Key '${userInput}' not found in object`);
}
```

Dynamic key validation for safe property access:

```typescript
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
```

Form field validation:

```typescript
interface FormData {
    name: string;
    email: string;
    age: number;
}

const formData: FormData = getFormData();
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
```

Safe object property iteration:

```typescript
const userPreferences = {
    theme: 'dark',
    language: 'en',
    notifications: true,
};

const settingsToUpdate: string[] = getSettingsFromUser();

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
```

Comparison with hasKey() - different narrowing behavior:

```typescript
const obj = { x: 10, y: 20 };
const key: string = 'x';

// Using keyIsIn - narrows the key type
if (keyIsIn(key, obj)) {
    // key is now 'x' | 'y'
    const value = obj[key]; // Safe access
}

// Using hasKey - narrows the object type
if (hasKey(obj, key)) {
    // obj type is narrowed to guarantee the key exists
    const value = obj.x; // Direct access
}
```

Working with union types:

```typescript
type Config =
    | { type: 'database'; host: string; port: number }
    | { type: 'file'; path: string }
    | { type: 'memory'; maxSize: number };

function getConfigProperty(config: Config, propName: string): unknown {
    if (keyIsIn(propName, config)) {
        // propName is narrowed to valid keys for the specific config type
        return config[propName];
    }

    return undefined;
}
```

#### See

hasKey - Similar function that narrows the object type instead of the key type
