import AuthRoute from '@/components/AuthRoute'
import Layout from '@/components/Layout'
import RoomItem from '@/components/RoomItem'
import useSocket from '@/hooks/useSocket'
import useSocketError from '@/hooks/useSocketError'
import useUser from '@/hooks/useUser'
import { type Room, type NewRoom } from '@/types/room'
import Link from 'next/link'
import { useState, type FormEvent, useEffect, Suspense } from 'react'

const Home: React.FC = () => {
  const { handleCreateRoom, isConnected, socket } = useSocket()
  const { user } = useUser()
  const [room, setRoom] = useState('')
  const [rooms, setRooms] = useState<Room[] | undefined>(undefined)
  const { error, clearError } = useSocketError()
  useEffect(() => {
    if (socket == null || isConnected === false) return
    socket.on('server:send_rooms', (rooms: Room[]) => {
      setRooms(rooms)
    })
  }, [isConnected, socket, rooms])

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
      <Layout>
        <form onSubmit={handleSubmitRoom}>
          <input placeholder='enter room name' onChange={(e) => { setRoom(e.target.value) }} value={room}/>
          <small>{error}</small>
          <button type='submit'>Create!</button>
        </form>
        <section>
          <Suspense fallback={<p>Loading...</p>}>
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
          </Suspense>
        </section>
      </Layout>
    </AuthRoute>
  )
}

export default Home
