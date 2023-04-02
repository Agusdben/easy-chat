import { SocketContext } from '@/context/SocketContext'
import { type NewRoom } from '@/types/room'
import { useContext } from 'react'
import { type Socket } from 'socket.io-client'

interface ReturnTypes {
  socket: Socket | null | undefined
  isConnected: boolean | null | undefined
  handleCreateRoom: (room: NewRoom) => void
}

const useSocket = (): ReturnTypes => {
  const { socket, isConnected } = useContext(SocketContext)

  const handleCreateRoom = (room: NewRoom): void => {
    console.log(room)
    socket?.emit('client:create_room', room)
  }

  return {
    socket,
    isConnected,
    handleCreateRoom
  }
}

export default useSocket
