import AuthRoute from '@/components/AuthRoute'
import useSocket from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import { type Message } from '@/types/message'
import { type Room } from '@/types/room'
import { type GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'

interface Props {
  roomName: string
}

const RoomPage: React.FC<Props> = ({ roomName }) => {
  const { user } = useUser()
  const { socket, isConnected } = useSocket()

  const [room, setRoom] = useState<Room | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [messageList, setMessageList] = useState<Message[]>([])

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onServerUserJoin = (updatedRoom: Room): void => {
      console.log(updatedRoom)

      setRoom(updatedRoom)
    }

    const onServerReceiveMessage = (data: Message): void => {
      console.log(data)
      setMessageList((list) => [...list, data])
    }

    socket.emit('client:join_room', ({ roomName, username: user?.username }))

    socket.on('server:receive_message', onServerReceiveMessage)

    socket.on('server:user_join', onServerUserJoin)

    return () => {
      socket.off('server:receive_message', onServerReceiveMessage)
      socket.off('server:user_join', onServerUserJoin)
      socket.emit('client:left_room', { username: user?.username, roomName })
    }
  }, [socket, isConnected, roomName, user])

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
