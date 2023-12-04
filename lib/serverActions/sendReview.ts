'use server'

import { connect } from '../mongodb'
import { err } from '../constants'
import UserModel from '../../models/Users'
import { Review, User } from '../../types'
import ReviewModel from '../../models/Reviews'
import { getUserByJWT } from '../serverFunctions/getUser'

type ReturnT = {
  msg?: string
  redirect?: string
  updatedReviews?: Review[]
}

export default async function sendReview(comment: string, rating: number, productSlug: string): Promise<ReturnT> {
  if (!comment || !rating) {
    return { msg: 'please make sure to write a comment and to rate the product' }
  }

  if (comment.split('').length > 300 || rating > 5 || rating < 1) {
    return { msg: err }
  }

  try {
    await connect()

    const userJWT = await getUserByJWT()
    if (!userJWT) return { redirect: '/auth/login' }

    const user: User | null = await UserModel.findById(userJWT?.id)
    if (!user) return { redirect: '/auth/login' }

    const { id, purchases, reviews, username, img } = user

    const hasBoughtProduct = purchases.some(purchase => purchase.productSlug === productSlug)
    if (!hasBoughtProduct) return { msg: 'You need to try the product before reviewing it' }

    const hasReviewedProduct = reviews.some(review => review.productSlug === productSlug)
    if (!hasReviewedProduct) return { msg: err }

    await ReviewModel.create({
      productSlug,
      username,
      userId: id,
      img,
      comment,
      rating,
    })

    const updatedReviews: Review[] = [...reviews, { productSlug, username, userID: id, img, comment, rating }]
    await UserModel.findByIdAndUpdate(userJWT.id, { reviews: updatedReviews })

    return { updatedReviews }
  } catch (e) {
    return { msg: err }
  }
}
