import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../Layout'

interface Props {
  children: React.ReactNode
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user } = useUser()
  const [authenticating, setAuthenticating] = useState(true)

  const router = useRouter()
  useEffect(() => {
    if (user === null) {
      router.push('/auth')
        .catch(error => { console.error(error) })
    }

    setAuthenticating(false)
  }, [user, router])

  if (authenticating) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return <>{children}</>
}

export default AuthRoute
