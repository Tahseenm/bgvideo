import window from './global'
import { isMobile, isNewIOS, prefersReducedMotion } from './utils/index'


/* -------------------------------------------------------------------------- *\
     Can Play Background Video?
\* -------------------------------------------------------------------------- */

/**
 [1]. iOS 10+ can play videos inline IF they are muted or have no sountrack.
 @NOTE when `muted` is set to false, video will NOT play for all iOS users
 regardless of soundtrack as implementation does not check for missing soundtrack.

 [2]. Accessibility: Dont play Background video for users who prefer reduced
 motion by default unless Lib `playOnReducedMotion` option is set to true by
 api user.
 */

/* :: Object -> boolean */
const canPlayVideo = ({ muted, playOnMobile, playOnReducedMotion }) => {
  /** Desktop browsers & iOS 10+ */
  if (!isMobile(window) || isNewIOS(window)) {
    if (isNewIOS(window) && (!playOnMobile || !muted)) return false   /* [1] */

    return prefersReducedMotion(window) ? playOnReducedMotion : true  /* [2] */
  }

  /** All mobile devices excluding iOS 10+ */
  return false
}


export default canPlayVideo
