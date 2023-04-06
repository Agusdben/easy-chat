import { type GetServerSideProps } from 'next'

import AuthRoute from '@/components/AuthRoute'
import UserIcon from '@/components/Icons/UserIcon'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'

import styles from '@/styles/Rooms.module.css'
import useRoom from '@/hooks/useRoom'
import SendMessageForm from '@/components/SendMessageForm'
import MessageList from '@/components/MessageList'

interface Props {
  roomName: string
}

const RoomPage: React.FC<Props> = ({ roomName }) => {
  const { room, messages } = useRoom({ roomName })

  return (
    <SocketConnectedRoute>
      <AuthRoute>
          <section className={styles.chat}>
            <header className={styles.chat_header}>
              <h3>{room?.roomName}</h3>
              <div className={styles.chat_users}>
                <UserIcon />
                <span>{room?.usersNumber}</span>
              </div>
            </header>
            <MessageList messages={messages} />
            <SendMessageForm room={room} />
          </section>
          {/* <section>
            <h1>USERS:</h1>
            {
              room?.users.map(user => <div key={user.id}>{user.username}</div>)
            }
          </section> */}
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
