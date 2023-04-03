import MessagesIcon from '../Icons/MessagesIcon'
import styles from './Logo.module.css'

interface Props {
  size: 'sm' | 'normal' | 'md' | 'lg'
}

const Logo: React.FC<Props> = ({ size = 'normal' }) => {
  return (
    <div className={`${styles[size]} ${styles.logo}`}>
      <MessagesIcon />
      <p>easy chat</p>
    </div>
  )
}

export default Logo
