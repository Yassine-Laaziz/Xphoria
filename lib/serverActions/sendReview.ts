'use server'

import { connect } from '../mongodb'
import { err } from '../constants'
import UserModel from '../../models/Users'
import { User } from '../../types'
import ReviewModel from '../../models/Reviews'
import { getUserByJWT } from '../serverFunctions/getUser'

interface ReturnT {
  msg?: string
  redirect?: string
  success?: boolean
  username?: string
  img?: string
}

export default async function sendReview(comment: string, rating: number, product: string): Promise<ReturnT> {
  if (!comment || !rating) {
    return { msg: 'please make sure to write a comment and to rate the product' }
  }

  if (comment.split('').length > 300 || rating > 5 || rating < 1) {
    return { msg: err }
  }

  try {
    await connect()

    const userJWT = await getUserByJWT()
    const user: User | null = await UserModel.findById(userJWT?.id)
    if (!user) {
      return { redirect: '/auth/login' }
    }

    const hasBoughtProduct = user.purchases.some(purchase => purchase.product === product)
    if (!hasBoughtProduct) return { msg: 'You need to try the product before reviewing it' }

    const hasReviewedProduct = user.reviews.some(review => review.product === product)
    if (!hasReviewedProduct) return { msg: err }

    await ReviewModel.create({
      product,
      username: user.username,
      userID: user.id,
      img: user.img,
      comment,
      rating,
    })
  } catch (e) {
    return { msg: err }
  }

  return { success: true }
}
