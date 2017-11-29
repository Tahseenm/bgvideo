import resizeVideo from './resizeVideo'
import { prepend } from './utils/index'


/* -------------------------------------------------------------------------- *\
     Set Background Video
\* -------------------------------------------------------------------------- */

/**
 [1]. Have recieved enough video data to set correct width & height
 [2]. Make the video visible :)
 */

/* :: (HTMLElement, HTMLVideoElement) -> void */
const setBgVideo = (wrapperElem, videoElem) => {
  const handlers = {
    loaded() {
      resizeVideo(wrapperElem, videoElem)
      videoElem.removeEventListener('loadedmetadata', handlers.loaded)
    },

    playing() {
      /* eslint-disable no-param-reassign */
      videoElem.style.visibility = 'visible'
      videoElem.style.opacity    = 1

      wrapperElem.style.backgroundImage = 'none'
      /* eslint-enable */

      videoElem.removeEventListener('playing', handlers.playing)
    },
  }

  videoElem.addEventListener('loadedmetadata', handlers.loaded, false)  /* [1] */
  videoElem.addEventListener('playing', handlers.playing, false)        /* [2] */

  prepend(videoElem, wrapperElem)
}


export default setBgVideo
