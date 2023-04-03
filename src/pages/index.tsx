import AuthRoute from '@/components/AuthRoute'
import RoomItem from '@/components/RoomItem'
import useSocket from '@/hooks/useSocket'
import useSocketError from '@/hooks/useSocketError'
import useUser from '@/hooks/useUser'
import { type Room, type NewRoom } from '@/types/room'
import Link from 'next/link'
import { useState, type FormEvent, useEffect } from 'react'

const Home: React.FC = () => {
  const { handleCreateRoom, isConnected, socket } = useSocket()
  const { user } = useUser()
  const [room, setRoom] = useState('')
  const [rooms, setRooms] = useState<Room[] | undefined>(undefined)
  const { error, clearError } = useSocketError()

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onServerSendRooms = (rooms: Room[]): void => {
      setRooms(rooms)
    }

    socket.emit('client:get_rooms', { username: user?.username })

    socket.on('server:send_rooms', onServerSendRooms)

    return () => {
      socket.off('server:send_rooms', onServerSendRooms)
    }
  }, [isConnected, socket, user])

  const handleSubmitRoom = (e: FormEvent<HTMLFormElement>): void => {
    clearError()
    e.preventDefault()
    if (room === '') {
      return
    }

    const newRoom: NewRoom = {
      roomName: room,
      creator: user?.username ?? ''
    }

    handleCreateRoom(newRoom)
    setRoom('')
  }

  return (
    <AuthRoute>
        <form onSubmit={handleSubmitRoom}>
          <input placeholder='enter room name' onChange={(e) => { setRoom(e.target.value) }} value={room}/>
          <small>{error}</small>
          <button type='submit'>Create!</button>
        </form>
        <section>
          <ul>
            {
              rooms?.map(room => (
                <li key={room.roomName}>
                  <Link href={`/rooms/${room.roomName}`}>
                    <RoomItem room={room} />
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
    </AuthRoute>
  )
}

export default Home
