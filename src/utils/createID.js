/* -------------------------------------------------------------------------- *\
     Create ID
\* -------------------------------------------------------------------------- */

/**
 Creates a different ID string each time the function is called.
 @example
   createID() -> "bgVid-1"
   createID() -> "bgVid-2"
   ...
 */

let lastId = 0

/* :: () -> string */
const createID = (prefix = 'bgVid-') => {
  lastId += 1
  return `${prefix}${lastId}`
}


export default createID
