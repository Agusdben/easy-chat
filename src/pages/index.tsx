import Layout from '@/components/Layout'
import useSocket from '@/hooks/useSocket'
import { useState, type FormEvent } from 'react'

const Home: React.FC = () => {
  const { handleJoinRoom } = useSocket()
  const [room, setRoom] = useState('')

  const handleSubmitRoom = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (room === '') {
      return
    }

    handleJoinRoom(room)
  }

  return (
    <Layout>
      <form onSubmit={handleSubmitRoom}>
        <input placeholder='enter room name' onChange={(e) => { setRoom(e.target.value) }}/>
      </form>
    </Layout>
  )
}

export default Home
