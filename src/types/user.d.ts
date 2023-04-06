interface UserInterface {
  id: string
  username: string
}

export type UserUsername = Pick<UserInterface, 'username'>
export type User = UserInterface | null
