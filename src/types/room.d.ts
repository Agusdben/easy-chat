export interface Room {
  roomName: string
  creator: string
  userNumber: number
  users: string[]
}

export type NewRoom = Pick<Room, 'roomName' | 'creator'>
