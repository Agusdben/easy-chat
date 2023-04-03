import MessagesIcon from '../Icons/MessagesIcon'
import styles from './Logo.module.css'

interface Props {
  md?: boolean
}

const Logo: React.FC<Props> = ({ md }) => {
  const size = (): string => {
    if (md === true) {
      return 'md'
    }

    return ''
  }
  return (
    <div className={styles[size()]}>
      <MessagesIcon />
    </div>
  )
}

export default Logo
