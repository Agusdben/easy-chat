interface User { username: string, id: string }

export interface Room {
  roomName: string
  creator: User
  usersNumber: number
  users: User[]
}

export type NewRoom = Pick<Room, 'roomName' | 'creator'>
