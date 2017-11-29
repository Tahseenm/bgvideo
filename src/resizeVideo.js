import window from './global'


/* -------------------------------------------------------------------------- *\
     Resize Video
\* -------------------------------------------------------------------------- */

/**
 The main function responsible for scaling videos, to achieve cover background,
 when window is resized or via api call.

 Scaling Algorithm
 -----------------
 - When Video has a Wider ratio then its container
       +-------+=============+-------+
       |       |             |       |
       |       |             |       |
       | Video |  Container  | Video | <- Left & Right side of the video is cut off
       |   L   |             |   R   |
       |       |             |       |
       +-------+=============+-------+
 video-height = container-height
 video-width  = auto

 - When Video has a Taller ratio then its container
   +-------------------------------------+
   |               Video T               | <- Top & Bottom side of the video is cut off
   +=====================================+
   |              Container              |
   +=====================================+
   |               Video B               |
   +-------------------------------------+
 video-height = auto
 video-width  = container-width

 [1]. Algorithm for checking if video has wider ratio then it's container.
  #Example
    Video           = 1280px x 720px ( 16:9 widescreen HD video )
    Video container =  500px x 500px ( 1:1 square container     )
      500/720 > 500/1280 so wider
    New video dimensions = ~889px x 500px

 [2]. +2 pixels as a safety margin. Extra 1 pixel at both ends. [Credit: Vide]
 */

const safety = 1

/* :: (HTMLElement, HTMLVideoElement) -> void */
const resizeVideo = (contElem, videoElem) => {
  const vidWidth  = videoElem.videoWidth
  const vidHeight = videoElem.videoHeight

  const contWidth  = parseInt(window.getComputedStyle(contElem).width,  10)
  const contHeight = parseInt(window.getComputedStyle(contElem).height, 10)

  const videoHasWiderRatio = (contHeight / vidHeight) > (contWidth / vidWidth)        /* [1] */

  const newVidWidth  = videoHasWiderRatio ? 'auto' : `${contWidth + (2 * safety)}px`  /* [2] */
  const newVidHeight = videoHasWiderRatio ? `${contHeight + (2 * safety)}px` : 'auto' /* [2] */

  /* eslint-disable no-param-reassign */
  videoElem.style.width  = newVidWidth
  videoElem.style.height = newVidHeight
}


export {
  resizeVideo as default,
  safety,
}
