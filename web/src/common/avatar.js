import jazzicon from '@raugfer/jazzicon'

export const createJazziconSrc = address => {
  return 'data:image/svg+xml;base64,' + window.btoa(jazzicon(address))
}
