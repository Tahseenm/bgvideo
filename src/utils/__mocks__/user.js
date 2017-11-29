/* -------------------------------------------------------------------------- *\
     Device Mocking
\* -------------------------------------------------------------------------- */

const device = {
  mobile: false,
  reducedMotion: false,
}

const isMobile = () => !!device.mobile
const isNewIOS = () => isMobile() && device.mobile.isNewIOS
const prefersReducedMotion = () => device.reducedMotion

const $$setDevice = ({ mobile = false, reducedMotion = false }) => {
  Object.assign(device, { mobile, reducedMotion })
}

export {
  isMobile,
  isNewIOS,
  prefersReducedMotion,
  $$setDevice,
}
