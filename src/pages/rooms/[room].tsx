import AuthRoute from '@/components/AuthRoute'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import useSocket from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import { type Message } from '@/types/message'
import { type Room } from '@/types/room'
import { type GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
  roomName: string
}

const RoomPage: React.FC<Props> = ({ roomName }) => {
  const { user } = useUser()
  const { socket, isConnected } = useSocket()

  const router = useRouter()

  const [room, setRoom] = useState<Room | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [messageList, setMessageList] = useState<Message[]>([])

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

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (newMessage === '') {
      return
    }

    const messageToSend: Message = {
      author: user?.username ?? '',
      message: newMessage,
      roomName: room?.roomName ?? '',
      date: new Date()
    }

    socket?.emit('client:send_message', messageToSend)
  }

  return (
    <SocketConnectedRoute>
      <AuthRoute>
          <p>{user?.username}</p>
          <form onSubmit={handleSubmitMessage}>
            <input required type='text' placeholder='Type a message' onChange={(e) => { setNewMessage(e.target.value) }}/>
          </form>
          <section>
            {
              messageList.map(msg => <div key={msg.date.toString()}>{msg.message}</div>)
            }
          </section>
          <section>
            <h1>USERS:</h1>
            {
              room?.users.map(user => <div key={user}>{user}</div>)
            }
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
