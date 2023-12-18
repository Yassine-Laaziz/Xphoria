'use server'

import { cookies } from 'next/headers'
import { verify } from '../jwt'
import { DatabaseUser, User, userJWT } from '../../types'
import UserModel from '../../models/Users'
import { connect } from '../mongodb'
import ReviewModel from '../../models/Reviews'
import PurchaseModel from '../../models/Purchases'

export async function getUserByJWT(): Promise<userJWT | null | undefined> {
  const user_token = cookies().get('user_token')?.value
  if (!user_token) return null
  let user = (await verify(user_token)) as userJWT | null
  return user
}

export async function getDatabaseUser(): Promise<DatabaseUser | null | undefined> {
  const jwtUser = await getUserByJWT()
  if (!jwtUser) return null
  await connect()
  const serverUser: User | null = await UserModel.findById(jwtUser.id)
  if (!serverUser) return null

  const sanitizedUser = JSON.parse(JSON.stringify(serverUser))

  return sanitizedUser
}

/**
 * @returns user with purchases and reviews
 */
export async function getFullUser(): Promise<User | null | undefined> {
  const user = await getDatabaseUser()
  if (!user) return

  const userPurchases = await PurchaseModel.find({ userID: user })
  const userReviews = userPurchases ? await ReviewModel.find({ userID: user }) : []

  return { ...user, reviews: userReviews || [], purchases: userPurchases || [] }
}
