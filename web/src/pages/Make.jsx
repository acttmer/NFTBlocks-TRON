import classNames from 'classnames'
import * as htmlToImage from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TRC721ExtendableRoyaltyABI from '../abi/TRC721ExtendableRoyalty.json'
import { getIPFSURL, getIPFSMetadataJSON } from '../common/ipfs'
import { dataURLtoFile } from '../common/utils'
import { useTron } from '../contexts/Tron'
import nftStorage from '../common/nft-storage'
import styles from './Make.module.scss'

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
  const { account } = useTron()

  const navigate = useNavigate()
  const outputRef = useRef(null)

  const [head, setHead] = useState()
  const [jacket, setJacket] = useState()
  const [pants, setPants] = useState()
  const [shoes, setShoes] = useState()
  const [royaltyData, setRoyaltyData] = useState()
  const [royaltyTRX, setRoyaltyTRX] = useState('')
  const [minting, setMinting] = useState(false)

  useEffect(() => {
    if (head) {
      const instance = window.tronWeb.contract(
        TRC721ExtendableRoyaltyABI.abi,
        '416424f925935e901245735d613e9c4ca3c3669386',
      )

      instance
        .royaltiesOf(head.tokenId)
        .call()
        .then(res => {
          setRoyaltyData(royaltyData => ({
            ...royaltyData,
            Head: {
              tokenAddress: head.tokenAddress,
              tokenId: head.tokenId,
              royaltyValue: res[0][1].toNumber() / 1e6,
            },
          }))
        })
    }
  }, [head])

  useEffect(() => {
    if (jacket) {
      const instance = window.tronWeb.contract(
        TRC721ExtendableRoyaltyABI.abi,
        '416424f925935e901245735d613e9c4ca3c3669386',
      )

      instance
        .royaltiesOf(jacket.tokenId)
        .call()
        .then(res => {
          setRoyaltyData(royaltyData => ({
            ...royaltyData,
            Jacket: {
              tokenAddress: jacket.tokenAddress,
              tokenId: jacket.tokenId,
              royaltyValue: res[0][1].toNumber() / 1e6,
            },
          }))
        })
    }
  }, [jacket])

  useEffect(() => {
    if (pants) {
      const instance = window.tronWeb.contract(
        TRC721ExtendableRoyaltyABI.abi,
        '416424f925935e901245735d613e9c4ca3c3669386',
      )
      instance
        .royaltiesOf(pants.tokenId)
        .call()
        .then(res => {
          setRoyaltyData(royaltyData => ({
            ...royaltyData,
            Pants: {
              tokenAddress: pants.tokenAddress,
              tokenId: pants.tokenId,
              royaltyValue: res[0][1].toNumber() / 1e6,
            },
          }))
        })
    }
  }, [pants])

  useEffect(() => {
    if (shoes) {
      const instance = window.tronWeb.contract(
        TRC721ExtendableRoyaltyABI.abi,
        '416424f925935e901245735d613e9c4ca3c3669386',
      )

      instance
        .royaltiesOf(shoes.tokenId)
        .call()
        .then(res => {
          setRoyaltyData(royaltyData => ({
            ...royaltyData,
            Shoes: {
              tokenAddress: shoes.tokenAddress,
              tokenId: shoes.tokenId,
              royaltyValue: res[0][1].toNumber() / 1e6,
            },
          }))
        })
    }
  }, [shoes])

  const mint = async () => {
    const royaltyValue = Number(royaltyTRX || 0) * 1e6

    const dataURL = await htmlToImage.toPng(outputRef.current)
    const file = dataURLtoFile(dataURL, `crafted.png`)

    const { url: tokenURI } = await nftStorage.store({
      name: 'Crafted by NFTBlocks Demo',
      description: `Based on ${Object.values(royaltyData).map(
        data => `${data.tokenAddress}#${data.tokenId}`,
      )}`,
      image: file,
    })

    console.log(tokenURI)
    console.log(await getIPFSMetadataJSON(tokenURI))

    const instance = window.tronWeb.contract(
      TRC721ExtendableRoyaltyABI.abi,
      '416424f925935e901245735d613e9c4ca3c3669386',
    )

    const totalSupply = await instance.totalSupply().call()

    // It's a workaround, since tronweb usually cannot get the result in time
    setTimeout(() => {
      navigate(`/view/${instance.address}/${totalSupply.toNumber() + 1}`)
    }, 15000)

    await instance
      .mint(
        account.address,
        tokenURI,
        royaltyValue,
        Object.values(royaltyData).map(data => [
          instance.address,
          data.tokenId,
        ]),
      )
      .send({
        feeLimit: 1e9,
        shouldPollResponse: true,
      })
  }

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
        {royaltyData && (
          <div className={styles.royalties}>
            <h3>Royalties</h3>
            <ul>
              {Object.entries(royaltyData).map(([name, data]) => (
                <li key={name}>
                  {name}: {data.tokenAddress.slice(0, 18)}... #{data.tokenId},{' '}
                  {data.royaltyValue} TRX
                </li>
              ))}
            </ul>
            <p>
              <b>
                Total royalty:{' '}
                {Object.values(royaltyData).reduce((prev, curr) => {
                  prev += curr.royaltyValue
                  return prev
                }, 0)}{' '}
                TRX
              </b>
            </p>
          </div>
        )}
        <div className={styles.controls}>
          <input
            className={styles.royaltyInput}
            placeholder="Royalty Value (in TRX)"
            value={royaltyTRX}
            onChange={event => setRoyaltyTRX(event.target.value)}
          />
          <div
            className={classNames(styles.mint, minting && styles.disabled)}
            onClick={() => {
              setMinting(true)
              mint()
                .then(() => setMinting(false))
                .catch(err => {
                  console.error(err)
                  setMinting(false)
                })
            }}
          >
            {minting ? 'Minting ...' : 'Mint'}
          </div>
        </div>
      </div>
    </div>
  )
}
