import { type UserInterface } from './user'

export interface Room {
  roomName: string
  creator: UserInterface
  usersNumber: number
  users: UserInterface[]
}

export type NewRoom = Pick<Room, 'roomName' | 'creator'>
