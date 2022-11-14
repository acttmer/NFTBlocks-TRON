import { useEffect, useState } from 'react'
import TRC721ExtendableRoyaltyABI from '../abi/TRC721ExtendableRoyalty.json'
import nftStorage from '../common/nft-storage'
import tronWeb from '../common/tronweb'
import { useTron } from '../contexts/Tron'
import styles from './MakeComponent.module.scss'

export default () => {
  const { account } = useTron()

  const [tokenAddress, setTokenAddress] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [royaltyTRX, setRoyaltyTRX] = useState('')
  const [file, setFile] = useState()
  const [imageSrc, setImageSrc] = useState()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setImageSrc(reader.result)
        },
        false,
      )

      reader.readAsDataURL(file)
    }
  }, [file])

  const publish = async () => {
    let address

    if (tokenAddress.length === 0) {
      console.log('Prepared to deploy ...')

      const deployed = await tronWeb.contract().new({
        abi: TRC721ExtendableRoyaltyABI.abi,
        bytecode: TRC721ExtendableRoyaltyABI.data.bytecode.object,
        feeLimit: 1e9,
        callValue: 0,
        userFeePercentage: 1,
        originEnergyLimit: 1e7,
        parameters: [name, symbol],
      })

      address = deployed.address
    } else {
      address = tokenAddress
    }

    console.log(address)

    const instance = await window.tronWeb.contract(
      TRC721ExtendableRoyaltyABI.abi,
      address,
    )

    const royaltyValue = Number(royaltyTRX) * 1e6

    const { url: tokenURI } = await nftStorage.store({
      name,
      description: `NFT Collection with name "${name}" and symbol "${symbol}"`,
      image: file,
    })

    console.log(tokenURI)

    const res = await instance
      .mint(account.address, tokenURI, royaltyValue, [])
      .send({
        feeLimit: 1e9,
        shouldPollResponse: true,
      })

    console.log(res)
  }

  return (
    <div className={styles.page}>
      <h1>Make Component</h1>
      <p>{account && account.balance / 1e6} TRX</p>
      <input
        type="file"
        accept=".png"
        onChange={event => setFile(event.target.files[0])}
      />
      {imageSrc && <img src={imageSrc} />}
      <input
        placeholder="tokenAddress"
        value={tokenAddress}
        onChange={event => setTokenAddress(event.target.value)}
      />
      {tokenAddress.length === 0 && (
        <input
          placeholder="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      )}
      {tokenAddress.length === 0 && (
        <input
          placeholder="symbol"
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
        />
      )}
      <input
        placeholder="royaltyValue (in TRX)"
        value={royaltyTRX}
        onChange={event => setRoyaltyTRX(event.target.value)}
      />
      <button onClick={publish}>Deploy</button>
    </div>
  )
}
