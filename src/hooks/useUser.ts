import { UserContext } from '@/context/UserContext'
import { type UserUsername, type User } from '@/types/user'
import { useContext, useEffect } from 'react'
import useSocket from './useSocket'
import { useRouter } from 'next/router'

interface ReturnTypes {
  user: User
  authUser: ({ username }: UserUsername) => void
}

const useUser = (): ReturnTypes => {
  const { user, setUser } = useContext(UserContext)
  const { socket, isConnected } = useSocket()
  const router = useRouter()

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onUserAuthenticated = ({ username }: UserUsername): void => {
      setUser({ username })
      console.log(username)
      router.push('/')
        .catch(error => {
          console.error(error)
        })
    }

    socket.on('server:user_authenticated', onUserAuthenticated)

    return () => {
      socket.off('server:user_authenticated', onUserAuthenticated)
    }
  }, [socket, isConnected, router, setUser])

  const authUser = ({ username }: UserUsername): void => {
    if (socket == null || isConnected === false) return
    socket.emit('client:auth', { username })
  }

  return {
    user,
    authUser
  }
}

export default useUser
