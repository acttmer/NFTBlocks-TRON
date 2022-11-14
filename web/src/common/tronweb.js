import TronWeb from 'tronweb'
import { INTERNAL_SIGNER_PRIVATE_KEY } from './constants'

const tronWeb = new TronWeb({
  fullHost: 'https://api.shasta.trongrid.io',
  //headers: { 'TRON-PRO-API-KEY': '707f20ea-1949-47eb-a827-5bfbded16269' },
  privateKey: INTERNAL_SIGNER_PRIVATE_KEY,
})

export default tronWeb
