'use server'

import { cookies } from 'next/headers'
import { verify } from '../jwt'
import { User } from '../../types'
import UserModel from '../../models/Users'
import { connect } from '../mongodb'

const user_token = cookies().get('user_token')?.value

export async function getUserByJWT(): Promise<User | null | undefined> {
  if (!user_token) return null
  let user = (await verify(user_token)) as User | null
  return user
}

export async function getUserByServer(): Promise<User | null | undefined> {
  const jwtUser = await getUserByJWT()
  if (!jwtUser) return null

  connect()
  const serverUser: User | null = await UserModel.findById(jwtUser.id)
  if (!serverUser) return null

  const sanitizedUser = JSON.parse(JSON.stringify(serverUser))

  return sanitizedUser
}
