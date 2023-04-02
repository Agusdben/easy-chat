interface UserInterface {
  username: string
}

export type UserUsername = Pick<UserInterface, 'username'>
export type User = UserInterface | null
