export interface Room {
  roomName: string
  creator: string
  usersNumber: number
  users: string[]
}

export type NewRoom = Pick<Room, 'roomName' | 'creator'>
