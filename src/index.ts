import memoize from 'fast-memoize'

export const memoizedThrottle = (fn, t = 16) => memoize(fn ,{
  serializer: (id = "") => `${id}-${Math.floor(performance.now() / t)}`
})
