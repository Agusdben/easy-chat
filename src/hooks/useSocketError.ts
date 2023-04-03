import { useEffect, useState } from 'react'
import useSocket from './useSocket'
import { useRouter } from 'next/router'

interface ReturnTypes {
  error: string
  clearError: () => void
}

const useSocketError = (): ReturnTypes => {
  const { socket, isConnected } = useSocket()
  const [error, setError] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (socket == null || isConnected === undefined) return

    const onServerError = (error: string): void => {
      setError(error)
    }

    socket.on('server:error', onServerError)

    return () => {
      socket.off('server:error', onServerError)
      clearError()
    }
  }, [socket, isConnected, router])

  const clearError = (): void => {
    setError('')
  }

  return {
    error,
    clearError
  }
}

export default useSocketError
