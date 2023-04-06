import { type Room } from '@/types/room'
import { useEffect, useMemo, useState } from 'react'
import useSocket from './useSocket'
import { useRouter } from 'next/router'
import useUser from './useUser'

interface ReturnTypes {
  rooms: Room[] | undefined
  query: string
  showEmpty: boolean
  handleQueryChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  handleShowEmptyChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const useRooms = (): ReturnTypes => {
  const [rooms, setRooms] = useState<Room[] | undefined >(undefined)
  const [query, setQuery] = useState('')
  const [showEmpty, setShowEmpty] = useState(true)

  const router = useRouter()
  const { user } = useUser()
  const { socket, isConnected } = useSocket()

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

  const handleQueryChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value)
  }

  const handleShowEmptyChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setShowEmpty(evt.target.checked)
  }

  const filteredRooms = useMemo(() => {
    return rooms?.filter(room => {
      if (query !== '' && !room.roomName.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (!showEmpty && room.usersNumber === 0) {
        return false
      }

      return true
    })
  }, [query, showEmpty, rooms])

  return {
    rooms: filteredRooms,
    query,
    showEmpty,
    handleQueryChange,
    handleShowEmptyChange
  }
}

export default useRooms
