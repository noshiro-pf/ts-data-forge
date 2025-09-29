// Example: src/others/memoize-function.mts (memoizeFunction)
// Memory-conscious memoization with weak references

// For object keys, consider using WeakMap externally
const cache = new WeakMap<UnknownRecord, Result>();

function memoizeWithWeakMap<T extends UnknownRecord, R>(
  fn: (obj: T) => R,
): (obj: T) => R {
  return (obj: T): R => {
    if (cache.has(obj)) {
      return cache.get(obj)!;
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

export { cache, memoizeWithWeakMap };
