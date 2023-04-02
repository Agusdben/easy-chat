import Layout from '@/components/Layout'
import useSocketError from '@/hooks/useSocketError'
import useUser from '@/hooks/useUser'
import { type FormEvent, useState } from 'react'

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const { error, clearError } = useSocketError()
  const { authUser } = useUser()

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    clearError()
    if (username === '') return
    authUser({ username })
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input required type='text' onChange={(e) => { setUsername(e.target.value) }} value={username}/>
        <small>{error}</small>
        <button type='submit'>Ok</button>
      </form>
    </Layout>
  )
}

export default AuthPage
