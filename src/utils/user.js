/**
 The `window` object is passed on to each of the util functions below for easy
 mocking during testing.
 */


/* -------------------------------------------------------------------------- *\
    Check Device Type
\* -------------------------------------------------------------------------- */

/** Mobile devices User Agent will contain `Mobile` or `Mobi` */
/* :: Window -> boolean */
const isMobile = ({ navigator: { userAgent } }) => !!userAgent.match(/Mobi/)

/** Device is iOS 10 and above */
/* :: Window -> boolean */
const isNewIOS = window =>
  isMobile(window) &&
  window.matchMedia('(-webkit-video-playable-inline)').matches



/* -------------------------------------------------------------------------- *\
    Acessibility
\* -------------------------------------------------------------------------- */

/* :: Window -> boolean */
const prefersReducedMotion = window =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches


export {
  isMobile,
  isNewIOS,
  prefersReducedMotion,
}
