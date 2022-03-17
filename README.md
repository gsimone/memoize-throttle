### 🤸‍♂️ Memoize/Throttle

Throttle a function in the background while returning a memoized value every call.

```js
const myExpensiveCallback = memoizeThrottle(() => {
  return myDiv.getBoundingClientRect().left
}, 160) 

rAFLoop(() => myExpensiveCallback())
```

#### When to use

Use when you need to fetch for a value with high frequency but can use stale values - eg. if you are interpolating/animating at lower frequencies.