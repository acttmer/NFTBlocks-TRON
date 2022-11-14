import { useParams } from 'react-router-dom'
import styles from './View.module.scss'

export default () => {
  const { tokenAddress, tokenId: tokenId_ } = useParams()
  const tokenId = Number(tokenId_)

  return <div className={styles.page}></div>
}
