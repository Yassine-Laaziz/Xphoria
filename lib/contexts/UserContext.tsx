import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { User } from '../../types'
import { getUserByJWT } from '../serverFunctions/getUser'

export const initialUser = new User('', '', '', [], [])

interface UserContextProps {
  user: User
  refreshContext: () => void
}

const UserContext = createContext<UserContextProps>({
  user: initialUser,
  refreshContext: () => {},
})

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(initialUser)

  useEffect(() => {
    refreshContext()
  }, [])

  async function refreshContext() {
    const user = await getUserByJWT()
    if (user) setUser(user)
  }

  return <UserContext.Provider value={{ user, refreshContext }}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextProps => useContext(UserContext)
