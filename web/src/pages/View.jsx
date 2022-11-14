import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TRC721ExtendableRoyaltyABI from '../abi/TRC721ExtendableRoyalty.json'
import { getIPFSMetadataJSON, getIPFSURL } from '../common/ipfs'
import { useTron } from '../contexts/Tron'
import styles from './View.module.scss'

export default () => {
  const { account } = useTron()
  const { tokenAddress, tokenId: tokenId_ } = useParams()
  const tokenId = Number(tokenId_)

  const [data, setData] = useState()

  useEffect(() => {
    const load = async () => {
      const instance = window.tronWeb.contract(
        TRC721ExtendableRoyaltyABI.abi,
        '416424f925935e901245735d613e9c4ca3c3669386',
      )

      const tokenURI = await instance.tokenURI(tokenId).call()
      const tokenMetadata = await getIPFSMetadataJSON(tokenURI)
      const dependencies = await instance.dependenciesOf(tokenId).call()
      const royalties = await Promise.all(
        dependencies.map(dep => instance.royaltiesOf(dep[1]).call()),
      )

      console.log(royalties)

      setData({
        tokenURI,
        tokenMetadata,
        dependencies,
        royalties,
      })
    }

    if (account) {
      load()
    }
  }, [account, tokenAddress, tokenId])

  return (
    <div className={styles.page}>
      <h1>Minted Craft</h1>
      {data && (
        <>
          <img
            className={styles.image}
            src={getIPFSURL(data.tokenMetadata.image)}
          />
          <div>
            <h3>Royalties</h3>
            <ul>
              {data.royalties.map(royalty => (
                <li key={royalty[0][0]}>
                  {royalty[0][0]}: {royalty[0][1].toNumber() / 1e6} TRX
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
