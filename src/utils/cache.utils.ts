/* eslint-disable */

const cachedInstances = new WeakMap<any, Map<string, any>>();
// TODO: fix types (weird bug when cache is typed)
export function caches() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalFunc = descriptor.value;
    descriptor.value = function(...args: any[]) {
      let cache = cachedInstances.get(this);
      if (!cache) {
        cache = new Map<string, any>();
        cachedInstances.set(this, cache);
      }
      // @ts-ignore
      const cachedValue = cache.get(propertyKey);
      if (cachedValue) {
        return cachedValue;
      }
      const val = originalFunc.apply(this, args);
      // @ts-ignore
      cache.set(propertyKey, val);
      console.log(val)
      return val;
    };
  };
}
