export interface Message {
  roomName: string
  author: { id: string, username: string }
  message: string
  date: Date
}
