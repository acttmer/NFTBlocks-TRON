import styles from './Make.module.scss'
import { getIPFSURL } from '../common/ipfs'
import { useRef } from 'react'
import { useState } from 'react'
import classNames from 'classnames'

const HeadNFTs = [
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 1,
    tokenImageURI:
      'ipfs://bafybeigz2b2xrtyop47g6vwvpnyow3jajqaqbcmi4osmp6rrye4epyg73u/head.png',
  },
]

const JacketNFTs = [
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 2,
    tokenImageURI:
      'ipfs://bafybeif2mczxptt5ugxoiuuqw24e6q3wpbw7sz7bi63g3hn3qp4tcqyab4/jacket_1.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 3,
    tokenImageURI:
      'ipfs://bafybeibu2vzkfbswkkifs2vujnrdloaj6hvpl54gjpesv3zkvzsdoduec4/jacket_2.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 4,
    tokenImageURI:
      'ipfs://bafybeihoipurnqmcfj3u5g326snmayzupxyp5dausfhgceten2awszhuom/jacket_3.png',
  },
]

const PantsNFTs = [
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 5,
    tokenImageURI:
      'ipfs://bafybeiex5s3iigtzvbc7s6sj5oocvkqdij443yoq236dh5564yzciy7yhy/pants_1.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 6,
    tokenImageURI:
      'ipfs://bafybeicup23mzxqi7xn2dtru3kasqpcepbglv32yztovmf5ne3zmgjvb4i/pants_2.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 7,
    tokenImageURI:
      'ipfs://bafybeicc63uoyihgkmm53edq3fd33qzvydl4angmh5pwgneazg3hodpnje/pants_3.png',
  },
]

const ShoesNFTs = [
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 8,
    tokenImageURI:
      'ipfs://bafybeiackfv63vdltwguw2pbsrlolxr6mgggiwpeyrn6zlzfdikzfcbdzu/shoes_1.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 9,
    tokenImageURI:
      'ipfs://bafybeiel4yq4xblmhwzygibqpce6k5csqqc475jst43isxge6qxvtwpnnu/shoes_2.png',
  },
  {
    tokenAddress: '416424f925935e901245735d613e9c4ca3c3669386',
    tokenId: 10,
    tokenImageURI:
      'ipfs://bafybeic3wiw2nurl74ugfcytv2n33jcvhjsqkpgkjs7cnysdng2erfg4v4/shoes_3.png',
  },
]

export default () => {
  const outputRef = useRef(null)
  const [head, setHead] = useState()
  const [jacket, setJacket] = useState()
  const [pants, setPants] = useState()
  const [shoes, setShoes] = useState()

  return (
    <div className={styles.page}>
      <div className={styles.build}>
        <h1>Make Your Own NFT</h1>
        <div className={styles.craft}>
          <h3>Head</h3>
          <div className={styles.row}>
            {HeadNFTs.map(nft => (
              <img
                key={`${nft.tokenAddress}_${nft.tokenId}`}
                className={classNames(
                  styles.component,
                  nft === head && styles.selected,
                )}
                src={getIPFSURL(nft.tokenImageURI)}
                onClick={() => setHead(nft)}
              />
            ))}
          </div>
          <h3>Body</h3>
          <div className={styles.row}>
            {JacketNFTs.map(nft => (
              <img
                key={`${nft.tokenAddress}_${nft.tokenId}`}
                className={classNames(
                  styles.component,
                  nft === jacket && styles.selected,
                )}
                src={getIPFSURL(nft.tokenImageURI)}
                onClick={() => setJacket(nft)}
              />
            ))}
          </div>
          <h3>Pants</h3>
          <div className={styles.row}>
            {PantsNFTs.map(nft => (
              <img
                key={`${nft.tokenAddress}_${nft.tokenId}`}
                className={classNames(
                  styles.component,
                  nft === pants && styles.selected,
                )}
                src={getIPFSURL(nft.tokenImageURI)}
                onClick={() => setPants(nft)}
              />
            ))}
          </div>
          <h3>Shoes</h3>
          <div className={styles.row}>
            {ShoesNFTs.map(nft => (
              <img
                key={`${nft.tokenAddress}_${nft.tokenId}`}
                className={classNames(
                  styles.component,
                  nft === shoes && styles.selected,
                )}
                src={getIPFSURL(nft.tokenImageURI)}
                onClick={() => setShoes(nft)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.show}>
        <div ref={outputRef} className={styles.output}>
          {head && (
            <img className={styles.head} src={getIPFSURL(head.tokenImageURI)} />
          )}
          {jacket && (
            <img
              className={styles.jacket}
              src={getIPFSURL(jacket.tokenImageURI)}
            />
          )}
          {pants && (
            <img
              className={styles.pants}
              src={getIPFSURL(pants.tokenImageURI)}
            />
          )}
          {shoes && (
            <img
              className={styles.shoes}
              src={getIPFSURL(shoes.tokenImageURI)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
