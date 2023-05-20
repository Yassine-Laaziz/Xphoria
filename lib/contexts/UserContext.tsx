import axios from 'axios'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User } from '../../types'

export const initialUser = new User('', '', '')

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

  useEffect(() => refreshContext(), [])

  function refreshContext() {
    axios.get('/api/auth/user').then(res => {
      const user = res.data.user as User | null
      setUser(user || initialUser)
    })
  }

  return (
    <UserContext.Provider value={{ user, refreshContext }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextProps => useContext(UserContext)
