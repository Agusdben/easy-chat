import { SocketContext } from '@/context/SocketContext'
import { useContext } from 'react'

interface ReturnTypes {
  handleJoinRoom: (room: string) => void
}

const useSocket = (): ReturnTypes => {
  const { socket } = useContext(SocketContext)

  const handleJoinRoom = (room: string): void => {
    socket?.emit('client:join_room', room)
  }

  return {
    handleJoinRoom
  }
}

export default useSocket
