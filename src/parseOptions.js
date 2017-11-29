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

/* :: Object -> Object */
const parseOptions = (defaultOpts, opts) => {
  const backgroundImage = 'backgroundImage' in opts
    ? parseBgImage(opts.backgroundImage)
    : defaultOpts.backgroundImage

  const filter = 'filter' in opts
    ? parseFilter(opts.filter)
    : defaultOpts.filter

  return {
    ...defaultOpts,
    ...opts,
    backgroundImage,
    filter,
  }
}


export {
  parseOptions as default,
  parseBgImage,
  parseFilter,
}
