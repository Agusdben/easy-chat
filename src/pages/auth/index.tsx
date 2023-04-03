import useSocketError from '@/hooks/useSocketError'
import useUser from '@/hooks/useUser'
import styles from './Auth.module.css'
import { type FormEvent, useState } from 'react'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'

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
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <Logo size='lg'/>
        </header>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Welcome</h2>
          <label className={styles.label}>
            <p>What is your name?</p>
            <input placeholder='Type here' required type='text' onChange={(e) => { setUsername(e.target.value) }} value={username}/>
          </label>
          <ErrorMessage message={error}/>
          <Button disabled={username === ''} type='submit'>Get me inside!</Button>
        </form>
      </section>
    </>
  )
}

export default AuthPage
