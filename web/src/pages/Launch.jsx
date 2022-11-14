import { useTron } from '../contexts/Tron'
import styles from './Launch.module.scss'

export default () => {
  const { account } = useTron()

  return <div className={styles.page}>{account && account.address}</div>
}
