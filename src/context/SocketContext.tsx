import { createContext, useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

interface Context {
  socket: Socket | undefined | null
  isConnected: boolean | undefined
}

export const SocketContext = createContext<Context>({ socket: undefined, isConnected: undefined })

interface Props {
  children: React.ReactNode
}

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Context['socket']>(undefined)
  const [isConnected, setIsConnected] = useState<Context['isConnected']>(undefined)

  useEffect(() => {
    const connectionUrl = process.env.NEXT_PUBLIC_SOCKET_URL

    if (connectionUrl === undefined) {
      setSocket(null)
      setIsConnected(false)
      console.error('Invalid socket url')
      return
    }

    const socket = io(connectionUrl)
    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isConnected === true || isConnected === false || socket == null) return

    const onConnect = (): void => {
      clearTimeout(connectionTimeOut)
      setIsConnected(true)
    }
    const onDisconnect = (): void => {
      setIsConnected(false)
    }

    socket?.connect()
    socket?.on('connect', onConnect)
    socket?.on('disconnect', onDisconnect)

    const connectionTimeOut = setTimeout(() => {
      setIsConnected(false)
      socket.disconnect()
    }, 2 * 60 * 1000) // 2 min

    return () => {
      socket?.off('connect', onConnect)
      socket?.off('disconnect', onDisconnect)
      clearTimeout(connectionTimeOut)
    }
  }, [socket, isConnected])

  return <SocketContext.Provider value={{ socket, isConnected }}>
    {children}
  </SocketContext.Provider>
}

export default SocketContextProvider
