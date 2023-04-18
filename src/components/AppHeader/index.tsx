import React from 'react'
import Logo from '../Logo'
import UserIcon from '../Icons/UserIcon'
import useUser from '@/hooks/useUser'
import styles from './AppHeader.module.css'
import Link from 'next/link'

const AppHeader: React.FC = () => {
  const { user } = useUser()
  return (
    <header className={styles.header}>
      <Link href='/'>
        <Logo size='normal' />
      </Link>
      {
        (user !== null) && (
      <section className={styles.user_section}>
        <UserIcon />
        <p>{user?.username}</p>
      </section>
        )
      }
    </header>
  )
}

export default AppHeader
