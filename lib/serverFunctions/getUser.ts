'use server'

import { cookies } from 'next/headers'
import { verify } from '../jwt'
import { User } from '../../types'

export async function getUserByJWT(): Promise<User | null | undefined> {
  const user_token = cookies().get('user_token')?.value
  if (!user_token) return null

  let user = (await verify(user_token)) as User | null
  if (!user) return null

  // property initialization
  user = { ...user, purchases: user.purchases || [], reviews: user.reviews || [] }

  return user
}
