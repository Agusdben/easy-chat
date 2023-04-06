import { type Message } from '@/types/message'
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  messages: Message[]
}

interface ReturnTypes {
  messagesListRef: RefObject<HTMLDivElement>
  indexLastMessageRead: number
  numberOfMessages: number
  thereAreUnreadMessages: boolean
  isOnBottom: boolean
}

const useUnreadMessages = ({ messages }: Props): ReturnTypes => {
  const messagesListRef = useRef<HTMLDivElement>(null)
  const messagesListEl = messagesListRef.current
  const numberOfMessages = messages.length

  const [thereAreUnreadMessages, setThereAreUnreadMessages] = useState(false)
  const [indexLastMessageRead, setIndexLastMessageRead] = useState(numberOfMessages)
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
      setTimeout(() => {
        setThereAreUnreadMessages(false)
      }, 1200)
      setIndexLastMessageRead(numberOfMessages)
    } else {
      if (!isOnBottom) return
      setIsOnBottom(false)
    }
  }, [isOnBottom, messagesListEl, thereAreUnreadMessages, numberOfMessages])

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
  }, [messages])

  return {
    messagesListRef,
    indexLastMessageRead,
    numberOfMessages,
    thereAreUnreadMessages,
    isOnBottom
  }
}

export default useUnreadMessages
