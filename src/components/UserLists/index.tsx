import { type UserInterface } from '@/types/user'
import styles from './UserList.module.css'
import useUser from '@/hooks/useUser'
import UserIcon from '../Icons/UserIcon'

interface Props {
  users: UserInterface[] | undefined
}

const UserList: React.FC<Props> = ({ users }) => {
  const { user } = useUser()
  return (
    <ul className={styles.user_list}>
      {
        users?.map(u => (
          <li key={u.id} className={user?.id === u.id ? styles.you : ''}>
            <UserIcon />
            <span>{user?.id === u.id ? 'You' : u.username}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default UserList
