/* -------------------------------------------------------------------------- *\
     CanPlayVideo Mock
\* -------------------------------------------------------------------------- */

let canPlay = true

const $$setCanPlay = () => {
  canPlay = true
}

const $$setCantPlay = () => {
  canPlay = false
}

const canPlayVideo = () => canPlay

export {
  canPlayVideo as default,
  $$setCanPlay,
  $$setCantPlay,
}
