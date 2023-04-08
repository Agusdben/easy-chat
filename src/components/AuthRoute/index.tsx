import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user } = useUser()

  const [authenticating, setAuthenticating] = useState(true)

  const router = useRouter()
  useEffect(() => {
    setAuthenticating(true)
    if (user === null && router.isReady) {
      router.push('/auth')
        .catch(error => { console.error(error) })
    }
    setAuthenticating(false)
  }, [user, router])

  if (authenticating || user === null) {
    return (
        <p>Loading...</p>
    )
  }

  return <>{children}</>
}

export default AuthRoute
