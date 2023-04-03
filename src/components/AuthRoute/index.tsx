import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSocket from '@/hooks/useSocket'

interface Props {
  children: React.ReactNode
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user } = useUser()
  const { isConnected } = useSocket()

  const [authenticating, setAuthenticating] = useState(true)

  const router = useRouter()
  useEffect(() => {
    setAuthenticating(true)

    if (isConnected === false) {
      setAuthenticating(false)
      return
    }

    if (user === null) {
      router.push('/auth')
        .catch(error => { console.error(error) })
    }

    setAuthenticating(false)
  }, [user, router, isConnected])

  if (authenticating) {
    return (
        <p>Loading...</p>
    )
  }

  return <>{children}</>
}

export default AuthRoute
