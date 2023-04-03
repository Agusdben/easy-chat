import useSocket from '@/hooks/useSocket'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import MessagesIcon from '../Icons/MessagesIcon'
import styles from './SocketConnectedRoute.module.css'
import animations from '@/styles/animations.module.css'
import DotLoader from '../DotLoader'

interface Props {
  children: React.ReactNode
}

const SocketConnectedRoute: React.FC<Props> = ({ children }) => {
  const { isConnected } = useSocket()
  const router = useRouter()

  useEffect(() => {
    if (isConnected === undefined || isConnected === true) return

    router.push('/500')
      .catch(error => { console.error(error) })
  }, [isConnected, router])

  if (isConnected === undefined) {
    return (
      <section className={styles.container}>
        <MessagesIcon className={animations.pulse} />
        <div className={styles.connecting}>
          <p>Connecting</p>
          <DotLoader />
        </div>
      </section>
    )
  }

  return (
    <>{children}</>
  )
}

export default SocketConnectedRoute
