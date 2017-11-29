import window from './global'
import { optimizeHandler } from './utils/index'


/* -------------------------------------------------------------------------- *\
     On Window Resize
\* -------------------------------------------------------------------------- */

/* :: Array<Object> -> void */
const handleWindowResize = (bgVideos) => {
  const resizeVideos = () => {
    bgVideos.forEach(bgVideo => bgVideo.resize())
  }

  /**
   Add a single `resize` event Listener
   [1]. Rate limit callback as IE & Webkit fire the resize event too much.
   */
  window.addEventListener(
    'resize',
    optimizeHandler(resizeVideos),  /* [1] */
    false,
  )
}


export default handleWindowResize
