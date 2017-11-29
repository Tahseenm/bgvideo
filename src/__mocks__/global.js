/* eslint import/no-extraneous-dependencies: 0 */
import { JSDOM } from 'jsdom'


/* -------------------------------------------------------------------------- *\
     Window Mock
\* -------------------------------------------------------------------------- */

const { window } = new JSDOM('')

/** JSDOM does not have support for `requestAnimationFrame` */
const requestAnimationFrame = (() => {
  let clock = Date.now()

  return (callback) => {
    const currentTime = Date.now()

    if (currentTime - clock > 16) {
      clock = currentTime
      callback(currentTime)
    } else {
      setTimeout(() => {
        requestAnimationFrame(callback)
      }, 0)
    }
  }
})()

const $$addRequestAnimationFrame = () => {
  window.requestAnimationFrame = requestAnimationFrame
}


export {
  window as default,
  $$addRequestAnimationFrame,
}
