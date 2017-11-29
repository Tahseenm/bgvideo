/* -------------------------------------------------------------------------- *\
     Lang
\* -------------------------------------------------------------------------- */

/* :: any -> boolean */
const isString = val => typeof val === 'string'


/* -------------------------------------------------------------------------- *\
     Argument Validation
\* -------------------------------------------------------------------------- */

/* Throw error for missing required user arguments */
const required = () => {
  throw new Error('BgVideo requires target and video src arguments to work.')
}


export {
  isString,
  required,
}
