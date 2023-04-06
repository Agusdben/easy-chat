import { useEffect, useState } from 'react'
import useSocket from './useSocket'
import { type Message } from '@/types/message'
import { useRouter } from 'next/router'
import { type Room } from '@/types/room'
import useUser from './useUser'

interface Props {
  roomName: string
}

interface ReturnTypes {
  room: Room | null
  messageList: Message[]
}

const useRoom = ({ roomName }: Props): ReturnTypes => {
  const { socket, isConnected } = useSocket()
  const { user } = useUser()

  const [room, setRoom] = useState<Room | null>(null)
  const [messageList, setMessageList] = useState<Message[]>([])

  const router = useRouter()

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onServerUserJoin = (updatedRoom: Room): void => {
      setRoom(updatedRoom)
    }

    const onServerReceiveMessage = (data: Message): void => {
      setMessageList((list) => [...list, data])
    }

    const onServerSendRoomMessages = (messages: Message[]): void => {
      setMessageList(messages)
    }

    const onServerError = (error: string): void => {
      if (error === 'Invalid username') {
        router.push('/auth')
          .catch(error => { console.error(error) })
        return
      }

      if (error === 'Room does not exists') {
        router.push('/')
          .catch(error => { console.error(error) })
        return
      }

      router.push('/500')
        .catch(error => { console.error(error) })
    }

    socket.emit('client:join_room', ({ roomName, username: user?.username }))

    socket.on('server:receive_message', onServerReceiveMessage)

    socket.on('server:user_join', onServerUserJoin)

    socket.on('server:send_room_messages', onServerSendRoomMessages)

    socket.on('server:error', onServerError)

    return () => {
      socket.off('server:receive_message', onServerReceiveMessage)
      socket.off('server:user_join', onServerUserJoin)
      socket.off('server:send_room_messages', onServerSendRoomMessages)
      socket.off('server:error', onServerError)
      socket.emit('client:left_room', { username: user?.username, roomName })
    }
  }, [socket, isConnected, roomName, user, router])

  return {
    room,
    messageList
  }
}

export default useRoom
