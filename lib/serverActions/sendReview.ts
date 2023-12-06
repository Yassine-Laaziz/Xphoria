'use server'

import { connect } from '../mongodb'
import { err } from '../constants'
import UserModel from '../../models/Users'
import { DatabaseReview, UserReview } from '../../types'
import ProductModel from '../../models/Products'
import { getUserByServer } from '../serverFunctions/getUser'

type ReturnT = {
  msg?: string
  redirect?: string
  updatedReviews?: UserReview[]
}

export default async function sendReview(comment: string, rating: number, productID: string): Promise<ReturnT> {
  if (!comment) return { msg: 'please comment first' }
  if (!rating) return { msg: 'please rate the product first' }

  if (comment.split('').length > 200 || rating > 5 || rating < 1) {
    return { msg: err }
  }

  try {
    await connect()

    const user = await getUserByServer()
    if (!user) return { redirect: '/Auth' }

    const { _id, purchases, reviews, username, img } = user

    const hasBoughtProduct = purchases.some(purchase => purchase.productID === productID)
    if (!hasBoughtProduct) return { msg: 'You need to try the product before reviewing it' }

    const hasReviewedProduct = reviews.some(review => review.productID === productID)
    if (!hasReviewedProduct) return { msg: err }

    await ProductModel.create({
      userID: _id,
      username,
      img,
      comment,
      rating,
    })

    const updatedReviews: UserReview[] = [...reviews, { productID, comment, rating }]
    await UserModel.findByIdAndUpdate(_id, { reviews: updatedReviews })

    return { updatedReviews }
  } catch (e) {
    return { msg: err }
  }
}
