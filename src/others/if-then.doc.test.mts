import { ifThen } from './if-then.mjs';

describe('ifThen', () => {
  test('Basic truth table demonstration', () => {
    ifThen(true, true); // true  (if true then true = true)
    ifThen(true, false); // false (if true then false = false)
    ifThen(false, true); // true  (if false then true = true - vacuously true)
    ifThen(false, false); // true  (if false then false = true - vacuously true)
  });

  test('Validation logic - "if required then must have value"', () => {
    function validateField(value: string, isRequired: boolean): boolean {
      const hasValue = value.trim().length > 0;
      return ifThen(isRequired, hasValue);
    }

    validateField('hello', true); // true (required and has value)
    validateField('', true); // false (required but no value)
    validateField('', false); // true (not required, so valid)
    validateField('hello', false); // true (not required, but has value is fine)
  });

  test('Access control - "if admin then has all permissions"', () => {
    function checkPermission(user: User, permission: string): boolean {
      const isAdmin = user.role === 'admin';
      const hasPermission = user.permissions.includes(permission);

      // Admin must have all permissions
      return ifThen(isAdmin, hasPermission);
    }

    const adminUser = { role: 'admin', permissions: ['read', 'write'] };
    checkPermission(adminUser, 'delete'); // false (admin without delete permission = invalid)

    const regularUser = { role: 'user', permissions: ['read'] };
    checkPermission(regularUser, 'delete'); // true (non-admin without permission is valid)
  });

  test('Contract validation - "if premium then features enabled"', () => {
    interface Subscription {
      isPremium: boolean;
      features: {
        advancedAnalytics: boolean;
        unlimitedStorage: boolean;
        prioritySupport: boolean;
      };
    }

    function validateSubscription(sub: Subscription): boolean {
      // If premium, then all premium features must be enabled
      return ifThen(
        sub.isPremium,
        sub.features.advancedAnalytics &&
          sub.features.unlimitedStorage &&
          sub.features.prioritySupport,
      );
    }
  });

  test('Chaining multiple implications', () => {
    // "If A then B" AND "If B then C"
    function validateChain(a: boolean, b: boolean, c: boolean): boolean {
      return ifThen(a, b) && ifThen(b, c);
    }

    validateChain(true, true, true); // true (valid chain)
    validateChain(true, false, true); // false (breaks at first implication)
    validateChain(false, false, false); // true (vacuously true chain)
  });

  test('Negation patterns', () => {
    // "If not expired then valid" is equivalent to "expired OR valid"
    const expiryDate = Date.now() + 86400000; // 1 day from now
    const isExpired = Date.now() > expiryDate;
    const isValid = true; // checkValidity();
    const result = ifThen(!isExpired, isValid);
    assert(result === true); // not expired and valid
  });
});
