import { type Message } from '@/types/message'
import MessageItem from '../MessageItem'
import useUnreadMessages from './useUnreadMessages'
import styles from './MessageList.module.css'

interface Props {
  messages: Message[]
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const {
    messagesListRef,
    indexLastMessageRead,
    numberOfMessages,
    thereAreUnreadMessages,
    isOnBottom
  } = useUnreadMessages({ messages })

  return (
    <div ref={messagesListRef} className={styles.messages}>
      {
        messages.map((msg, index) => {
          const isLastMessageReadLastMessage = indexLastMessageRead === numberOfMessages - 1
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
            <p>New messages</p>
          </div>
        </>
      )}
    </div>
  )
}

export default MessageList
