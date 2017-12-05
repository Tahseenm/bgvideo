import { isString } from './utils/index'


/* -------------------------------------------------------------------------- *\
     Parse Library Options
\* -------------------------------------------------------------------------- */

const FILTER_EFFECTS = [
  'blur',
  'brightness',
  'contrast',
  'grayscale',
  'invert',
  'opacity',
  'saturate',
  'sepia',
]

/* :: string | Object -> string */
const parseFilter = filter => (isString(filter)
  ? filter
  : FILTER_EFFECTS
    .map(effect => (
      effect in filter ? `${effect}(${filter[effect]})` : ''))
    .filter(e => e !== '')
    .join(' ')
)


/* :: string -> string */
const parseBgImage = img => (img === 'none' ? img : `url(${img})`)


/**
 @NOTE Does not validate input string
 [1]. Like CSS3 background-position if you only specify one keyword, the other
 value will be `center`
 @example
   parseBgPosition('left top') -> { x: '0%', y: '0%'  }
   parseBgPosition('left')     -> { x: '0%', y: '50%' }
 */

/* :: string -> Object */
const parseBgPosition = (positionStr) => {
  const keywords = {
    center: '50%',
    top: '0%',
    right: '100%',
    bottom: '100%',
    left: '0%',
  }

  const [x, y] = positionStr.trim()
    .toLowerCase()
    .split(/\s+/)
    .map(pos => (pos in keywords ? keywords[pos] : pos))

  return {
    x,
    y: y || '50%',  /* [1] */
  }
}


/* :: (Object, Object) -> Object */
const parseOptions = (defaultOpts, opts) => {
  const options = {
    ...defaultOpts,
    ...opts,
  }

  options.backgroundImage    = parseBgImage(options.backgroundImage)
  options.backgroundPosition = parseBgPosition(options.backgroundPosition)
  options.filter             = parseFilter(options.filter)

  return options
}


export {
  parseOptions as default,
  parseBgImage,
  parseFilter,
  parseBgPosition,
}
