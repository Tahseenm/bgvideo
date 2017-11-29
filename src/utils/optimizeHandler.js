import window from '../global'


/* -------------------------------------------------------------------------- *\
     Optimize Handler
\* -------------------------------------------------------------------------- */

/**
 Rate Limit callback to ~60 calls per second using `requestAnimationFrame` api.
 Similar to _.throttle(callback, ~16.67).

 [1]. Handle IE 9- browser with no polyfill for requestAnimationFrame function.
 */

/* :: Function -> Function */
const optimizeHandler = (callback) => {
  if (!window.requestAnimationFrame) return callback  /* [1] */

  let waiting = false

  const execCallback = () => {
    waiting = false
    callback()
  }

  const handler = () => {
    if (waiting) return

    window.requestAnimationFrame(execCallback)
    waiting = true
  }

  return handler
}


export default optimizeHandler
