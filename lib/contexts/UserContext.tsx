import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { User } from '../../types'
import { getUserByServer } from '../serverFunctions/getUser'

export const initialUser = new User('', '', '', [], [], [])

interface UserContextProps {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext<UserContextProps>({
  user: initialUser,
  setUser: () => {},
})

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(initialUser)

  // useEffect(() => {
  //   getUserByServer().then(user => {
  //     if (user) setUser(user)
  //   })
  // }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextProps => useContext(UserContext)
