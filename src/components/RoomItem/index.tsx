import { type Room } from '@/types/room'
import styles from './RoomItem.module.css'
import UserIcon from '../Icons/UserIcon'
import React from 'react'
import useUser from '@/hooks/useUser'

interface Props {
  room: Room
}

const RoomItem: React.FC<Props> = ({ room }) => {
  const { user } = useUser()

  return (
    <div className={styles.room}>
      <div className={styles.room_info}>
        <p>Room: {room.roomName}</p>
        <div className={styles.user_connected}>
          <UserIcon />
          <p>{room.usersNumber}</p>
        </div>
      </div>
      <div className={styles.creator_container}>
        <p>Created by</p>
        <p className={styles.creator}>{room.creator.id === user?.id ? 'You' : room.creator.username}</p>
      </div>
    </div>
  )
}

export default React.memo(RoomItem)
