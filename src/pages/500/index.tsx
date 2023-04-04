import useSocket from '@/hooks/useSocket'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'

const Custom500: React.FC = () => {
  const { isConnected } = useSocket()
  const router = useRouter()

  if (isConnected === undefined) return <></>

  if (isConnected === true) {
    router.push('/')
      .catch(error => { console.error(error) })
    return <></>
  }

  return (
    <Error statusCode={500} title='Internal server error'/>
  )
}

export default Custom500
