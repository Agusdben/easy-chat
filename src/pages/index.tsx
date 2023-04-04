import AuthRoute from '@/components/AuthRoute'
import useSocket from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import { type Room } from '@/types/room'
import { useState, useEffect } from 'react'
import styles from '@/styles/Index.module.css'
import CreateRoomForm from '@/components/CreateRoomForm'
import RoomsList from '@/components/RoomsList'
import DotLoader from '@/components/DotLoader'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const { isConnected, socket } = useSocket()
  const { user } = useUser()
  const [rooms, setRooms] = useState<Room[] | undefined >(undefined)
  const router = useRouter()

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onServerSendRooms = (rooms: Room[]): void => {
      setRooms(rooms)
    }

    const onServerError = (error: string): void => {
      if (error === 'User does not exists') {
        router.push('/auth')
          .catch(error => { console.error(error) })
      }
    }

    socket.emit('client:get_rooms', { username: user?.username })

    socket.on('server:send_rooms', onServerSendRooms)

    socket.on('server:error', onServerError)

    return () => {
      socket.off('server:send_rooms', onServerSendRooms)
      socket.off('server:error', onServerError)
    }
  }, [isConnected, socket, user, router])

  return (
    <SocketConnectedRoute>
      <AuthRoute>
        <section className={styles.section}>
          <CreateRoomForm />
          <div className={styles.rooms}>
            {
              rooms === undefined
                ? <DotLoader />
                : <RoomsList rooms={rooms} />
            }
          </div>
        </section>
      </AuthRoute>
    </SocketConnectedRoute>
  )
}

export default Home
