/* eslint import/no-extraneous-dependencies: 0 */
import { JSDOM } from 'jsdom'


/* -------------------------------------------------------------------------- *\
     Elements Mock
\* -------------------------------------------------------------------------- */

const {
  window: {
    document,
  },
} = new JSDOM('')

let target = document.createElement('div')
let wrapper = document.createElement('div')
let video = document.createElement('video')

const getTargetElem = () => target
const getVideoWrapperElem = () => wrapper
const getVideoElem = (src) => {
  video.src = src
  return video
}

const $$reset = () => {
  target = document.createElement('div')
  wrapper = document.createElement('div')
  video = document.createElement('video')
}


export {
  getTargetElem,
  getVideoWrapperElem,
  getVideoElem,
  $$reset,
}
