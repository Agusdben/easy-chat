import { useEffect, useState } from 'react'
import Button from '../Button'
import PaperPlaneIcon from '../Icons/PaperPlaneIcon'
import styles from './SendMessageForm.module.css'
import useUser from '@/hooks/useUser'
import { type Message } from '@/types/message'
import { type Room } from '@/types/room'
import useSocket from '@/hooks/useSocket'

interface Props {
  room: Room | null
}

const initialPlaceholderValue = 'Type a message'

const SendMessageForm: React.FC<Props> = ({ room }) => {
  const [newMessage, setNewMessage] = useState('')
  const [placeholder, setPlaceholder] = useState(initialPlaceholderValue)
  const [spamCount, setSpamCount] = useState(0)

  const { user } = useUser()
  const { socket } = useSocket()

  useEffect(() => {
    const onServerError = (message: string): void => {
      setNewMessage('')
      if (message.includes('Spam')) {
        if (placeholder !== initialPlaceholderValue) return

        let seconds = 10 + 10 * spamCount

        const preventSpam = setInterval(() => {
          seconds--
          if (seconds === 0) {
            setPlaceholder(initialPlaceholderValue)
            setSpamCount(spamCount => spamCount + 1)
            clearInterval(preventSpam)
            return
          }
          setPlaceholder(`You are so fast typing, please wait ${seconds} seconds`)
        }, 1000)
      }
    }

    socket?.on('server:error', onServerError)

    return () => {
      socket?.off('server:error', onServerError)
    }
  }, [socket, placeholder, spamCount])

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (newMessage.trim() === '') {
      return
    }

    if (user == null) return

    const messageToSend: Message = {
      author: { id: user.id, username: user.username },
      message: newMessage,
      roomName: room?.roomName ?? '',
      date: new Date()
    }

    socket?.emit('client:send_message', messageToSend)
    setNewMessage('')
  }

  return (
    <form onSubmit={handleSubmitMessage} className={styles.form_message}>
      <input disabled={placeholder !== initialPlaceholderValue} maxLength={128} minLength={1} required type='text' placeholder={placeholder} value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }}/>
      <Button>
        <PaperPlaneIcon />
      </Button>
    </form>
  )
}

export default SendMessageForm
