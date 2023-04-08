import React, { type FormEvent, useState, useEffect } from 'react'
import Button from '../Button'
import useUser from '@/hooks/useUser'
import { type NewRoom } from '@/types/room'
import useSocket from '@/hooks/useSocket'
import styles from './CreateRoomForm.module.css'

const MAX_ROOM_NAME_LENGTH = 20
const MIN_ROOM_NAME_LENGTH = 3

const CreateRoomForm: React.FC = () => {
  const { user } = useUser()
  const { handleCreateRoom } = useSocket()
  const [room, setRoom] = useState('')
  const [error, setError] = useState('')

  const { socket } = useSocket()

  useEffect(() => {
    const onServerError = (error: string): void => {
      setError(error)
    }

    socket?.on('server:error', onServerError)

    return () => {
      socket?.off('server:error', onServerError)
    }
  }, [socket])

  const handleSubmitRoom = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError('')

    if (room === '' || room.length > MAX_ROOM_NAME_LENGTH || room.length < MIN_ROOM_NAME_LENGTH) {
      setError('Invalid room name')
      return
    }

    const newRoom: NewRoom = {
      roomName: room,
      creator: user?.username ?? ''
    }

    handleCreateRoom(newRoom)
    setRoom('')
  }

  return (
    <form onSubmit={handleSubmitRoom} className={styles.room_form}>
      <input placeholder='enter room name' type='text' minLength={MIN_ROOM_NAME_LENGTH} maxLength={MAX_ROOM_NAME_LENGTH} required onChange={(e) => { setRoom(e.target.value) }} value={room}/>
      <small>{error}</small>
      <Button type='submit'>Create</Button>
    </form>
  )
}

export default CreateRoomForm
