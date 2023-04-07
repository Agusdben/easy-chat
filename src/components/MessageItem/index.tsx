import useUser from '@/hooks/useUser'
import { type Message } from '@/types/message'
import styles from './MessageItem.module.css'
import React from 'react'

interface Props {
  message: Message
}

const MessageItem: React.FC<Props> = ({ message }) => {
  const { user } = useUser()
  const isMessageFromUserLogged = user?.id === message.author.id

  const messageTime = (): string => {
    const date = new Date(message.date)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`
  }

  return (
    <div className={isMessageFromUserLogged ? styles.message_author : styles.message}>
      <span className={styles.author}>{isMessageFromUserLogged ? 'You' : message.author.username}</span>
      <div className={styles.message_content}>
        <p>{message.message}</p>
        <small>{messageTime()}</small>
      </div>
    </div>
  )
}

export default React.memo(MessageItem)
