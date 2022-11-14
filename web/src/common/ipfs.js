export const getIPFSURL = uri => {
  const replaced = uri.replace('ipfs://', '')

  return `https://nftstorage.link/ipfs/${replaced}`
}

export const getIPFSMetadataJSON = async uri => {
  const res = await fetch(getIPFSURL(uri))

  return res.json()
}
