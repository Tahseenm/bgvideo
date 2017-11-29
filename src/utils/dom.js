/* -------------------------------------------------------------------------- *\
     DOM Helpers
\* -------------------------------------------------------------------------- */

/** Add Node as the first child of given parent Node */
/* :: (HTMLElement, HTMLElement) -> void */
const prepend = (nodeToPrepend, parentNode) => {
  parentNode.insertBefore(nodeToPrepend, parentNode.firstChild)
}


/* eslint-disable import/prefer-default-export */
export { prepend }
