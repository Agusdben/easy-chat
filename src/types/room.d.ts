export interface Room {
  roomName: string
  creator: string
  usersNumber: number
  users: Array<{ username: string, id: string }>
}

export type NewRoom = Pick<Room, 'roomName' | 'creator'>
