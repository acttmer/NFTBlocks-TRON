import styles from './Make.module.scss'
import { getIPFSURL } from '../common/ipfs'

const HeadNFTs = [
  {
    tokenAddress: '4101c72d5d017493f39e408551cb663f2eaf7ec29c',
    tokenId: 1,
    tokenImageURI:
      'ipfs://bafybeievn7yd7lslyih2gtmdoyngbazhnaokfbtt4apikifka4lcmkanai/RunMusic.png',
  },
  {
    tokenAddress: '4101c72d5d017493f39e408551cb663f2eaf7ec29c',
    tokenId: 2,
    tokenImageURI:
      'ipfs://bafybeifd4chzmp2cja3ow2rlovjwdokhenken7ohb4o6uv227vxgyvf5g4/Improvising%20Forum.png',
  },
]

export default () => {
  return (
    <div className={styles.page}>
      <h1>Make Your Own NFT</h1>
      <div className={styles.craft}>
        <h3>Head</h3>
        <div className={styles.row}>
          {HeadNFTs.map(nft => (
            <img
              key={`${nft.tokenAddress}_${nft.tokenId}`}
              className={styles.component}
              src={getIPFSURL(nft.tokenImageURI)}
            />
          ))}
        </div>
        <h3>Body</h3>
        <div className={styles.row}>
          <div className={styles.component}>Body 1</div>
          <div className={styles.component}>Body 2</div>
          <div className={styles.component}>Body 3</div>
        </div>
        <h3>Pants</h3>
        <div className={styles.row}>
          <div className={styles.component}>Pants 1</div>
          <div className={styles.component}>Pants 2</div>
          <div className={styles.component}>Pants 3</div>
        </div>
      </div>
    </div>
  )
}
