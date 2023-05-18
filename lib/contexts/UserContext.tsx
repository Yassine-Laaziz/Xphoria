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
}

const UserContext = createContext<UserContextProps>({ user: initialUser })

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>(initialUser)

  useEffect(() => {
    axios.get('/api/auth/user').then(res => {
      const user = res.data.user as unknown
      if (!(user instanceof User)) return
      setUser(user)
    })
  }, [])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export const useUserContext = (): UserContextProps => useContext(UserContext)
