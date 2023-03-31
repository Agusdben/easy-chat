import { createContext, useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

interface Context {
  socket: Socket | undefined | null
}

export const SocketContext = createContext<Context>({ socket: undefined })

interface Props {
  children: React.ReactNode
}

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Context['socket']>(undefined)

  useEffect(() => {
    const connectionUrl = process.env.NEXT_PUBLIC_SOCKET_URL

    if (connectionUrl === undefined) {
      setSocket(null)
      console.error('Invalid socket url')
      return
    }

    const socket = io(connectionUrl)
    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={{ socket }}>
    {children}
  </SocketContext.Provider>
}

export default SocketContextProvider
