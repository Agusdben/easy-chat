import useUser from '@/hooks/useUser'
import styles from './Auth.module.css'
import { type FormEvent, useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import useSocket from '@/hooks/useSocket'
import { useRouter } from 'next/router'

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const { authUser, user } = useUser()
  const { socket } = useSocket()
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user != null) {
      router.push('/')
        .catch(error => { console.error(error) })
    }

    const onServerError = (error: string): void => {
      setError(error)
    }

    socket?.on('server:error', onServerError)

    return () => {
      socket?.off('server:error', onServerError)
    }
  }, [socket, user, router])

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError('')
    if (username === '') return
    authUser({ username })
  }

  return (
    <SocketConnectedRoute>
      <section className={styles.section}>
        <header className={styles.header}>
          <Logo size='lg'/>
        </header>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Welcome</h2>
          <label className={styles.label}>
            <p>What is your name?</p>
            <input placeholder='Type here' minLength={3} maxLength={16} required type='text' onChange={(e) => { setUsername(e.target.value) }} value={username}/>
          </label>
          <ErrorMessage message={error}/>
          <Button disabled={username === ''} type='submit'>Start chatting!</Button>
        </form>
      </section>
    </SocketConnectedRoute>
  )
}

export default AuthPage
