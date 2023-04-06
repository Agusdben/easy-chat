import { useCallback, useEffect, useRef, useState } from 'react'

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
  const messagesListEl = messagesListRef.current
  const messagesNumber = messageList.length

  const [thereAreUnreadMessages, setThereAreUnreadMessages] = useState(false)
  const [indexLastMessageRead, setIndexLastMessageRead] = useState(messagesNumber)
  const [isOnBottom, setIsOnBottom] = useState(true)

  const scrollMessagesToBottom = useCallback((): void => {
    if (messagesListEl === null) return
    const scrollHeight = Math.ceil(messagesListEl.scrollHeight)
    messagesListEl.scrollTop = scrollHeight
  }, [messagesListEl])

  const onScroll = useCallback((): void => {
    if (messagesListEl === null) return

    const maxScrollTop = Math.ceil(messagesListEl.scrollTop)

    const scrollHeight = messagesListEl.scrollHeight
    const offsetHeight = messagesListEl.offsetHeight

    const scrollPosition = Math.ceil(scrollHeight - offsetHeight)

    if (maxScrollTop === scrollPosition) {
      if (isOnBottom && !thereAreUnreadMessages) return
      setIsOnBottom(true)
      setThereAreUnreadMessages(false)
      setIndexLastMessageRead(messagesNumber)
    } else {
      if (!isOnBottom) return
      setIsOnBottom(false)
    }
  }, [isOnBottom, messagesListEl, thereAreUnreadMessages, messagesNumber])

  useEffect(() => {
    if (messagesListEl === null) return

    messagesListEl.addEventListener('scroll', onScroll)
    messagesListEl.addEventListener('touchmove', onScroll)

    return () => {
      messagesListEl.removeEventListener('scroll', onScroll)
      messagesListEl.removeEventListener('touchmove', onScroll)
    }
  }, [messagesListEl, onScroll])

  useEffect(() => {
    if (isOnBottom) {
      scrollMessagesToBottom()
    } else {
      setThereAreUnreadMessages(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList])

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
                messageList.map((msg, index) => {
                  const isLastMessageReadLastMessage = indexLastMessageRead === messagesNumber
                  return (
                    <div key={msg.date.toString()} className={styles.message}>
                      <MessageItem message={msg} />
                      {
                        indexLastMessageRead === index && !isLastMessageReadLastMessage && !isOnBottom &&
                          <div className={styles.unread_messages}>
                            <p>⬇ Unread ⬇</p>
                          </div>
                      }
                    </div>
                  )
                })
              }
              {thereAreUnreadMessages && (
                <>

                  <div className={styles.new_messages}>
                    <p>New messages ⬇</p>
                  </div>
                </>
              )}

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
