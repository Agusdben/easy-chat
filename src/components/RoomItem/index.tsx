import { type Room } from '@/types/room'

interface Props {
  room: Room
}

const RoomItem: React.FC<Props> = ({ room }) => {
  console.log(room)
  return (
    <div>
      <p>{room.roomName}</p>
      <div>
        <p>{room.userNumber}</p>
      </div>
    </div>
  )
}

export default RoomItem
