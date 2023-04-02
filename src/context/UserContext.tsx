import { type User } from '@/types/user'
import { type Dispatch, createContext, useState, type SetStateAction } from 'react'

interface Context {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<Context>({ user: null, setUser: () => {} })

interface Props {
  children: React.ReactNode
}

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Context['user']>(null)

  return <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>
}

export default UserContextProvider
