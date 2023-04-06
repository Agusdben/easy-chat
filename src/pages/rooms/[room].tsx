import { useEffect, useRef } from 'react'

import { type GetServerSideProps } from 'next'

import AuthRoute from '@/components/AuthRoute'
import UserIcon from '@/components/Icons/UserIcon'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import MessageItem from '@/components/MessageItem'

import styles from '@/styles/Rooms.module.css'
import useRoom from '@/hooks/useRoom'
import SendMessageForm from '@/components/SendMessageForm'

interface Props {
  roomName: string
}

const RoomPage: React.FC<Props> = ({ roomName }) => {
  const { room, messageList } = useRoom({ roomName })

  const messagesListRef = useRef<HTMLDivElement>(null)

  const scrollMessagesToBottom = (): void => {
    if (messagesListRef.current === null) return
    const scrollTop = messagesListRef.current?.scrollHeight
    messagesListRef.current.scrollTop = scrollTop
  }

  useEffect(() => {
    scrollMessagesToBottom()
  }, [messagesListRef.current])

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
            <div ref={messagesListRef} className={styles.messages}>
              {
                messageList.map(msg => <MessageItem key={msg.date.toString()} message={msg} />)
              }
            </div>
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
