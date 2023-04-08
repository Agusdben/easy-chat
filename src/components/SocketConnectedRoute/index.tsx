import useSocket from '@/hooks/useSocket'
import MessagesIcon from '../Icons/MessagesIcon'
import styles from './SocketConnectedRoute.module.css'
import animations from '@/styles/animations.module.css'
import DotLoader from '../DotLoader'
import Error from 'next/error'
import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

const SocketConnectedRoute: React.FC<Props> = ({ children }) => {
  const { isConnected } = useSocket()
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    if (isConnected === undefined) return
    setIsConnecting(false)
  }, [isConnected])

  if (isConnecting) {
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

  if (isConnected === false && !isConnecting) {
    return (
      <section className={styles.container}>
        <Error statusCode={503} title='Our service is offline, try again later' />
      </section>
    )
  }

  return (
    <>{children}</>
  )
}

export default SocketConnectedRoute
