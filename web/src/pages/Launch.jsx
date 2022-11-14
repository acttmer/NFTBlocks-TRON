import { useTron } from '../contexts/Tron'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Launch.module.scss'

import glasses1 from '../assets/glasses1.svg'
import glasses2 from '../assets/glasses2.svg'
import glasses3 from '../assets/glasses3.svg'
import body1 from '../assets/body1.svg'
import body2 from '../assets/body2.svg'
import body3 from '../assets/body3.svg'
import pants1 from '../assets/pants1.svg'
import pants2 from '../assets/pants2.svg'
import pants3 from '../assets/pants3.svg'
import shoes1 from '../assets/shoes1.svg'
import shoes2 from '../assets/shoes2.svg'
import shoes3 from '../assets/shoes3.svg'
import Block from '../components/block/block'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'
import person3 from '../assets/person3.png'
import person4 from '../assets/person4.png'

export default () => {
  const { account } = useTron()
  const navigate = useNavigate()

  // const fakeAddrs = [...Array(12)].map(
  //   () =>
  //     [...Array(3)]
  //       .map(() => Math.floor(Math.random() * 16).toString(16))
  //       .join('') +
  //     '...' +
  //     [...Array(3)]
  //       .map(() => Math.floor(Math.random() * 16).toString(16))
  //       .join(''),
  // )

  fakeAddrs = [
    '29d...eda',
    '971...e12',
    '7e2...9ea',
    'd9e...3b2',
    '174...437',
    '084...c32',
    'f3b...93b',
    'a34...fa0',
    '4df...cd9',
    'd92...730',
    '61a...99a',
    '74e...a9b',
  ]

  const persons = [person1, person2, person3, person4]
  const [idx, setIdx] = useState(0)
  setTimeout(() => {
    setIdx((idx + 1) % 4)
  }, 1500)

  return (
    <div className={styles.page}>
      <div className={styles.creations}>
        <div className={styles.glasses}>
          <Block imgPath={glasses1} creator={fakeAddrs.at(0)}></Block>
          <Block imgPath={glasses2} creator={fakeAddrs.at(1)}></Block>
          <Block imgPath={glasses3} creator={fakeAddrs.at(2)}></Block>
        </div>
        <div className={styles.body}>
          <Block imgPath={body1} creator={fakeAddrs.at(3)}></Block>
          <Block imgPath={body2} creator={fakeAddrs.at(4)}></Block>
          <Block imgPath={body3} creator={fakeAddrs.at(5)}></Block>
        </div>
        <div className={styles.pants}>
          <Block imgPath={pants1} creator={fakeAddrs.at(6)}></Block>
          <Block imgPath={pants2} creator={fakeAddrs.at(7)}></Block>
          <Block imgPath={pants3} creator={fakeAddrs.at(8)}></Block>
        </div>

        <div className={styles.shoes}>
          <Block imgPath={shoes1} creator={fakeAddrs.at(9)}></Block>
          <Block imgPath={shoes2} creator={fakeAddrs.at(10)}></Block>
          <Block imgPath={shoes3} creator={fakeAddrs.at(11)}></Block>
        </div>
      </div>

      <div className={styles.nft}>
        <div className={styles.heading}>NFT Blocks</div>
        <div className={styles.subheading}>Create, Collaborate, Own</div>
        <img src={persons[idx]} className={styles.person}></img>
        <div className={styles.btn} onClick={() => navigate('/make')}>
          Start Creating
        </div>
      </div>
    </div>
  )
}
