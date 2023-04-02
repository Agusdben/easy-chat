import { useEffect, useState } from 'react'
import useSocket from './useSocket'

interface ReturnTypes {
  error: string
  clearError: () => void
}

const useSocketError = (): ReturnTypes => {
  const { socket, isConnected } = useSocket()
  const [error, setError] = useState('')

  useEffect(() => {
    if (socket == null || isConnected === false) return

    const onServerError = (error: string): void => {
      setError(error)
    }

    socket.on('server:error', onServerError)

    return () => {
      socket.off('server:error', onServerError)
    }
  }, [socket, isConnected])

  const clearError = (): void => {
    setError('')
  }

  return {
    error,
    clearError
  }
}

export default useSocketError
