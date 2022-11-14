import styles from './Block.module.scss'
import { useState } from 'react'

const Block = ({ imgPath, creator }) => {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div className={styles.block}>
      {isHovering && <div className={styles.creator}>created by {creator}</div>}

      <img
        src={imgPath}
        className={styles.img}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      ></img>
    </div>
  )
}

export default Block
