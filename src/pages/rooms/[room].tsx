import { type GetServerSideProps } from 'next'

import AuthRoute from '@/components/AuthRoute'
import UserIcon from '@/components/Icons/UserIcon'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'

import styles from '@/styles/Rooms.module.css'
import useRoom from '@/hooks/useRoom'
import SendMessageForm from '@/components/SendMessageForm'
import MessageList from '@/components/MessageList'
import UserList from '@/components/UserLists'
import { useState } from 'react'
import XMarkIcon from '@/components/Icons/XMarkIcon'

interface Props {
  roomName: string
}

interface UserListStyles extends React.CSSProperties {
  '--right': string
}

const RoomPage: React.FC<Props> = ({ roomName }) => {
  const { room, messages } = useRoom({ roomName })

  const [toggleUserList, setToggleUserList] = useState(false)

  const handleToggleUserList = (): void => {
    setToggleUserList(!toggleUserList)
  }

  const userListStyles: UserListStyles = { '--right': toggleUserList ? '0' : '-100%' }

  return (
    <SocketConnectedRoute>
      <AuthRoute>
          <section className={styles.section}>
            <div className={styles.chat}>
              <header className={styles.chat_header}>
                <h3>{room?.roomName}</h3>
                <div className={styles.chat_users}>
                  <button onClick={handleToggleUserList}>
                    <UserIcon />
                  </button>
                  <span>{room?.usersNumber}</span>
                </div>
              </header>
              <MessageList messages={messages} />
              <SendMessageForm room={room} />
            </div>
            <div style={userListStyles} className={styles.users_connected}>
              <button onClick={handleToggleUserList}>
                <XMarkIcon />
              </button>
              <h3>Connected</h3>
              <UserList users={room?.users} />
            </div>
          </section>
      </AuthRoute>
    </SocketConnectedRoute>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const room = context.query.room

  if (room === '') {
    return {
      notFound: true
    }
  }

  return {
    props: {
      roomName: room
    }
  }
}

export default RoomPage
