import canPlayVideo       from './canPlayVideo'
import setBgVideo         from './setBgVideo'
import resizeVideo        from './resizeVideo'
import parseOptions       from './parseOptions'
import handleWindowResize from './handleWindowResize'
import {
  getTargetElem,
  getVideoWrapperElem,
  getVideoElem,
} from './elements'

import { required, createID, prepend } from './utils/index'


/*
 +---------------------------------------------------------------------------+
 |                                                                           |
 |                                 BgVideo                                   |
 |                                                                           |
 +---------------------------------------------------------------------------+ */

/**
 Default Lib Options

 [1]. Play it slow or speed it up.
   - Plays backward when rate < 0
   - Slowed down    when 0 < rate < 1
   - Speeded up     when rate > 1
 [2]. When fallback is not provided fallback color will be used until video is
 ready to play.
 [3]. New iOS devices (version 10+) have started to play videos inline so
 background video is played on these mobile devices by default unless set to false.
 [4]. For accessibility, background videos will not play for users who prefer
 reduced motion by default. It is safe to assume that given video will cause
 distress to such users. This setting is avaible to users using iOS & mac devices.
 [5]. Allow user to further style video wrapper or program it.
 */

const DEFAULT_OPTIONS = {
  loop: true,
  muted: true,
  volume: 1,
  playbackRate: 1,             /* [1] */
  backgroundColor: 'black',
  backgroundImage: 'none',     /* [2] */
  filter: 'none',
  overlay: 'transparent',
  overlayOpacity: 0.3,
  playOnMobile: true,          /* [3] */
  playOnReducedMotion: false,  /* [4] */
  className: '',               /* [5] */
}


/**
 BgVideo constructor
 [1]. Save a reference of instance for resizing on browser resize
 */

/* :: (string | HTMLElement, string | Object, Object) -> Object */
const BgVideo = (
  target  = required(),
  src     = required(),
  options = {},
) => {
  const id = createID()
  const libOptions = parseOptions(DEFAULT_OPTIONS, options)

  const targetElem   = getTargetElem(target)
  const videoWrapper = getVideoWrapperElem(libOptions)
  prepend(videoWrapper, targetElem)

  const canPlayBg = canPlayVideo(libOptions)
  let videoElem   = canPlayBg ? getVideoElem(src, libOptions) : null
  if (canPlayBg) setBgVideo(videoWrapper, videoElem)

  const API = {
    /* :: () -> ?HTMLVideoElement */
    getVideoObject() {
      return videoElem
    },

    resize() {
      if (!canPlayBg) return

      resizeVideo(videoWrapper, videoElem)
    },

    destroy() {
      targetElem.removeChild(videoWrapper)
      BgVideo.lookup = BgVideo.lookup.filter(({ vidId }) => vidId !== id)
    },

    /* :: (path: string | Object) -> void */
    replaceVideo(newVidSrc) {
      if (!canPlayBg) return null

      videoWrapper.removeChild(videoElem)
      videoElem = getVideoElem(newVidSrc, libOptions)
      setBgVideo(videoWrapper, videoElem)

      return videoElem
    },
  }

  BgVideo.lookup.push({ id, resize: API.resize })  /* [1] */

  /** Enjoy! */
  return API
}

BgVideo.lookup = []

/** Resize all BgVideo instances when browser window is resized */
handleWindowResize(BgVideo.lookup)


export {
  BgVideo as default,
  DEFAULT_OPTIONS,
}
