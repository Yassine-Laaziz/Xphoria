import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { User } from '../../types'
import { getFullUser } from '../serverFunctions/getUser'

export const initialUser = new User('', '', '', [], [], [])

interface UserContextProps {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  refreshUser: () => void
}

const UserContext = createContext<UserContextProps>({
  user: initialUser,
  setUser: () => {},
  refreshUser: () => {},
})

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(initialUser)
  function refreshUser() {
    getFullUser().then(user => {
      if (user) setUser(user)
    })
  }

  useEffect(() => refreshUser(), [])

  return <UserContext.Provider value={{ user, setUser, refreshUser }}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextProps => useContext(UserContext)
