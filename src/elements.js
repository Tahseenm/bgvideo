import window from './global'
import { isString } from './utils/index'


const {
  document,
} = window

/* -------------------------------------------------------------------------- *\
     Create Video Wrapper
\* -------------------------------------------------------------------------- */

/**
 [1]. Video element wrapper requires a positioned parent element.
 [2]. Background video will NOT show if target has a background set as it will
 have a lower z-index
 */

/* :: (string | HTMLElement) -> HTMLElement */
const getTargetElem = (target) => {
  const elem    = isString(target) ? document.querySelector(target) : target
  const currPos = window.getComputedStyle(elem).position

  elem.style.position   = currPos === 'static' ? 'relative' : currPos  /* [1] */
  elem.style.background = 'transparent'                                /* [2] */

  return elem
}



/* -------------------------------------------------------------------------- *\
     Create Video Wrapper
\* -------------------------------------------------------------------------- */

/* :: (string, number) -> HTMLElement */
const createOverlay = (color, opacity) => {
  const overlay = document.createElement('div')

  overlay.setAttribute('style', `
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: ${color};
    opacity: ${opacity};`)

  return overlay
}

/* :: Object -> HTMLElement */
const getVideoWrapperElem = ({
  className,
  backgroundColor,
  backgroundImage,
  overlay,
  overlayOpacity,
}) => {
  const wrapper        = document.createElement('div')
  const wrapperOverlay = createOverlay(overlay, overlayOpacity)

  wrapper.className = className
  wrapper.setAttribute('style', `
    position: absolute;
    z-index: -1;
    top: 0; right: 0; bottom: 0; left: 0;
    overflow: hidden;
    background-color: ${backgroundColor};
    background-image: ${backgroundImage};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;`)
  wrapper.appendChild(wrapperOverlay)

  return wrapper
}



/* -------------------------------------------------------------------------- *\
     Create Video Elem
\* -------------------------------------------------------------------------- */

/**
 [1]. Background video for newer iOS10+ device.
 */

/* :: (string | Object, Object) -> HTMLVideoElement | null */
const getVideoElem = (src, {
  loop,
  muted,
  volume,
  playbackRate,
  filter,
}) => {
  const video = document.createElement('video')

  /** Set video source[s] */
  if (isString(src)) {
    video.src = src
  } else {
    const formats = ['mp4', 'webm', 'ogv']
    const sources = formats
      .map(format => (format in src ? `<source src="${src[format]}" type="video/${format}" >` : ''))
      .join('')

    video.innerHTML = sources
  }

  video.playsInline  = true  /* [1] */
  video.autoplay     = true
  video.loop         = loop
  video.volume       = volume
  video.defaultMuted = muted

  video.defaultPlaybackRate = playbackRate
  video.playbackRate        = playbackRate

  /** Will become visible when video is ready to play */
  video.setAttribute('style', `
    position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    visibility: hidden;
    opacity: 0;
    filter: ${filter};`)

  return video
}


export {
  getTargetElem,
  getVideoWrapperElem,
  getVideoElem,
}
