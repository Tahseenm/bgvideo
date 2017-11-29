/* :: HTMLElement -> string[] */
const getEventNames = elem =>
  elem.addEventListener.mock.calls.map(([event]) => event)

/* :: (string, HTMLElement) -> void */
const trigger = (event, elem) => {
  const filtered = elem.addEventListener.mock.calls
    .filter(([$event]) => $event === event)

  const listener = filtered[0][1]
  listener()
}


export {
  getEventNames,
  trigger,
}
