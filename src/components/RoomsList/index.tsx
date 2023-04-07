import { type Room } from '@/types/room'
import Link from 'next/link'
import RoomItem from '../RoomItem'
import styles from './RoomsList.module.css'

interface Props {
  rooms: Room[]
}

const RoomsList: React.FC<Props> = ({ rooms }) => {
  return (
    <ul className={styles.rooms_list}>
      {
        rooms.map(room => (
          <li key={room.roomName}>
            <Link href={`/rooms/${room.roomName}`}>
              <RoomItem room={room} />
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default RoomsList
